# Design Tokens

Design tokens are CSS custom properties defined in three layers:

1. **Primitives** -- Raw scale values (`--bh-color-blue-500`, `--bh-spacing-4`)
2. **Semantic** -- Theme-aware aliases (`--bh-color-primary`, `--bh-color-surface`)
3. **Component overrides** -- Per-component knobs (`--bh-button-bg`, `--bh-card-radius`)

Components reference only semantic tokens. Primitive tokens feed into semantic tokens via theme files.

Token CSS files live in `src/tokens/`. The default theme mapping lives in `src/themes/default.css`.

---

## Spacing

Defined in `src/tokens/spacing.css`.

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-spacing-0` | `0` | No spacing |
| `--bh-spacing-0-5` | `0.125rem` | 2px -- extra-small nudge |
| `--bh-spacing-1` | `0.25rem` | 4px |
| `--bh-spacing-1-5` | `0.375rem` | 6px |
| `--bh-spacing-2` | `0.5rem` | 8px |
| `--bh-spacing-2-5` | `0.625rem` | 10px |
| `--bh-spacing-3` | `0.75rem` | 12px |
| `--bh-spacing-3-5` | `0.875rem` | 14px |
| `--bh-spacing-4` | `1rem` | 16px -- base spacing unit |
| `--bh-spacing-5` | `1.25rem` | 20px |
| `--bh-spacing-6` | `1.5rem` | 24px |
| `--bh-spacing-7` | `1.75rem` | 28px |
| `--bh-spacing-8` | `2rem` | 32px |
| `--bh-spacing-9` | `2.25rem` | 36px |
| `--bh-spacing-10` | `2.5rem` | 40px |
| `--bh-spacing-11` | `2.75rem` | 44px |
| `--bh-spacing-12` | `3rem` | 48px |
| `--bh-spacing-14` | `3.5rem` | 56px |
| `--bh-spacing-16` | `4rem` | 64px |
| `--bh-spacing-20` | `5rem` | 80px |
| `--bh-spacing-24` | `6rem` | 96px |
| `--bh-spacing-28` | `7rem` | 112px |
| `--bh-spacing-32` | `8rem` | 128px |

---

## Typography

Defined in `src/tokens/typography.css`.

### Font Families

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-font-sans` | `system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` | Default sans-serif system font stack |
| `--bh-font-mono` | `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace` | Monospace font stack for code |

### Font Sizes

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-text-2xs` | `0.625rem` | 10px -- smallest text |
| `--bh-text-xs` | `0.75rem` | 12px -- extra-small text |
| `--bh-text-sm` | `0.875rem` | 14px -- small text |
| `--bh-text-base` | `1rem` | 16px -- body text |
| `--bh-text-lg` | `1.125rem` | 18px -- large text |
| `--bh-text-xl` | `1.25rem` | 20px -- extra-large text |
| `--bh-text-2xl` | `1.5rem` | 24px -- heading text |
| `--bh-text-3xl` | `1.875rem` | 30px -- large heading |
| `--bh-text-4xl` | `2.25rem` | 36px -- display heading |

### Font Weights

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-font-normal` | `400` | Regular weight |
| `--bh-font-medium` | `500` | Medium weight |
| `--bh-font-semibold` | `600` | Semi-bold weight |
| `--bh-font-bold` | `700` | Bold weight |

### Letter Spacing

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-tracking-tighter` | `-0.5px` | Tightest letter spacing |
| `--bh-tracking-tight` | `-0.3px` | Tight letter spacing |
| `--bh-tracking-normal` | `0` | Default letter spacing |
| `--bh-tracking-wide` | `0.5px` | Wide letter spacing |
| `--bh-tracking-wider` | `1px` | Wider letter spacing |
| `--bh-tracking-widest` | `2px` | Widest letter spacing |

### Line Heights

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-leading-none` | `1` | No extra leading (1x) |
| `--bh-leading-tight` | `1.25` | Tight leading -- headings |
| `--bh-leading-snug` | `1.375` | Snug leading |
| `--bh-leading-normal` | `1.5` | Normal leading -- body text |
| `--bh-leading-relaxed` | `1.625` | Relaxed leading -- spacious text |

