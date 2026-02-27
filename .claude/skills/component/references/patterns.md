# Composition and Data Flow Patterns

## Composing Atoms to Molecules to Organisms

### Atom: `bh-input`
A single-purpose input element.

```typescript
@customElement('bh-input')
export class BhInput extends BaseElement {
  static styles = [
    ...BaseElement.styles,
    css`
      :host { display: inline-block; }
      input {
        padding: var(--bh-spacing-sm);
        border: 1px solid var(--bh-color-border);
        border-radius: var(--bh-radius-sm);
        font-size: var(--bh-font-size-md);
      }
    `
  ];

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent<{ value: string }>('bh-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <input
        .value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        @input=${this._handleInput}
      >
    `;
  }
}
```

### Atom: `bh-button`
A single-purpose button element.

```typescript
@customElement('bh-button')
export class BhButton extends BaseElement {
  static styles = [
    ...BaseElement.styles,
    css`
      :host { display: inline-block; }
      button {
        padding: var(--bh-spacing-sm) var(--bh-spacing-md);
        border: none;
        border-radius: var(--bh-radius-sm);
        cursor: pointer;
        font-size: var(--bh-font-size-md);
        background: var(--bh-color-primary);
        color: var(--bh-color-on-primary);
      }
      :host([disabled]) button {
        opacity: 0.5;
        pointer-events: none;
      }
    `
  ];

  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent('bh-click', { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <button ?disabled=${this.disabled} @click=${this._handleClick}>
        <slot>${this.label}</slot>
      </button>
    `;
  }
}
```

### Molecule: `bh-search-bar`
Composes `bh-input` + `bh-button` into a search control.

```typescript
@customElement('bh-search-bar')
export class BhSearchBar extends BaseElement {
  static styles = [
    ...BaseElement.styles,
    css`
      :host { display: flex; gap: var(--bh-spacing-sm); }
    `
  ];

  @property({ type: String }) placeholder = 'Search...';
  @state() private _query = '';

  private _handleInput(e: CustomEvent<{ value: string }>) {
    this._query = e.detail.value;
  }

  private _handleSearch() {
    this.dispatchEvent(
      new CustomEvent<{ query: string }>('bh-search', {
        detail: { query: this._query },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <bh-input
        .value=${this._query}
        placeholder=${this.placeholder}
        @bh-input=${this._handleInput}
      ></bh-input>
      <bh-button label="Search" @bh-click=${this._handleSearch}></bh-button>
    `;
  }
}
```

### Organism: `bh-search-panel`
Composes the search bar with filter controls and result display.

```typescript
@customElement('bh-search-panel')
export class BhSearchPanel extends BaseElement {
  static styles = [
    ...BaseElement.styles,
    css`
      :host { display: block; }
      .panel { display: flex; flex-direction: column; gap: var(--bh-spacing-md); }
      .filters { display: flex; gap: var(--bh-spacing-sm); }
    `
  ];

  @property({ type: Array }) filters: string[] = [];
  @property({ type: Array }) results: SearchResult[] = [];
  @state() private _activeFilter = '';

