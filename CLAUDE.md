# bh-01

Lit 3 web component library using atomic design methodology.

## Directory Structure

- `src/tokens/` — Design tokens (CSS custom properties)
- `src/primitives/` — Base element, mixins, utilities
- `src/atoms/` — Smallest UI units (button, input, badge, icon)
- `src/molecules/` — Composed atoms (search bar, card, form field)
- `src/organisms/` — Complex composed molecules (navbar, data table, dialog)

## BaseElement

All components extend `BaseElement` (in `src/primitives/base-element.ts`), which extends `LitElement`. Never extend `LitElement` directly. BaseElement provides shared styles, token imports, and common behaviors.

## Component Naming

All components use the `bh-{name}` prefix (e.g., `bh-button`, `bh-card`). The prefix is configurable via a constant.

## Token Architecture

Three-layer system:

1. **Primitives** — Raw values: `--bh-color-blue-500`, `--bh-spacing-4`
2. **Semantic** — Theme-aware aliases: `--bh-color-primary`, `--bh-color-surface`
3. **Component overrides** — Per-component knobs: `--bh-button-bg`, `--bh-card-radius`

Components use semantic tokens. Never reference primitive tokens directly in components.

## Data Flow

Properties down, events up.

- Parent components pass data via properties/attributes
- Children communicate up via `CustomEvent` with `bubbles: true` and `composed: true`

## Tooling

- **Dev & Build**: Vite
- **Language**: TypeScript (strict mode)
- **Testing**: @web/test-runner
- **Docs**: Storybook

## Key Rules

- Every component gets its own directory: `src/{level}/{name}/`
- Export from barrel files (`index.ts`)
- Declare in `HTMLElementTagNameMap` for type safety
- Use `css` tagged template for styles, never inline
- `:host { display: block }` (or `inline-block`) on every component
- No direct `LitElement` extension — always use `BaseElement`