### Semantic Composites

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-body-size` | `var(--bh-text-base)` | Body text font size (16px) |
| `--bh-body-weight` | `var(--bh-font-normal)` | Body text font weight (400) |
| `--bh-body-leading` | `var(--bh-leading-normal)` | Body text line height (1.5) |
| `--bh-heading-size` | `var(--bh-text-2xl)` | Heading font size (24px) |
| `--bh-heading-weight` | `var(--bh-font-bold)` | Heading font weight (700) |
| `--bh-heading-leading` | `var(--bh-leading-tight)` | Heading line height (1.25) |
| `--bh-small-size` | `var(--bh-text-sm)` | Small text font size (14px) |
| `--bh-small-weight` | `var(--bh-font-normal)` | Small text font weight (400) |
| `--bh-small-leading` | `var(--bh-leading-normal)` | Small text line height (1.5) |

---

## Colors

### Primitive Palette

Defined in `src/tokens/colors.css`. These are raw color values. Components should not reference these directly -- use semantic tokens instead.

#### Base

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-color-black` | `#000000` | Pure black |
| `--bh-color-white` | `#FFFFFF` | Pure white |

#### Accents

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-color-mandarin` | `#FF6B35` | Primary brand orange |
| `--bh-color-mandarin-light` | `#FF8B4D` | Lighter mandarin |
| `--bh-color-mandarin-lighter` | `#FFAA75` | Lightest mandarin |
| `--bh-color-mandarin-dark` | `#E85A28` | Darker mandarin |
| `--bh-color-mandarin-darker` | `#C4461C` | Darkest mandarin |
| `--bh-color-sky` | `#5DAFD6` | Blue accent |
| `--bh-color-pomegranate` | `#F83E1F` | Red-orange accent |
| `--bh-color-amaranth` | `#E92C63` | Pink-red accent |
| `--bh-color-amaranth-light` | `#F04E77` | Lighter amaranth |
| `--bh-color-amaranth-lighter` | `#F47090` | Lightest amaranth |
| `--bh-color-amaranth-dark` | `#D11A50` | Darker amaranth |
| `--bh-color-amaranth-darker` | `#B8163F` | Darkest amaranth |

#### Dark Neutrals

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-color-cod` | `#0D0C0A` | Deepest dark -- dark theme background |
| `--bh-color-night` | `#111110` | Near-black neutral |
| `--bh-color-thunder` | `#151412` | Dark theme surface |
| `--bh-color-charcoal` | `#1A1A1A` | Dark neutral -- light theme text |
| `--bh-color-soot` | `#1E1D1B` | Dark warm neutral |
| `--bh-color-mine-shaft` | `#222120` | Dark theme raised surface |
| `--bh-color-tundora` | `#2A2826` | Dark theme border |
| `--bh-color-boulder` | `#5A5754` | Mid-tone neutral -- muted text |
| `--bh-color-bitter` | `#777875` | Mid-light neutral |

#### Light Neutrals

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-color-fossil` | `#A8A39B` | Warm gray |
| `--bh-color-swiss-coffee` | `#C8C4BC` | Light warm gray -- dark theme text |
| `--bh-color-linen` | `#CCC7BD` | Warm light neutral |
| `--bh-color-bone` | `#DDD9D1` | Light neutral |
| `--bh-color-pearl` | `#E8E4DC` | Light theme surface |
| `--bh-color-alabaster` | `#F0ECE4` | Light theme background |
| `--bh-color-parchment` | `#F5F2EC` | Lightest warm neutral |

### Semantic Colors

Defined in `src/themes/default.css`. These map primitive tokens to theme-aware roles, switching automatically between light and dark themes.

#### Surfaces

| Token | Light | Dark | Description |
|-------|-------|------|-------------|
| `--bh-color-bg` | `var(--bh-color-alabaster)` | `var(--bh-color-cod)` | Page background |
| `--bh-color-surface` | `var(--bh-color-pearl)` | `var(--bh-color-thunder)` | Card / section background |
| `--bh-color-surface-raised` | `var(--bh-color-parchment)` | `var(--bh-color-mine-shaft)` | Elevated surface (popover, dropdown) |
| `--bh-color-surface-overlay` | `var(--bh-color-white)` | `var(--bh-color-mine-shaft)` | Modal / overlay background |
| `--bh-color-surface-recessed` | `var(--bh-color-bone)` | `var(--bh-color-night)` | Inset / recessed area |

#### Text

