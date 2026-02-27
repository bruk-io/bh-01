---
name: design-tokens
description: >
  Design token architecture, CSS custom properties, theming, and the three-layer
  token system for Lit web components.
---

# Design Tokens

## Three-Layer Architecture

All styling in bh-01 flows through a three-layer token system. Each layer builds on the one below it.

### Layer 1: Primitives

Raw values that form the design palette. Never used directly in components.

```css
/* Colors */
--bh-color-blue-500: #3b82f6;
--bh-color-gray-900: #111827;

/* Spacing */
--bh-spacing-4: 1rem;
--bh-spacing-8: 2rem;

/* Radius */
--bh-radius-md: 0.375rem;
```

### Layer 2: Semantic

Theme-aware tokens that reference primitives. These carry meaning and switch between themes.

```css
/* Surfaces */
--bh-color-primary: var(--bh-color-blue-500);
--bh-color-surface: var(--bh-color-gray-50);
--bh-color-on-surface: var(--bh-color-gray-900);

/* Intent */
--bh-color-danger: var(--bh-color-red-500);
--bh-color-success: var(--bh-color-green-500);
```

### Layer 3: Component Overrides

Per-component tokens that allow targeted customization without affecting the whole system.

```css
--bh-button-bg: var(--bh-color-primary);
--bh-button-radius: var(--bh-radius-md);
--bh-button-padding-x: var(--bh-spacing-4);
```

## Why CSS Custom Properties

- **Pierce shadow DOM boundaries** — unlike CSS classes, custom properties inherit through shadow roots
- **No framework coupling** — works with any renderer or plain HTML
- **Native browser feature** — zero runtime cost, no JavaScript overhead
- **Composable** — `var()` with fallbacks enables layered defaults

## Primitive Categories

### Colors

Full palette with 50-950 steps for each hue:
- **Gray**: `--bh-color-gray-{50|100|200|300|400|500|600|700|800|900|950}`
- **Blue**: `--bh-color-blue-{50-950}`
- **Green**: `--bh-color-green-{50-950}`
- **Red**: `--bh-color-red-{50-950}`
- **Amber**: `--bh-color-amber-{50-950}`
- Additional hues as needed (purple, teal, etc.)
- **White/Black**: `--bh-color-white`, `--bh-color-black`

### Spacing

Linear scale used for padding, margin, and gap:

| Token | Value |
|---|---|
| `--bh-spacing-0` | 0 |
| `--bh-spacing-1` | 0.25rem |
| `--bh-spacing-2` | 0.5rem |
| `--bh-spacing-3` | 0.75rem |
| `--bh-spacing-4` | 1rem |
| `--bh-spacing-5` | 1.25rem |
| `--bh-spacing-6` | 1.5rem |
| `--bh-spacing-8` | 2rem |
| `--bh-spacing-10` | 2.5rem |
| `--bh-spacing-12` | 3rem |
| `--bh-spacing-16` | 4rem |
| `--bh-spacing-20` | 5rem |
| `--bh-spacing-24` | 6rem |
| `--bh-spacing-32` | 8rem |

### Border Radius

| Token | Value |
|---|---|
| `--bh-radius-none` | 0 |
| `--bh-radius-sm` | 0.125rem |
| `--bh-radius-md` | 0.375rem |
| `--bh-radius-lg` | 0.5rem |
| `--bh-radius-xl` | 0.75rem |
| `--bh-radius-2xl` | 1rem |
| `--bh-radius-full` | 9999px |

### Border Width

`--bh-border-0`: 0, `--bh-border-1`: 1px, `--bh-border-2`: 2px, `--bh-border-4`: 4px

### Font Weights

`--bh-font-weight-{100|200|300|400|500|600|700|800|900}`

### Z-Index

| Token | Value | Usage |
|---|---|---|
| `--bh-z-base` | 0 | Default stacking |
| `--bh-z-dropdown` | 1000 | Dropdown menus |
| `--bh-z-sticky` | 1100 | Sticky headers |
| `--bh-z-fixed` | 1200 | Fixed elements |
| `--bh-z-modal-backdrop` | 1300 | Modal overlay |
| `--bh-z-modal` | 1400 | Modal dialog |
| `--bh-z-popover` | 1500 | Popovers |
| `--bh-z-tooltip` | 1600 | Tooltips |

## Semantic Categories

### Surfaces

