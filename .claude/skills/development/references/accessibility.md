# Accessibility Reference

## ARIA in Shadow DOM

ARIA attributes work normally on custom elements. The browser treats the custom element as the accessible node, and screen readers see ARIA attributes set on it.

### Setting ARIA on the Host

```typescript
@customElement('bh-button')
export class BhButton extends LitElement {
  @property({ type: String, reflect: true })
  role = 'button';

  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = '';

  @property({ type: Boolean, reflect: true, attribute: 'aria-disabled' })
  override ariaDisabled: string | null = null;
}
```

Reflecting ARIA properties to attributes ensures screen readers can read them from the DOM.

### ARIA on Internal Elements

For complex components, apply ARIA to the appropriate internal element:

```typescript
@customElement('bh-combobox')
export class BhCombobox extends LitElement {
  @property({ type: Boolean })
  open = false;

  @state()
  private _activeDescendant = '';

  render() {
    return html`
      <input
        role="combobox"
        aria-expanded=${this.open}
        aria-activedescendant=${this._activeDescendant}
        aria-haspopup="listbox"
      />
      <ul role="listbox" ?hidden=${!this.open}>
        <slot></slot>
      </ul>
    `;
  }
}
```

### ARIA Live Regions

For dynamic content changes that screen readers should announce:

```typescript
render() {
  return html`
    <div aria-live="polite" aria-atomic="true">
      ${this._statusMessage}
    </div>
  `;
}

private _updateStatus(message: string) {
  this._statusMessage = message;
  // Screen reader will announce the new message
}
```

- `aria-live="polite"` — announces when user is idle
- `aria-live="assertive"` — interrupts current speech (use sparingly)
- `aria-atomic="true"` — reads the entire region, not just the change

## Keyboard Navigation

### Standard Keyboard Patterns

| Action | Keys |
|---|---|
| Activate button/link | `Enter`, `Space` |
| Navigate within widget | `Arrow` keys |
| Dismiss overlay | `Escape` |
| Move focus to next | `Tab` |
| Move focus to previous | `Shift+Tab` |

### Implementing Keyboard Handlers

```typescript
@customElement('bh-button')
export class BhButton extends LitElement {
  render() {
    return html`
      <div
        part="button"
        tabindex="0"
        role="button"
        @keydown=${this._handleKeydown}
        @click=${this._handleClick}
      >
        <slot></slot>
      </div>
    `;
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('bh-click', {
      bubbles: true,
      composed: true,
    }));
  }
}
```

### Roving Tabindex

For composite widgets (radio groups, toolbars, tab lists), use roving tabindex so only one item in the group is in the tab order:

```typescript
@customElement('bh-radio-group')
export class BhRadioGroup extends LitElement {
  @state()
  private _activeIndex = 0;

  private get _items(): HTMLElement[] {
    return [...this.querySelectorAll('bh-radio')] as HTMLElement[];
  }

  private _handleKeydown(e: KeyboardEvent) {
    const items = this._items;
    let index = this._activeIndex;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        index = (index + 1) % items.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        index = (index - 1 + items.length) % items.length;
        break;
      case 'Home':
        e.preventDefault();
        index = 0;
        break;
      case 'End':
        e.preventDefault();
        index = items.length - 1;
        break;
      default:
        return;
    }

    this._activeIndex = index;
    items[index].focus();
    items.forEach((item, i) => {
      item.setAttribute('tabindex', i === index ? '0' : '-1');
    });
  }

  render() {
    return html`
      <div role="radiogroup" @keydown=${this._handleKeydown}>
        <slot></slot>
      </div>
    `;
  }
}
```

## Focus Management

### `delegatesFocus`

When set, clicking anywhere inside the shadow root focuses the first focusable element:

```typescript
@customElement('bh-input')
export class BhInput extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  render() {
    return html`
      <label part="label"><slot name="label"></slot></label>
      <input part="input" type="text" />
    `;
  }
}
```

With `delegatesFocus: true`, clicking the label area focuses the internal `<input>`.

### Focus Trap for Modals

Trap focus inside a modal so Tab/Shift+Tab cycle within the dialog:

