---
name: development
description: >
  Day-to-day Lit 3 development patterns including Shadow DOM, reactive properties,
  controllers, context, slots, CSS parts, and performance.
---

# Development Patterns

## Shadow DOM Styling

### `:host` — Style the Host Element

```typescript
static styles = css`
  :host {
    display: block;
    background: var(--bh-color-surface);
    border-radius: var(--bh-radius-md);
  }

  /* Conditional based on attribute */
  :host([variant="primary"]) {
    background: var(--bh-color-primary);
    color: var(--bh-color-on-primary);
  }

  /* Hidden host */
  :host([hidden]) {
    display: none;
  }
`;
```

### `::slotted(selector)` — Style Slotted Children

Styles light DOM children projected into a slot. Only applies one level deep (direct children of the slot).

```typescript
static styles = css`
  ::slotted(*) {
    margin-block: var(--bh-spacing-2);
  }

  ::slotted(h2) {
    font-size: var(--bh-font-heading-size);
  }

  ::slotted([slot="footer"]) {
    border-top: var(--bh-border-1) solid var(--bh-color-border-default);
  }
`;
```

### `::part(name)` — Expose Internal Elements

Allows external consumers to style specific internal elements:

```typescript
render() {
  return html`
    <div part="header">
      <slot name="header"></slot>
    </div>
    <div part="body">
      <slot></slot>
    </div>
  `;
}
```

Consumer styles:

```css
bh-card::part(header) {
  padding: var(--bh-spacing-4);
  background: var(--bh-color-surface-raised);
}
```

### `:host-context(selector)` — Ancestor-Based Styling

Style the host based on an ancestor (limited browser support, use sparingly):

```typescript
static styles = css`
  :host-context([data-theme="dark"]) {
    border-color: var(--bh-color-gray-700);
  }
`;
```

### CSS Custom Properties Pierce Shadow DOM

This is the primary theming mechanism. See the design-tokens skill for full details.

## Reactive Properties: `@property` vs `@state`

### `@property` — Public API

Part of the component's contract. Consumers can set these via attributes or properties.

```typescript
@customElement('bh-button')
export class BhButton extends LitElement {
  @property({ type: String, reflect: true })
  variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  label = '';
}
```

Use `reflect: true` when:
- The attribute drives CSS styling (`:host([variant="primary"])`)
- Accessibility requires the attribute to be visible in the DOM
- The value should be queryable via `querySelector('[variant="primary"]')`

### `@state` — Internal Only

Implementation detail, never set from outside. Not reflected to attributes.

```typescript
@customElement('bh-dropdown')
export class BhDropdown extends LitElement {
  @state()
  private _open = false;

  @state()
  private _activeIndex = -1;

  @state()
  private _filteredItems: Item[] = [];
}
```

**Rule**: If consumers set it, use `@property`. If only the component sets it, use `@state`.

## `willUpdate` for Derived State

Compute derived values when dependencies change, before rendering:

```typescript
@property({ type: Array })
items: Item[] = [];

@property({ type: String })
sortBy: 'name' | 'date' = 'name';

@state()
private _sortedItems: Item[] = [];

willUpdate(changed: PropertyValues<this>) {
  if (changed.has('items') || changed.has('sortBy')) {
    this._sortedItems = [...this.items].sort(
      this.sortBy === 'name' ? byName : byDate
    );
  }
}
```

Use `willUpdate` instead of getters when the computation is expensive. Getters recompute on every access; `willUpdate` only runs when inputs change.

## Reactive Controllers

Encapsulate reusable logic that hooks into the host element's lifecycle.

### Pattern

```typescript
export class MediaQueryController implements ReactiveController {
  private _matches = false;
  private _query: MediaQueryList;

  get matches() { return this._matches; }

  constructor(private host: ReactiveControllerHost, query: string) {
    this.host.addController(this);
    this._query = window.matchMedia(query);
  }

  hostConnected() {
    this._query.addEventListener('change', this._onChange);
    this._matches = this._query.matches;
  }

  hostDisconnected() {
    this._query.removeEventListener('change', this._onChange);
  }

  private _onChange = (e: MediaQueryListEvent) => {
    this._matches = e.matches;
    this.host.requestUpdate();
  };
}
```

### Usage in Components

```typescript
@customElement('bh-sidebar')
export class BhSidebar extends LitElement {
  private _mobile = new MediaQueryController(this, '(max-width: 768px)');

  render() {
    return this._mobile.matches
      ? html`<bh-drawer>...</bh-drawer>`
      : html`<nav>...</nav>`;
  }
}
```

### Common Controllers

- **MediaQueryController** — react to viewport changes
- **ResizeController** — react to element size changes (ResizeObserver)
- **IntersectionController** — lazy-load or animate on visibility
- **FocusTrapController** — trap focus within modals/dialogs
- **KeyboardController** — declarative keyboard shortcut handling

## Context Protocol (`@lit/context`)

For data that many components need without prop-drilling.

### Define a Context

```typescript
import { createContext } from '@lit/context';

export interface ThemeData {
  mode: 'light' | 'dark';
  primaryColor: string;
}

export const themeContext = createContext<ThemeData>('bh-theme');
```