| Token | Light | Dark | Description |
|-------|-------|------|-------------|
| `--bh-color-text` | `var(--bh-color-charcoal)` | `var(--bh-color-swiss-coffee)` | Default body text |
| `--bh-color-text-muted` | `var(--bh-color-boulder)` | `var(--bh-color-boulder)` | De-emphasized text |
| `--bh-color-text-tertiary` | `var(--bh-color-boulder)` | `var(--bh-color-boulder)` | Tertiary / placeholder text |
| `--bh-color-text-inverse` | `var(--bh-color-white)` | `var(--bh-color-cod)` | Text on inverse background |
| `--bh-color-text-bright` | `var(--bh-color-black)` | `var(--bh-color-white)` | Maximum contrast text |

#### Primary

| Token | Light | Dark | Description |
|-------|-------|------|-------------|
| `--bh-color-primary` | `var(--bh-color-mandarin)` | `var(--bh-color-mandarin)` | Primary action color |
| `--bh-color-primary-hover` | `var(--bh-color-mandarin-dark)` | `var(--bh-color-mandarin-light)` | Primary hover state |
| `--bh-color-primary-active` | `var(--bh-color-mandarin-darker)` | `var(--bh-color-mandarin-lighter)` | Primary active/pressed state |
| `--bh-color-primary-text` | `var(--bh-color-white)` | `var(--bh-color-cod)` | Text on primary background |
| `--bh-color-primary-glow` | `rgba(255, 107, 53, 0.12)` | `rgba(255, 107, 53, 0.15)` | Primary focus ring / glow |

#### Secondary

| Token | Light | Dark | Description |
|-------|-------|------|-------------|
| `--bh-color-secondary` | `var(--bh-color-pearl)` | `var(--bh-color-mine-shaft)` | Secondary action background |
| `--bh-color-secondary-hover` | `var(--bh-color-bone)` | `var(--bh-color-tundora)` | Secondary hover state |
| `--bh-color-secondary-active` | `var(--bh-color-linen)` | `var(--bh-color-boulder)` | Secondary active/pressed state |
| `--bh-color-secondary-text` | `var(--bh-color-charcoal)` | `var(--bh-color-swiss-coffee)` | Text on secondary background |

#### Accent Colors

| Token | Light | Dark | Description |
|-------|-------|------|-------------|
| `--bh-color-accent` | `var(--bh-color-mandarin)` | `var(--bh-color-mandarin)` | Primary accent color |
| `--bh-color-accent-secondary` | `var(--bh-color-sky)` | `var(--bh-color-sky)` | Secondary accent (blue) |
| `--bh-color-accent-tertiary` | `var(--bh-color-amaranth)` | `var(--bh-color-amaranth)` | Tertiary accent (pink) |

#### Status

| Token | Light | Dark | Description |
|-------|-------|------|-------------|
| `--bh-color-success` | `var(--bh-color-sky)` | `var(--bh-color-sky)` | Success state |
| `--bh-color-success-dim` | `rgba(93, 175, 214, 0.15)` | `rgba(93, 175, 214, 0.15)` | Dimmed success background |
| `--bh-color-warning` | `var(--bh-color-pomegranate)` | `var(--bh-color-pomegranate)` | Warning state |
| `--bh-color-warning-dim` | `rgba(248, 62, 31, 0.15)` | `rgba(248, 62, 31, 0.15)` | Dimmed warning background |
| `--bh-color-danger` | `var(--bh-color-amaranth)` | `var(--bh-color-amaranth)` | Danger / destructive action |
| `--bh-color-danger-hover` | `var(--bh-color-amaranth-dark)` | `var(--bh-color-amaranth-light)` | Danger hover state |
| `--bh-color-danger-active` | `var(--bh-color-amaranth-darker)` | `var(--bh-color-amaranth-lighter)` | Danger active/pressed state |
| `--bh-color-danger-text` | `var(--bh-color-white)` | `var(--bh-color-cod)` | Text on danger background |

#### Borders

| Token | Light | Dark | Description |
|-------|-------|------|-------------|
| `--bh-color-border` | `var(--bh-color-linen)` | `var(--bh-color-tundora)` | Default border color |
| `--bh-color-border-muted` | `var(--bh-color-bone)` | `var(--bh-color-soot)` | Subtle border |
| `--bh-color-border-bright` | `var(--bh-color-fossil)` | `var(--bh-color-boulder)` | Emphasized border |
| `--bh-color-ring` | `var(--bh-color-mandarin)` | `var(--bh-color-mandarin)` | Focus ring color |

#### Links