  private _handleSearch(e: CustomEvent<{ query: string }>) {
    this.dispatchEvent(
      new CustomEvent<{ query: string; filter: string }>('bh-panel-search', {
        detail: { query: e.detail.query, filter: this._activeFilter },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleFilterClick(filter: string) {
    this._activeFilter = filter;
  }

  render() {
    return html`
      <div class="panel">
        <bh-search-bar @bh-search=${this._handleSearch}></bh-search-bar>
        <div class="filters">
          ${repeat(this.filters, (f) => f, (f) => html`
            <bh-button
              label=${f}
              ?active=${f === this._activeFilter}
              @bh-click=${() => this._handleFilterClick(f)}
            ></bh-button>
          `)}
        </div>
        <div class="results">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
```

## Property Passing

### Primitives: use attributes
Strings, numbers, booleans are set via attributes in HTML or attribute bindings in templates.

```typescript
// In a parent template
html`<bh-button variant="primary" label="Submit" ?disabled=${this.loading}></bh-button>`
```

### Complex data: use `.property` binding
Objects, arrays, functions must be passed via property binding — they cannot be serialized to attributes.

```typescript
// In a parent template
html`<bh-list .items=${this.items} .renderItem=${this._renderItem}></bh-list>`
```

**Rule of thumb:** If the value is not a string, number, or boolean, use `.property` syntax.

## Conditional Rendering

### Ternary with `nothing`
Use `nothing` (from `lit`) to render nothing — do not use empty strings or `undefined`.

```typescript
render() {
  return html`
    ${this.loading ? html`<bh-spinner></bh-spinner>` : nothing}
    ${this.error ? html`<bh-alert type="error">${this.error}</bh-alert>` : nothing}
    <slot></slot>
  `;
}
```

### `when` directive
Cleaner for conditional blocks with an optional else branch.

```typescript
import { when } from 'lit/directives/when.js';

render() {
  return html`
    ${when(this.items.length > 0,
      () => html`<bh-list .items=${this.items}></bh-list>`,
      () => html`<bh-empty-state message="No items found"></bh-empty-state>`
    )}
  `;
}
```

### `choose` directive
For multi-branch conditions (like a switch statement).

```typescript
import { choose } from 'lit/directives/choose.js';

render() {
  return html`
    ${choose(this.status, [
      ['loading', () => html`<bh-spinner></bh-spinner>`],
      ['error', () => html`<bh-alert type="error">${this.errorMessage}</bh-alert>`],
      ['success', () => html`<bh-list .items=${this.items}></bh-list>`],
    ])}
  `;
}
```

## List Rendering

### `repeat` — keyed lists (preferred)
Use when items have stable unique IDs and may be reordered, added, or removed. Efficient DOM reuse.

```typescript
import { repeat } from 'lit/directives/repeat.js';

render() {
  return html`
    <ul>
      ${repeat(this.items, (item) => item.id, (item, index) => html`
        <bh-list-item
          .data=${item}
          ?selected=${item.id === this.selectedId}
          @bh-select=${this._onSelect}
        ></bh-list-item>
      `)}
    </ul>
  `;
}
```

### `map` — simple lists
Use when items are static or always fully re-rendered (no reordering).

```typescript
import { map } from 'lit/directives/map.js';

render() {
  return html`
    ${map(this.tags, (tag) => html`<bh-badge>${tag}</bh-badge>`)}
  `;
}
```

## Form Patterns

### Gathering values via events
Each form control emits a change event. The form component listens and collects values.

```typescript
@customElement('bh-login-form')
export class BhLoginForm extends BaseElement {
  @state() private _email = '';
  @state() private _password = '';

  private _handleEmailChange(e: CustomEvent<{ value: string }>) {
    this._email = e.detail.value;
  }

  private _handlePasswordChange(e: CustomEvent<{ value: string }>) {
    this._password = e.detail.value;
  }

  private _handleSubmit() {
    this.dispatchEvent(
      new CustomEvent<{ email: string; password: string }>('bh-submit', {
        detail: { email: this._email, password: this._password },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <form @submit=${(e: Event) => e.preventDefault()}>
        <bh-input
          label="Email"
          type="email"
          @bh-change=${this._handleEmailChange}
        ></bh-input>
        <bh-input
          label="Password"
          type="password"
          @bh-change=${this._handlePasswordChange}
        ></bh-input>
        <bh-button label="Log In" @bh-click=${this._handleSubmit}></bh-button>
      </form>
    `;
  }
}
```

### Querying slotted children
When the form uses slots instead of fixed children, query slotted elements to read their values.

```typescript
private _gatherFormData(): Record<string, string> {
  const slot = this.shadowRoot?.querySelector('slot');
  const elements = slot?.assignedElements({ flatten: true }) ?? [];
  const data: Record<string, string> = {};
  for (const el of elements) {
    if ('name' in el && 'value' in el) {
      data[(el as HTMLInputElement).name] = (el as HTMLInputElement).value;
    }
  }
  return data;
}
```

## Lazy Loading / Dynamic Imports

Load heavy components on demand to reduce initial bundle size.

```typescript
@customElement('bh-dashboard')
export class BhDashboard extends BaseElement {
  @state() private _chartLoaded = false;

  private async _loadChart() {
    await import('./bh-chart.js');
    this._chartLoaded = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadChart();
  }

  render() {
    return html`
      <div class="dashboard">
        ${this._chartLoaded
          ? html`<bh-chart .data=${this.chartData}></bh-chart>`
          : html`<bh-spinner></bh-spinner>`
        }
      </div>
    `;
  }
}
```

For intersection-observer-based lazy loading:

```typescript
private _observer?: IntersectionObserver;

connectedCallback() {
  super.connectedCallback();
  this._observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        this._loadChart();
        this._observer?.disconnect();
      }
    },
    { rootMargin: '200px' }
  );
}

firstUpdated() {
  this._observer?.observe(this);
}

disconnectedCallback() {
  super.disconnectedCallback();
  this._observer?.disconnect();
}
```

## Performance

### Compute derived state in `willUpdate`, not `render`

```typescript
// Good: computed once per update cycle, stored as state
@state() private _filteredItems: Item[] = [];

willUpdate(changedProperties: PropertyValues) {
  if (changedProperties.has('items') || changedProperties.has('filter')) {
    this._filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}

render() {
  return html`${repeat(this._filteredItems, (i) => i.id, (i) => html`...`)}`;
}
```

### Use `guard()` for expensive template sections

```typescript
import { guard } from 'lit/directives/guard.js';

render() {
  return html`
    ${guard([this.chartData], () => html`
      <bh-chart .data=${this.chartData}></bh-chart>
    `)}
  `;
}
```

### Use `repeat()` with keys for list diffing
Always provide a key function so Lit can reuse DOM nodes when items are reordered.

### Avoid creating new objects/arrays in render
Each new reference triggers child component updates.

```typescript
// Bad: new array created every render
render() {
  return html`<bh-list .items=${this.data.filter(d => d.active)}></bh-list>`;
}

// Good: compute in willUpdate
willUpdate(changed: PropertyValues) {
  if (changed.has('data')) {
    this._activeData = this.data.filter(d => d.active);
  }
}

render() {
  return html`<bh-list .items=${this._activeData}></bh-list>`;
}
```

### Use `@state` for internal state
Internal state does not need attribute reflection. Avoiding reflection saves the cost of serializing to/from attributes.
