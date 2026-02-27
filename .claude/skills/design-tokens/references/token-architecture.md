# Token Architecture Reference

## Three-Layer Model (Shoelace/Web Awesome Inspiration)

The bh-01 token system draws from the Shoelace/Web Awesome approach to design tokens:

1. **Design tokens as CSS custom properties** — The entire visual language is expressed as CSS custom properties, making it technology-agnostic and Shadow DOM-compatible.

2. **Components reference tokens, not raw values** — Every color, size, and spacing value in a component's styles uses a `var()` reference. No component ever contains a hex code, pixel value, or hardcoded measurement.

3. **Users customize via overriding tokens at any level** — Theming is achieved by redefining token values. Override a primitive to change the palette globally. Override a semantic token to change meaning across a theme. Override a component token to change one specific component.

This architecture means users can theme the entire library by setting a handful of CSS custom properties on `:root`, without touching component source code.

## Complete Naming Convention Guide

### Prefix: `--bh-`

Every token starts with `--bh-` to namespace the library and prevent collisions with other design systems or user-defined properties. This matches the `bh-` component prefix used for custom element tag names.

**Rationale**: Short enough to type frequently, unique enough to avoid conflicts.

### Category

The first segment after the prefix identifies the domain:

| Category | Purpose | Examples |
|---|---|---|
| `color` | All color values | `--bh-color-primary`, `--bh-color-gray-500` |
| `spacing` | Margins, paddings, gaps | `--bh-spacing-4`, `--bh-spacing-8` |
| `radius` | Border radii | `--bh-radius-md`, `--bh-radius-full` |
| `border` | Border widths | `--bh-border-1`, `--bh-border-2` |
| `font` | Typography | `--bh-font-body-size`, `--bh-font-sans` |
| `shadow` | Box shadows | `--bh-shadow-sm`, `--bh-shadow-lg` |
| `z` | Z-index layers | `--bh-z-modal`, `--bh-z-tooltip` |
| `transition` | Animation timing | `--bh-transition-fast` |
| `easing` | Easing curves | `--bh-easing-standard` |

**Rationale**: Category-first ordering groups related tokens together in autocomplete and makes the token's purpose immediately clear.

### Variant

The second segment names the specific value within the category:

- **Named scales** for conceptual values: `primary`, `surface`, `danger`, `body`, `heading`
- **Numbered scales** for graduated values: `50`, `100`, `200` (colors), `1`, `2`, `4`, `8` (spacing)
- **Size names** for discrete steps: `sm`, `md`, `lg`, `xl`, `2xl`

**Rationale**: Named scales communicate intent (semantic layer). Numbered scales communicate position in a range (primitive layer).

### Modifier (Optional)

Additional qualifier appended after the variant:

- **State**: `muted`, `hover`, `active`, `focus`
- **Surface relationship**: `on-surface`, `on-primary`, `raised`, `sunken`
- **Typography property**: `size`, `weight`, `line-height`, `family`

**Rationale**: Modifiers avoid creating separate categories for closely related tokens. `--bh-color-on-surface-muted` reads naturally as "the muted text color for use on a surface."

### Examples With Rationale

```css
/* Primitive: category + numbered scale position */
--bh-color-blue-500
/*  ^       ^     ^-- 500 = midpoint on the color scale */
/*  |       +-------- blue = the hue */
/*  +---------------- color = this is a color token */

/* Semantic: category + intent name */
--bh-color-primary
/*  ^       ^-- primary = the brand/action color intent */
/*  +---------- color = this is a color token */

/* Semantic with modifier: category + relationship + modifier */
--bh-color-on-surface-muted
/*  ^       ^          ^-- muted = reduced emphasis variant */
/*  |       +------------- on-surface = meant for text on surface bg */
/*  +---------------------- color = this is a color token */

/* Component override: component name + property */
--bh-button-bg
/*  ^       ^-- bg = background property being overridden */
/*  +---------- button = the component this token customizes */

/* Typography compound: category + style + property */
--bh-font-body-size
/*  ^      ^     ^-- size = which property of the style */
/*  |      +-------- body = the text style name */
/*  +--------------- font = typography category */
```

## How Tokens Work With Shadow DOM

CSS custom properties are the key mechanism for styling components that use Shadow DOM, because they inherit through shadow boundaries where class names and selectors cannot.

### The Inheritance Chain

```
:root (document level)
  --bh-color-primary: blue
  |
  +-- <bh-card>  (shadow root)
  |    Inherits --bh-color-primary: blue
  |    |
  |    +-- <bh-button>  (nested shadow root)
  |         Inherits --bh-color-primary: blue
  |         Uses: background: var(--bh-button-bg, var(--bh-color-primary))
  |
  +-- <bh-sidebar>  (shadow root)
       Can override: --bh-color-primary: purple
       |
       +-- <bh-button>  (nested shadow root)
            Inherits --bh-color-primary: purple (from sidebar override)
```