| Token | Light | Dark | Description |
|-------|-------|------|-------------|
| `--bh-color-link` | `var(--bh-color-sky)` | `var(--bh-color-sky)` | Default link color |
| `--bh-color-link-hover` | `var(--bh-color-mandarin)` | `var(--bh-color-mandarin)` | Link hover color |
| `--bh-color-link-subtle` | `var(--bh-color-boulder)` | `var(--bh-color-swiss-coffee)` | Subdued link color |
| `--bh-color-link-subtle-hover` | `var(--bh-color-sky)` | `var(--bh-color-sky)` | Subdued link hover color |

---

## Border Radius

Defined in `src/tokens/radius.css`.

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-radius-none` | `0` | No rounding |
| `--bh-radius-sm` | `0.125rem` | 2px -- subtle rounding |
| `--bh-radius-md` | `0.375rem` | 6px -- default rounding |
| `--bh-radius-lg` | `0.5rem` | 8px -- pronounced rounding |
| `--bh-radius-xl` | `0.75rem` | 12px -- large rounding |
| `--bh-radius-2xl` | `1rem` | 16px -- extra-large rounding |
| `--bh-radius-full` | `9999px` | Fully round (pill / circle) |

---

## Shadows

### Primitive Shadows

Defined in `src/tokens/shadows.css`.

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-shadow-none` | `none` | No shadow |
| `--bh-shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle shadow |
| `--bh-shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Medium shadow |
| `--bh-shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Large shadow |
| `--bh-shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Extra-large shadow |

### Semantic Shadows

Defined in `src/themes/default.css`. These adapt to the current theme.

| Token | Light | Dark | Description |
|-------|-------|------|-------------|
| `--bh-shadow-surface` | `var(--bh-shadow-sm)` | `var(--bh-shadow-md)` | Default surface shadow |
| `--bh-shadow-inset` | `inset 0 1px 3px rgba(0, 0, 0, 0.08)` | `inset 0 1px 3px rgba(0, 0, 0, 0.25)` | Inset / pressed shadow |
| `--bh-shadow-raised` | `0 1px 0 rgba(255, 255, 255, 0.6), 0 2px 6px rgba(0, 0, 0, 0.06)` | `0 1px 0 rgba(255, 255, 255, 0.04), 0 2px 6px rgba(0, 0, 0, 0.2)` | Raised element shadow |
| `--bh-shadow-emboss` | `inset 0 -1px 0 rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(0, 0, 0, 0.06)` | `inset 0 -1px 0 rgba(255, 255, 255, 0.04), inset 0 1px 0 rgba(0, 0, 0, 0.2)` | Embossed / 3D effect |

---

## Borders

Defined in `src/tokens/borders.css`.

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-border-0` | `0px` | No border |
| `--bh-border-1` | `1px` | Default border width |
| `--bh-border-2` | `2px` | Medium border width |
| `--bh-border-4` | `4px` | Thick border width |

---

## Z-Index

Defined in `src/tokens/z-index.css`.

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-z-base` | `0` | Default stacking level |
| `--bh-z-dropdown` | `100` | Dropdown menus |
| `--bh-z-sticky` | `200` | Sticky headers / elements |
| `--bh-z-fixed` | `300` | Fixed position elements |
| `--bh-z-overlay` | `400` | Overlay / backdrop |
| `--bh-z-modal` | `500` | Modal dialogs |
| `--bh-z-popover` | `600` | Popovers |
| `--bh-z-tooltip` | `700` | Tooltips (highest layer) |

---

## Animation and Transitions

Defined in `src/tokens/animation.css`.

### Durations

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-duration-fast` | `100ms` | Quick interactions (hover, focus) |
| `--bh-duration-normal` | `200ms` | Standard transitions |
| `--bh-duration-slow` | `400ms` | Deliberate animations (expand, collapse) |

### Easing

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard ease -- smooth deceleration |
| `--bh-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Ease in -- accelerating |
| `--bh-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Ease out -- decelerating |
| `--bh-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Ease in-out -- symmetric |

### Backdrop Blur

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-blur-sm` | `8px` | Subtle backdrop blur |
| `--bh-blur-md` | `20px` | Pronounced backdrop blur |

### Composite Transitions

| Token | Value | Description |
|-------|-------|-------------|
| `--bh-transition-fast` | `var(--bh-duration-fast) var(--bh-ease-default)` | Fast transition shorthand (100ms) |
| `--bh-transition-normal` | `var(--bh-duration-normal) var(--bh-ease-default)` | Normal transition shorthand (200ms) |
| `--bh-transition-slow` | `var(--bh-duration-slow) var(--bh-ease-default)` | Slow transition shorthand (400ms) |