```css
--bh-color-surface          /* Default background */
--bh-color-surface-raised   /* Cards, elevated panels */
--bh-color-surface-overlay  /* Modals, popovers */
--bh-color-surface-sunken   /* Inset areas, wells */
```

### Text

```css
--bh-color-on-surface       /* Primary text on default surface */
--bh-color-on-surface-muted /* Secondary/helper text */
--bh-color-on-primary       /* Text on primary-colored backgrounds */
--bh-color-on-danger        /* Text on danger-colored backgrounds */
```

### Accents

```css
--bh-color-primary          /* Brand / primary actions */
--bh-color-secondary        /* Secondary actions */
--bh-color-accent           /* Highlights, decorative */
```

### Status

```css
--bh-color-success          /* Success states */
--bh-color-warning          /* Warning states */
--bh-color-danger           /* Error / destructive states */
--bh-color-info             /* Informational states */
```

### Borders

```css
--bh-color-border-default   /* Standard borders */
--bh-color-border-muted     /* Subtle dividers */
--bh-color-border-focus     /* Focus rings */
```

## Typography Tokens

Typography tokens group size, weight, line-height, and family for each text style:

```css
/* Body */
--bh-font-body-size: 1rem;
--bh-font-body-weight: 400;
--bh-font-body-line-height: 1.5;
--bh-font-body-family: var(--bh-font-sans);

/* Headings */
--bh-font-heading-size: 1.5rem;
--bh-font-heading-weight: 700;
--bh-font-heading-line-height: 1.25;

/* Small / Caption */
--bh-font-small-size: 0.875rem;
--bh-font-small-weight: 400;
--bh-font-small-line-height: 1.4;

/* Font families */
--bh-font-sans: system-ui, -apple-system, sans-serif;
--bh-font-mono: ui-monospace, 'Cascadia Code', monospace;
```

## Animation Tokens

```css
--bh-transition-fast: 150ms ease;
--bh-transition-normal: 250ms ease;
--bh-transition-slow: 350ms ease;

--bh-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
--bh-easing-decelerate: cubic-bezier(0, 0, 0.2, 1);
--bh-easing-accelerate: cubic-bezier(0.4, 0, 1, 1);
```

## Theme Switching

Themes swap semantic tokens by repointing them to different primitives:

```css
:root,
[data-theme="light"] {
  --bh-color-surface: var(--bh-color-white);
  --bh-color-surface-raised: var(--bh-color-gray-50);
  --bh-color-on-surface: var(--bh-color-gray-900);
  --bh-color-on-surface-muted: var(--bh-color-gray-500);
  --bh-color-border-default: var(--bh-color-gray-200);
}

[data-theme="dark"] {
  --bh-color-surface: var(--bh-color-gray-900);
  --bh-color-surface-raised: var(--bh-color-gray-800);
  --bh-color-on-surface: var(--bh-color-gray-50);
  --bh-color-on-surface-muted: var(--bh-color-gray-400);
  --bh-color-border-default: var(--bh-color-gray-700);
}
```

## Naming Convention

Pattern: `--bh-{category}-{variant}-{modifier}`

| Part | Description | Examples |
|---|---|---|
| `--bh-` | Library prefix | Always present |
| `{category}` | Token domain | `color`, `spacing`, `radius`, `font`, `shadow`, `z`, `transition`, `border` |
| `{variant}` | Specific value | `primary`, `surface`, `body`, `md` |
| `{modifier}` | Optional qualifier | `muted`, `raised`, `size`, `weight` |

Examples:
- `--bh-color-primary` — category: color, variant: primary
- `--bh-spacing-4` — category: spacing, variant: 4
- `--bh-font-body-size` — category: font, variant: body, modifier: size
- `--bh-color-on-surface-muted` — category: color, variant: on-surface, modifier: muted

## Rules

- Components **always** use semantic tokens, never primitives
- Use fallback chains: `var(--bh-button-bg, var(--bh-color-primary))`
- Token files live in `src/tokens/`
- One file per category: `colors.css`, `spacing.css`, `typography.css`, `animation.css`, etc.
- Barrel file `src/tokens/index.css` imports all category files

## Anti-Patterns

- **Hardcoded values in components** — `color: #333` bypasses theming entirely
- **Using primitive tokens in components** — `var(--bh-color-blue-500)` breaks when theme changes
- **Overriding tokens with !important** — breaks the cascade and makes debugging impossible
- **Creating one-off tokens for a single component** — if only one component uses it, it belongs in the component override layer, not as a new semantic token
