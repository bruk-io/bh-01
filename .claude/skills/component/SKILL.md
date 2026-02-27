---
name: component
description: >
  Create Lit 3 web components following atomic design. Covers component structure,
  properties, events, slots, styles, and the BaseElement pattern.
---

# Component Skill

Create Lit 3 web components for the bh-01 design system using atomic design principles and the BaseElement pattern.

## Atomic Level Decision Tree

Choose the correct level before writing any component:

- **Primitive**: Base element, mixins, utilities — not UI components themselves. These are building blocks that other components extend or consume. Examples: `BaseElement`, `FormMixin`, design token definitions.
- **Atom**: Single-purpose UI element with no children components. It renders only native HTML elements internally. Examples: `bh-button`, `bh-input`, `bh-badge`, `bh-icon`, `bh-link`.
- **Molecule**: Composes 2+ atoms into a functional unit. Examples: `bh-search-bar` (input + button), `bh-form-field` (label + input + error), `bh-menu-item` (icon + label + badge).
- **Organism**: Composes molecules and/or atoms into a complex section. Examples: `bh-navbar`, `bh-data-table`, `bh-dialog`, `bh-sidebar`.

**Decision questions:**
1. Does it render other `bh-*` components? No -> Atom. Yes -> continue.
2. Does it compose a small number of atoms into one functional unit? Yes -> Molecule.
3. Does it represent a distinct section or complex interactive region? Yes -> Organism.

## Canonical Component Structure

Every component follows this template:

```typescript
import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

@customElement('bh-example')
export class BhExample extends BaseElement {
  static styles = [
    ...BaseElement.styles,
    css`
      :host {
        display: block;
      }
    `
  ];

  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`
      <div class="example">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-example': BhExample;
  }
}
```

## Property Conventions

- Use `@property` with explicit `type` option for primitives (`String`, `Number`, `Boolean`).
- Use `reflect: true` for properties that should appear as HTML attributes — visual states like `disabled`, `active`, `variant`.
- Set default values in the property declaration, not the constructor.
- Boolean properties default to `false`.
- Use `@state()` for internal-only reactive state that should not be part of the public API.
- Use `.property` binding syntax for complex data (objects, arrays) passed from parent templates.

```typescript
// Public API — reactive properties
@property({ type: String }) variant: 'primary' | 'secondary' = 'primary';
@property({ type: Boolean, reflect: true }) disabled = false;
@property({ type: Number }) count = 0;

// Internal state — not exposed as attributes
@state() private _open = false;
@state() private _selectedIndex = -1;
```

## Event Conventions

- Always use `CustomEvent`.
- Set `bubbles: true` and `composed: true` so events cross shadow DOM boundaries.
- Name events with present tense and the `bh-` prefix: `bh-click`, `bh-change`, `bh-select`.
- Type the `detail` payload explicitly.
- Emit events from methods, never from within `render()`.

```typescript
private _handleClick() {
  this.dispatchEvent(
    new CustomEvent<{ value: string }>('bh-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    })
  );
}
```

## Slot Patterns

- Use a default slot for main content.
- Use named slots for structured content: `<slot name="prefix">`, `<slot name="suffix">`.
- Use `::slotted()` sparingly for basic slot styling.
- Document slots with JSDoc on the class.

```typescript
/**
 * @slot - Default slot for main content
 * @slot prefix - Content before the main area
 * @slot suffix - Content after the main area
 */
@customElement('bh-card')
export class BhCard extends BaseElement {
  render() {
    return html`
      <div class="card">
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
      </div>
    `;
  }
}
```

## Style Conventions

- Always spread `BaseElement.styles` first in the styles array.
- Set `:host { display: block }` (or `inline-block` for inline elements).
- Use semantic design tokens — never hardcode colors, spacing, or font sizes.
- Use `:host([disabled])` for attribute-reflected state styling.
- Never use `!important`.
- Scope all styles within `:host` or internal class selectors.

```typescript
static styles = [
  ...BaseElement.styles,
  css`
    :host {
      display: block;
      padding: var(--bh-spacing-md);
      color: var(--bh-color-text);
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    .label {
      font-size: var(--bh-font-size-sm);
      font-weight: var(--bh-font-weight-medium);
    }
  `
];
```

## Anti-patterns

- **Extending LitElement directly** — always use `BaseElement` so shared styles and behaviors are inherited.
- **Hardcoded colors/spacing** — use design tokens (`var(--bh-*)`).
- **Using querySelector across shadow boundaries** — shadow DOM encapsulation prevents this; use events or context instead.
- **Setting properties in connectedCallback that should be defaults** — set defaults in the property declaration.
- **Forgetting HTMLElementTagNameMap declaration** — this breaks TypeScript type inference for `querySelector` and tag literals.
- **Using innerHTML or unsafeHTML without sanitization** — always prefer Lit templates; if dynamic HTML is unavoidable, sanitize first.
- **Creating new objects/arrays in render** — causes unnecessary re-renders; compute in `willUpdate` and store as `@state`.