### Defining Tokens

Tokens are defined at the document root to establish global defaults:

```css
/* src/tokens/colors.css */
:root {
  --bh-color-primary: var(--bh-color-blue-500);
  --bh-color-surface: var(--bh-color-white);
}
```

### Consuming Tokens in Components

Components use `var()` with fallback chains to consume tokens:

```typescript
static styles = css`
  :host {
    background: var(--bh-button-bg, var(--bh-color-primary));
    color: var(--bh-button-color, var(--bh-color-on-primary));
    border-radius: var(--bh-button-radius, var(--bh-radius-md));
    padding: var(--bh-button-padding-y, var(--bh-spacing-2))
             var(--bh-button-padding-x, var(--bh-spacing-4));
  }
`;
```

The fallback chain means:
1. If `--bh-button-bg` is set, use it (component-level override)
2. Otherwise, fall back to `--bh-color-primary` (semantic token)
3. Which itself resolves to a primitive (e.g., `--bh-color-blue-500`)

### Overriding From Outside

Users override tokens at any level they need:

```css
/* Global theme change */
:root {
  --bh-color-primary: hotpink;
}

/* Scoped override -- buttons inside sidebar get different bg */
bh-sidebar {
  --bh-button-bg: var(--bh-color-secondary);
}

/* Single instance override */
bh-button.special {
  --bh-button-bg: var(--bh-color-accent);
}
```

## Responsive Token Patterns

Tokens can adapt to viewport size by redefining values in media queries:

```css
:root {
  --bh-spacing-base: 1rem;
  --bh-font-body-size: 1rem;
  --bh-font-heading-size: 1.5rem;
}

@media (max-width: 768px) {
  :root {
    --bh-spacing-base: 0.75rem;
    --bh-font-body-size: 0.9375rem;
    --bh-font-heading-size: 1.25rem;
  }
}

@media (min-width: 1440px) {
  :root {
    --bh-spacing-base: 1.25rem;
    --bh-font-heading-size: 1.75rem;
  }
}
```

Components that reference these tokens automatically adapt without any component-level media query code.

### Container-Relative Patterns

For components that adapt to their container rather than the viewport:

```css
/* Parent component adjusts tokens for its subtree */
:host([size="compact"]) {
  --bh-spacing-base: 0.5rem;
  --bh-font-body-size: 0.875rem;
}
```

## Extending With New Token Categories

Step-by-step guide for adding a new token category (e.g., `shadow`):

### Step 1: Create the Token File

Create `src/tokens/shadows.css`:

```css
/* Primitives */
:root {
  --bh-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --bh-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
                  0 2px 4px -2px rgb(0 0 0 / 0.1);
  --bh-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
                  0 4px 6px -4px rgb(0 0 0 / 0.1);
  --bh-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
                  0 8px 10px -6px rgb(0 0 0 / 0.1);
  --bh-shadow-none: none;
}

/* Semantic */
:root {
  --bh-shadow-card: var(--bh-shadow-sm);
  --bh-shadow-dropdown: var(--bh-shadow-lg);
  --bh-shadow-modal: var(--bh-shadow-xl);
}

/* Dark theme adjustments */
[data-theme="dark"] {
  --bh-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --bh-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4),
                  0 2px 4px -2px rgb(0 0 0 / 0.3);
  --bh-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5),
                  0 4px 6px -4px rgb(0 0 0 / 0.4);
}
```

### Step 2: Add to Barrel File

In `src/tokens/index.css`:

```css
@import './colors.css';
@import './spacing.css';
@import './typography.css';
@import './animation.css';
@import './shadows.css';  /* New category */
```

### Step 3: Use in Components

```typescript
static styles = css`
  :host {
    box-shadow: var(--bh-card-shadow, var(--bh-shadow-card));
  }
`;
```

### Step 4: Document in Storybook

Create a story that displays all tokens in the new category, showing each value visually alongside its token name. Follow the existing pattern in `src/stories/tokens/`.

## Token File Organization

```
src/tokens/
  index.css          # Barrel file, imports all categories
  colors.css         # Color primitives and semantic colors
  spacing.css        # Spacing scale
  typography.css     # Font families, sizes, weights, line-heights
  radius.css         # Border radius scale
  borders.css        # Border widths
  shadows.css        # Box shadow values
  z-index.css        # Z-index layers
  animation.css      # Transitions and easing curves
```

Each file follows the same structure:
1. Primitives first (raw values)
2. Semantic mappings second (referencing primitives)
3. Theme overrides third (dark mode, high contrast, etc.)
