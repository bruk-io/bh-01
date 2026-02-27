# Lit 3 API Reference

## Decorators

### `@customElement('tag-name')`
Registers the class as a custom element. Tag name must contain a hyphen.

```typescript
@customElement('bh-button')
export class BhButton extends BaseElement { }
```

### `@property(options?)`
Declares a reactive property (public API). Triggers re-render on change.

```typescript
@property({ type: String }) label = '';
@property({ type: Number, reflect: true }) count = 0;
@property({ type: Boolean, reflect: true }) disabled = false;
@property({ type: Array }) items: string[] = [];
@property({ type: Object, attribute: false }) config: Config = {};
```

### `@state()`
Declares internal reactive state. Not exposed as an attribute — not part of the public API.

```typescript
@state() private _open = false;
@state() private _selectedItems: Set<string> = new Set();
```

### `@query('selector')`
Sugar for `this.renderRoot.querySelector(selector)`. Returns the first matching element or `null`.

```typescript
@query('.input') private _input!: HTMLInputElement;
```

### `@queryAll('selector')`
Returns a `NodeList` of all matching elements.

```typescript
@queryAll('.item') private _items!: NodeListOf<HTMLElement>;
```

### `@queryAsync('selector')`
Returns a `Promise<Element>` that resolves after rendering. Useful for elements that render lazily.

```typescript
@queryAsync('.lazy-panel') private _panel!: Promise<HTMLElement>;
```

### `@eventOptions(options)`
Sets `addEventListener` options on an event handler.

```typescript
@eventOptions({ passive: true })
private _handleScroll(e: Event) { }
```

## Property Options

| Option | Type | Default | Purpose |
|--------|------|---------|---------|
| `type` | `String \| Number \| Boolean \| Array \| Object` | `undefined` | Attribute-to-property conversion |
| `reflect` | `boolean` | `false` | Sync property value back to HTML attribute |
| `attribute` | `string \| false` | auto from name | Custom attribute name, or `false` to disable attribute |
| `converter` | `{ fromAttribute, toAttribute }` | default | Custom conversion between attribute and property |
| `hasChanged` | `(newVal, oldVal) => boolean` | strict `!==` | Custom change detection function |

**When to use each option:**
- `type`: Always set for properties that accept attributes (primitives).
- `reflect: true`: For visual state attributes (`disabled`, `variant`, `size`) that CSS selects on (`:host([disabled])`).
- `attribute: false`: For complex objects/arrays that should never be set via HTML attributes.
- `converter`: For non-standard types like `Date`, enums, or comma-separated lists.
- `hasChanged`: For deep equality on objects or custom comparison logic.

## Lifecycle (in execution order)

### 1. `constructor()`
Set property defaults. No DOM access — the element is not yet in the document.

```typescript
constructor() {
  super();
  // Set defaults only if not using @property defaults
}
```

### 2. `connectedCallback()`
Called when the element is added to the DOM. Always call `super.connectedCallback()` first. Add global listeners here.

```typescript
connectedCallback() {
  super.connectedCallback();
  window.addEventListener('resize', this._onResize);
}
```

### 3. `willUpdate(changedProperties: PropertyValues)`
Runs before `render()`. Compute derived state here. Safe to set reactive properties without triggering an extra render cycle.

```typescript
willUpdate(changedProperties: PropertyValues) {
  if (changedProperties.has('items')) {
    this._filteredItems = this.items.filter(i => i.active);
  }
}
```

### 4. `render()`
Return a `TemplateResult`. Must be a pure function of the element's state — no side effects.

```typescript
render() {
  return html`<div>${this.label}</div>`;
}
```

### 5. `firstUpdated(changedProperties: PropertyValues)`
Called once after the first render. DOM queries are safe here. Use for one-time setup that needs rendered DOM.

```typescript
firstUpdated(changedProperties: PropertyValues) {
  this._input.focus();
}
```

### 6. `updated(changedProperties: PropertyValues)`
Called after every render. Use sparingly — prefer `willUpdate` for derived state. Use `updated` only when you need to read post-render DOM state.

```typescript
updated(changedProperties: PropertyValues) {
  if (changedProperties.has('open')) {
    this._animateToggle();
  }
}
```

### 7. `disconnectedCallback()`
Called when the element is removed from the DOM. Clean up listeners, timers, observers. Always call `super.disconnectedCallback()`.

```typescript
disconnectedCallback() {
  super.disconnectedCallback();
  window.removeEventListener('resize', this._onResize);
}
```

## Template Syntax

```typescript
// Text interpolation
html`Hello ${name}`

// Attribute binding
html`<div class=${cls}></div>`

// Boolean attribute binding (adds/removes attribute)
html`<button ?disabled=${isDisabled}></button>`

// Property binding (sets JS property, not attribute)
html`<my-el .value=${val}></my-el>`

// Event listener binding
html`<button @click=${this._handleClick}></button>`

// Element reference
html`<div ${ref(this.divRef)}></div>`

// Spread multiple bindings (not built-in — use individual bindings)
```

## Built-in Directives

Import from `lit/directives/<name>.js`.

### `classMap(classInfo)`
Conditionally apply CSS classes.

```typescript
import { classMap } from 'lit/directives/class-map.js';

html`<div class=${classMap({ active: this.active, disabled: this.disabled })}></div>`
```

### `styleMap(styleInfo)`
Conditionally apply inline styles.

