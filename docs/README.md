# bh-01

Lit 3 web component library using atomic design methodology.

## Installation

```bash
npm install @bruk-io/bh-01
```

## Quick Start

### 1. Import the tokens and theme

```html
<!-- In your HTML head -->
<link rel="stylesheet" href="node_modules/@bruk-io/bh-01/tokens">
<link rel="stylesheet" href="node_modules/@bruk-io/bh-01/theme">
```

Or import in CSS/JS:

```css
@import "@bruk-io/bh-01/tokens";
@import "@bruk-io/bh-01/theme";
```

### 2. Import components

Register components via side-effect imports:

```js
// Import the whole library
import "@bruk-io/bh-01";

// Or import individual components
import "@bruk-io/bh-01/atoms/button";
import "@bruk-io/bh-01/atoms/input";
import "@bruk-io/bh-01/molecules/form-field";
```

### 3. Use in HTML

```html
<bh-form-field label="Email" required>
  <bh-input type="email" placeholder="you@example.com"></bh-input>
</bh-form-field>

<bh-button variant="primary">Submit</bh-button>
```

---

## Architecture

### Atomic Design

Components are organized into three levels:

| Level | Path | Description |
|-------|------|-------------|
| **Atoms** | `src/atoms/` | Smallest UI units: button, input, badge, icon, etc. |
| **Molecules** | `src/molecules/` | Composed atoms: form-field, card, nav-item, etc. |
| **Organisms** | `src/organisms/` | Complex compositions: app-shell, tabs, data-table, etc. |

A fourth category covers pure layout helpers:

| Level | Path | Description |
|-------|------|-------------|
| **Layout** | `src/layout/` | CSS-only layout primitives: stack, cluster, grid, etc. |

### Token System

Tokens follow a three-layer architecture:

```
Primitives  →  Semantic  →  Component Overrides
(raw values)   (theme-aware)  (per-component knobs)
```

1. **Primitives** — Raw scale values: `--bh-color-blue-500`, `--bh-spacing-4`
2. **Semantic** — Theme-aware aliases: `--bh-color-primary`, `--bh-color-surface`
3. **Component overrides** — Per-component CSS custom properties: `--bh-button-bg`, `--bh-card-radius`

Components reference only semantic tokens. Swap themes by redefining the semantic layer. See [tokens.md](./tokens.md) for the full catalog.

### BaseElement

All components extend `BaseElement` (not `LitElement` directly). `BaseElement` provides:
- Shared base styles
- Token CSS imports
- Common reactive behaviors

```ts
import { BaseElement } from "@bruk-io/bh-01/primitives";

class MyComponent extends BaseElement {
  // ...
}
```

### Data Flow

- **Properties down** — parents pass data via attributes/properties
- **Events up** — children communicate via `CustomEvent` with `bubbles: true, composed: true`

---

## Component Reference

See [components.md](./components.md) for the full API reference covering all 46 components:
- Properties, types, and defaults
- Events and their detail types
- Slots
- CSS parts (for external styling)
- CSS custom properties (for theming)

---

## Design Tokens

See [tokens.md](./tokens.md) for the complete token catalog:
- Spacing scale
- Typography (families, sizes, weights)
- Color palette (primitives + semantic aliases)
- Border radius, shadows, borders
- Z-index layers
- Transitions

---

## Composition Patterns

See [patterns.md](./patterns.md) for common composition recipes:
- Shell layout (app-shell + activity-bar + sidebar)
- Tab navigation
- Form composition
- Overlays (command palette, context menu)
- Tree navigation
- Cards with actions
- Toolbars

---

## Development

```bash
# Install dependencies
npm install

# Start dev server + Storybook
npm run storybook

# Run tests
npm test

# Build
npm run build

# Type check
npm run lint
```

### Storybook

```bash
npm run storybook
# Opens at http://localhost:6006
```

---

## Tooling

| Tool | Purpose |
|------|---------|
| [Lit 3](https://lit.dev) | Web component framework |
| [Vite](https://vitejs.dev) | Dev server and bundler |
| [TypeScript](https://www.typescriptlang.org) | Type safety (strict mode) |
| [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/) | Browser testing |
| [Storybook](https://storybook.js.org) | Component documentation and visual testing |