### Provider

```typescript
import { provide } from '@lit/context';

@customElement('bh-theme-provider')
export class BhThemeProvider extends LitElement {
  @provide({ context: themeContext })
  @property({ attribute: false })
  theme: ThemeData = { mode: 'light', primaryColor: 'blue' };
}
```

### Consumer

```typescript
import { consume } from '@lit/context';

@customElement('bh-card')
export class BhCard extends LitElement {
  @consume({ context: themeContext, subscribe: true })
  @state()
  private _theme?: ThemeData;

  render() {
    return html`<div class=${this._theme?.mode}>...</div>`;
  }
}
```

### When to Use Context

- **Theme** — light/dark mode, accent colors
- **Locale** — language, formatting preferences
- **Auth state** — current user info
- **Configuration** — feature flags, API endpoints

Avoid using context for frequently changing data or data only one component needs.

## Event Patterns

### Dispatching Custom Events

```typescript
private _handleClick() {
  this.dispatchEvent(new CustomEvent('bh-select', {
    detail: { value: this._selectedValue },
    bubbles: true,
    composed: true,  // Crosses shadow DOM boundaries
  }));
}
```

### Event Delegation

Use `@event` on a parent to catch bubbled events, avoiding per-item listeners:

```typescript
render() {
  return html`
    <ul @click=${this._handleItemClick}>
      ${this.items.map(item => html`
        <li data-id=${item.id}>${item.name}</li>
      `)}
    </ul>
  `;
}

private _handleItemClick(e: Event) {
  const target = (e.target as HTMLElement).closest('li');
  if (!target) return;
  const id = target.dataset.id;
  // Handle selection
}
```

### `composed: true` vs `false`

- `composed: true` — event escapes shadow root, visible to ancestors in the light DOM. Use for events consumers need to hear.
- `composed: false` (default) — event stays inside the shadow root. Use for internal component communication.

## Performance Considerations

### Avoid Object Creation in `render()`

```typescript
// BAD: Creates new object every render, triggers unnecessary child updates
render() {
  return html`<bh-child .config=${{ theme: 'dark' }}></bh-child>`;
}

// GOOD: Stable reference
private _config = { theme: 'dark' };
render() {
  return html`<bh-child .config=${this._config}></bh-child>`;
}
```

### Use `repeat()` for Keyed Lists

```typescript
import { repeat } from 'lit/directives/repeat.js';

render() {
  return html`
    <ul>
      ${repeat(
        this.items,
        (item) => item.id,  // Key function
        (item) => html`<li>${item.name}</li>`
      )}
    </ul>
  `;
}
```

`repeat()` with a key function enables efficient DOM reuse when items are reordered, added, or removed. Without keys, Lit falls back to positional diffing.

### Use `guard()` for Expensive Sub-Templates

```typescript
import { guard } from 'lit/directives/guard.js';

render() {
  return html`
    ${guard([this.data], () => this._renderExpensiveChart(this.data))}
  `;
}
```

`guard()` skips re-rendering the sub-template unless the guard values change.

### Debounce Rapid Property Changes

If a component receives many rapid property updates (e.g., from a resize observer), debounce to avoid excessive rendering:

```typescript
private _debounceTimer?: ReturnType<typeof setTimeout>;

updated() {
  clearTimeout(this._debounceTimer);
  this._debounceTimer = setTimeout(() => {
    this._recalculate();
  }, 100);
}
```

### Custom `hasChanged` for Complex Properties

```typescript
@property({
  hasChanged(newVal: Item[], oldVal: Item[]) {
    // Only trigger update if array contents changed
    if (newVal.length !== oldVal?.length) return true;
    return newVal.some((item, i) => item.id !== oldVal[i].id);
  }
})
items: Item[] = [];
```

Avoid deep object comparison in `hasChanged` — keep it fast and simple.

## Slot Patterns

### Default Slot

```typescript
render() {
  return html`<div class="wrapper"><slot></slot></div>`;
}
```

### Named Slots

```typescript
render() {
  return html`
    <header><slot name="header"></slot></header>
    <main><slot></slot></main>
    <footer><slot name="footer"></slot></footer>
  `;
}
```

Usage:
```html
<bh-card>
  <h2 slot="header">Title</h2>
  <p>Default slot content</p>
  <bh-button slot="footer">Save</bh-button>
</bh-card>
```

### Slot Fallback Content

```typescript
render() {
  return html`
    <slot name="icon">
      <!-- Fallback shown when no content is slotted -->
      <bh-icon name="default"></bh-icon>
    </slot>
  `;
}
```

### Detecting Slotted Content

```typescript
@state()
private _hasHeader = false;

private _handleSlotChange(e: Event) {
  const slot = e.target as HTMLSlotElement;
  this._hasHeader = slot.assignedNodes().length > 0;
}

render() {
  return html`
    <div class="header" ?hidden=${!this._hasHeader}>
      <slot name="header" @slotchange=${this._handleSlotChange}></slot>
    </div>
  `;
}
```