```typescript
import { styleMap } from 'lit/directives/style-map.js';

html`<div style=${styleMap({ color: this.color, padding: '8px' })}></div>`
```

### `repeat(items, keyFn, template)`
Keyed list rendering — efficient DOM reuse when items are reordered.

```typescript
import { repeat } from 'lit/directives/repeat.js';

html`${repeat(this.items, (item) => item.id, (item) => html`
  <bh-list-item .data=${item}></bh-list-item>
`)}`
```

### `guard(deps, fn)`
Skip re-rendering a template section if dependencies haven't changed.

```typescript
import { guard } from 'lit/directives/guard.js';

html`${guard([this.items], () => html`
  <expensive-component .data=${this.items}></expensive-component>
`)}`
```

### `cache(template)`
Cache previously rendered DOM trees so switching between them is instant.

```typescript
import { cache } from 'lit/directives/cache.js';

html`${cache(this.view === 'list'
  ? html`<list-view></list-view>`
  : html`<grid-view></grid-view>`
)}`
```

### `ref(refObject)`
Get a reference to a rendered DOM element.

```typescript
import { ref, createRef } from 'lit/directives/ref.js';

private _inputRef = createRef<HTMLInputElement>();

html`<input ${ref(this._inputRef)}>`

// Access: this._inputRef.value
```

### `live(value)`
Check the live DOM value rather than the last-rendered value. Useful for inputs where the user may have changed the value.

```typescript
import { live } from 'lit/directives/live.js';

html`<input .value=${live(this.value)}>`
```

### `until(promise, placeholder)`
Render a placeholder until a promise resolves.

```typescript
import { until } from 'lit/directives/until.js';

html`${until(this._fetchData(), html`<bh-spinner></bh-spinner>`)}`
```

### `ifDefined(value)`
Only set an attribute if the value is defined (not `undefined`).

```typescript
import { ifDefined } from 'lit/directives/if-defined.js';

html`<img src=${ifDefined(this.src)}>`
```

### `choose(value, cases, defaultCase?)`
Switch-case in templates.

```typescript
import { choose } from 'lit/directives/choose.js';

html`${choose(this.variant, [
  ['primary', () => html`<span class="primary">${this.label}</span>`],
  ['secondary', () => html`<span class="secondary">${this.label}</span>`],
], () => html`<span>${this.label}</span>`)}`
```

### `when(condition, trueCase, falseCase?)`
Conditional rendering.

```typescript
import { when } from 'lit/directives/when.js';

html`${when(this.loggedIn,
  () => html`<bh-dashboard></bh-dashboard>`,
  () => html`<bh-login></bh-login>`
)}`
```

### `map(items, template)`
Simple list rendering without keys. Use `repeat()` when items can be reordered.

```typescript
import { map } from 'lit/directives/map.js';

html`${map(this.items, (item) => html`<li>${item.name}</li>`)}`
```

### `join(items, joiner)`
Join rendered items with a separator.

```typescript
import { join } from 'lit/directives/join.js';

html`${join(this.tags.map(t => html`<bh-badge>${t}</bh-badge>`), html`<span>, </span>`)}`
```

### `range(count)`
Generate a number sequence.

```typescript
import { range } from 'lit/directives/range.js';

html`${map(range(5), (i) => html`<bh-star ?filled=${i < this.rating}></bh-star>`)}`
```

### `nothing`
Render nothing. Import from `lit`, not from directives.

```typescript
import { nothing } from 'lit';

html`${this.showLabel ? html`<span>${this.label}</span>` : nothing}`
```

## Reactive Controllers

Reusable logic that hooks into an element's lifecycle without inheritance.

```typescript
import { ReactiveController, ReactiveControllerHost } from 'lit';

class TimerController implements ReactiveController {
  host: ReactiveControllerHost;
  value = 0;
  private _timer?: number;

  constructor(host: ReactiveControllerHost, private interval: number) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    this._timer = window.setInterval(() => {
      this.value++;
      this.host.requestUpdate();
    }, this.interval);
  }

  hostDisconnected() {
    clearInterval(this._timer);
  }
}

// Usage in a component:
@customElement('bh-timer')
export class BhTimer extends BaseElement {
  private _timer = new TimerController(this, 1000);

  render() {
    return html`<span>${this._timer.value}s</span>`;
  }
}
```

**Controller lifecycle hooks:**
- `hostConnected()` — element added to DOM
- `hostDisconnected()` — element removed from DOM
- `hostUpdate()` — before render
- `hostUpdated()` — after render

## Context Protocol

Share data across the component tree without prop drilling.

```typescript
import { createContext, provide, consume } from '@lit/context';

// Define context
const themeContext = createContext<Theme>('theme');

// Provider component
@customElement('bh-theme-provider')
export class BhThemeProvider extends BaseElement {
  @provide({ context: themeContext })
  @property({ attribute: false })
  theme: Theme = defaultTheme;
}

// Consumer component (any descendant)
@customElement('bh-themed-card')
export class BhThemedCard extends BaseElement {
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  theme?: Theme;

  render() {
    return html`<div style=${styleMap({ color: this.theme?.textColor })}>
      <slot></slot>
    </div>`;
  }
}
```

- `subscribe: true` makes the consumer re-render when the provider's value changes.
- Without `subscribe`, the consumer reads the value once on connection.