```typescript
export class FocusTrapController implements ReactiveController {
  private _host: ReactiveControllerHost & HTMLElement;
  private _focusableElements: HTMLElement[] = [];

  constructor(host: ReactiveControllerHost & HTMLElement) {
    this._host = host;
    host.addController(this);
  }

  activate() {
    this._focusableElements = this._getFocusable();
    if (this._focusableElements.length > 0) {
      this._focusableElements[0].focus();
    }
    this._host.addEventListener('keydown', this._handleKeydown);
  }

  deactivate() {
    this._host.removeEventListener('keydown', this._handleKeydown);
  }

  hostDisconnected() {
    this.deactivate();
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusable = this._getFocusable();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  private _getFocusable(): HTMLElement[] {
    const selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return [...this._host.shadowRoot!.querySelectorAll(selector)] as HTMLElement[];
  }
}
```

### Focus Indicators

Every focusable element must have a visible focus indicator. Use the design token system:

```typescript
static styles = css`
  :host(:focus-visible) {
    outline: 2px solid var(--bh-color-border-focus);
    outline-offset: 2px;
  }

  /* Remove default outline when using custom focus styles */
  :host(:focus:not(:focus-visible)) {
    outline: none;
  }
`;
```

## Color Contrast With Tokens

The semantic token system ensures accessible contrast by design:

- `--bh-color-on-surface` is always readable on `--bh-color-surface`
- `--bh-color-on-primary` is always readable on `--bh-color-primary`
- `--bh-color-on-danger` is always readable on `--bh-color-danger`

When creating new theme mappings, verify:
- Normal text (< 18px): minimum 4.5:1 contrast ratio (WCAG AA)
- Large text (>= 18px or >= 14px bold): minimum 3:1 contrast ratio
- UI components and graphical objects: minimum 3:1 contrast ratio

### Forced Colors / High Contrast Mode

Test components with `forced-colors` media query:

```typescript
static styles = css`
  @media (forced-colors: active) {
    :host {
      border: 1px solid ButtonText;
    }

    .icon {
      forced-color-adjust: auto;
    }
  }
`;
```

In forced-colors mode, the browser overrides all colors. Use `forced-color-adjust: none` only when custom colors are essential for understanding (e.g., data visualizations), and provide alternative labels.

## Screen Reader Utilities

### Visually Hidden Content

For text that should be read by screen readers but not visible:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

Usage in components:

```typescript
render() {
  return html`
    <button part="close">
      <bh-icon name="x"></bh-icon>
      <span class="sr-only">Close dialog</span>
    </button>
  `;
}
```

## Accessibility Patterns by Atomic Level

### Atoms (Button, Input, Icon, Badge)

- Proper ARIA `role` on the host or primary internal element
- Keyboard activation (`Enter`/`Space` for buttons)
- Visible focus indicators via `:focus-visible`
- `aria-label` or `aria-labelledby` when visual label is absent (icon buttons)
- `aria-disabled` reflected as attribute for CSS styling

### Molecules (Input Group, Button Group, Card)

- Focus management between child elements
- Group labels via `aria-labelledby` or `aria-label` on the container
- `role="group"` or `role="toolbar"` as appropriate
- Roving tabindex for composite widgets

### Organisms (Dialog, Navigation, Data Table)

- Landmark roles: `role="dialog"`, `role="navigation"`, `role="table"`
- Full keyboard navigation patterns (arrow keys, Home/End)
- Focus trap for modal dialogs
- `aria-live` regions for dynamic content updates
- `aria-expanded` / `aria-controls` for expandable sections
- Column headers (`role="columnheader"`) and row structure for tables

## Testing Accessibility

### Automated Testing

Use `@open-wc/testing` with accessibility plugins:

```typescript
import { expect, fixture, html } from '@open-wc/testing';

it('passes accessibility audit', async () => {
  const el = await fixture(html`<bh-button>Click me</bh-button>`);
  await expect(el).to.be.accessible();
});
```

### Manual Testing Checklist

1. Tab through all interactive elements -- is order logical?
2. Activate every control with keyboard only
3. Test with screen reader (VoiceOver on macOS)
4. Zoom to 200% -- does layout remain usable?
5. Enable high contrast mode -- are controls still distinguishable?
6. Check all images/icons have text alternatives
