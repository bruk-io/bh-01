# Component Reference

Full API reference for all bh-01 components. Each entry lists:
- **Properties** — reactive attributes and their types, defaults, and reflected attribute names
- **Events** — custom events dispatched by the component and their `detail` types
- **Slots** — named and default slots for projected content
- **CSS Parts** — shadowDOM parts exposed for external styling via `::part()`
- **CSS Custom Properties** — component-level token overrides

Sections with no entries are omitted.

---

# Atoms

## bh-avatar

A user/entity avatar with image, initials fallback, and generic icon fallback.

**Tag:** `<bh-avatar>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | `size` |
| src | `string` | `''` | `src` |
| alt | `string` | `''` | `alt` |
| initials | `string` | `''` | `initials` |

**CSS Parts**

| Part | Element |
|------|---------|
| `image` | The `<img>` element (when src is used) |
| `initials` | The initials text container |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-avatar-size` | -- | Avatar width and height (overrides size prop) |
| `--bh-avatar-bg` | `var(--bh-color-secondary)` | Background color for initials/fallback |
| `--bh-avatar-color` | `var(--bh-color-secondary-text)` | Text/icon color |

## bh-badge

A pill-shaped badge for status indicators and counts.

**Tag:** `<bh-badge>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| variant | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | `variant` |
| size | `'sm' \| 'md'` | `'md'` | `size` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Badge content (text or number) |

**CSS Parts**

| Part | Element |
|------|---------|
| `badge` | The inner `<span>` element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-badge-bg` | -- | Badge background color |
| `--bh-badge-color` | -- | Badge text color |

## bh-button

A button component with multiple variants and sizes.

**Tag:** `<bh-button>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| variant | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | `variant` |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | `size` |
| disabled | `boolean` | `false` | `disabled` |
| iconOnly | `boolean` | `false` | `icon-only` |
| label | `string` | `''` | `label` |
| type | `'button' \| 'submit' \| 'reset'` | `'button'` | `type` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-click` | `{ originalEvent: MouseEvent }` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Button label text |
| `prefix` | Content before the label (e.g. `<bh-icon>`) |
| `suffix` | Content after the label (e.g. `<bh-icon>`) |

**CSS Parts**

| Part | Element |
|------|---------|
| `button` | The native `<button>` element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-button-bg` | -- | Button background color |
| `--bh-button-color` | -- | Button text color |
| `--bh-button-border` | `transparent` | Button border color |
| `--bh-button-radius` | `var(--bh-radius-md)` | Button border radius |

## bh-checkbox

A checkbox input for boolean or multi-select choices.

**Tag:** `<bh-checkbox>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| checked | `boolean` | `false` | `checked` |
| indeterminate | `boolean` | `false` | `indeterminate` |
| disabled | `boolean` | `false` | `disabled` |
| value | `string` | `''` | `value` |
| name | `string` | `''` | `name` |
| label | `string` | `''` | `label` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-change` | `{ checked: boolean }` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Label text displayed next to the checkbox |

**CSS Parts**

| Part | Element |
|------|---------|
| `checkbox` | The visual checkbox indicator |
| `label` | The label text container |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-checkbox-size` | `1.25rem` | Checkbox width and height |
| `--bh-checkbox-radius` | `var(--bh-radius-sm)` | Checkbox border radius |

## bh-divider

An industrial horizontal (or vertical) rule with an embossed 3D look.

**Tag:** `<bh-divider>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| vertical | `boolean` | `false` | `vertical` |
| spacing | `'sm' \| 'md' \| 'lg'` | `'md'` | `spacing` |
| gradient | `boolean` | `false` | `gradient` |

**CSS Parts**

| Part | Element |
|------|---------|
| `divider` | The rule element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-divider-color` | -- | Divider line color |
| `--bh-divider-shadow` | -- | Divider shadow (defaults to emboss) |
| `--bh-divider-gradient` | -- | Custom gradient value when `gradient` attribute is set |

## bh-icon

An SVG icon component with a static registry for custom icons.

**Tag:** `<bh-icon>`

Register custom icons via `BhIcon.register(name, svgPaths)`.
Ships with built-in icons: x, check, plus, minus, search, chevron-down, chevron-up, chevron-left, chevron-right, menu.

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| name | `string` | `''` | `name` |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | `size` |
| label | `string` | `''` | `label` |

**CSS Parts**

| Part | Element |
|------|---------|
| `svg` | The `<svg>` element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-icon-size` | `1.25em` | Icon width and height |

## bh-input

A text input component with support for inset prefix/suffix content.

**Tag:** `<bh-input>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | `size` |
| type | `string` | `'text'` | `type` |
| value | `string` | `''` | `value` |
| placeholder | `string` | `''` | `placeholder` |
| name | `string` | `''` | `name` |
| label | `string` | `''` | `label` |
| disabled | `boolean` | `false` | `disabled` |
| readonly | `boolean` | `false` | `readonly` |
| required | `boolean` | `false` | `required` |
| error | `boolean` | `false` | `error` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-input` | `{ value: string }` |
| `bh-change` | `{ value: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| `prefix` | Content inside the input, before the text (e.g. `<bh-icon name="search">`) |
| `suffix` | Content inside the input, after the text (e.g. `<bh-icon name="x">`) |

**CSS Parts**

| Part | Element |
|------|---------|
| `wrapper` | The outer container with border and background |
| `input` | The native `<input>` element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-input-bg` | `var(--bh-color-surface-raised)` | Input background |
| `--bh-input-color` | `var(--bh-color-text)` | Input text color |
| `--bh-input-border` | `var(--bh-color-border)` | Input border color |
| `--bh-input-radius` | `var(--bh-radius-md)` | Input border radius |

## bh-led

A status LED indicator with optional pulse animation.

**Tag:** `<bh-led>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| color | `'success' \| 'warning' \| 'danger' \| 'primary'` | `'success'` | `color` |
| pulse | `boolean` | `false` | `pulse` |
| size | `'sm' \| 'md'` | `'md'` | `size` |
| label | `string` | `''` | `label` |

**CSS Parts**

| Part | Element |
|------|---------|
| `led` | The LED `<span>` element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-led-color` | -- | LED fill color |
| `--bh-led-size` | -- | LED diameter |
| `--bh-led-glow` | -- | LED glow box-shadow color |

## bh-link

A styled anchor element with variant support and optional external indicator.

**Tag:** `<bh-link>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| href | `string` | `''` | `href` |
| target | `string` | `''` | `target` |
| variant | `'default' \| 'muted' \| 'accent'` | `'default'` | `variant` |
| external | `boolean` | `false` | `external` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-click` | `{ originalEvent: MouseEvent }` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Link text content |

**CSS Parts**

| Part | Element |
|------|---------|
| `link` | The `<a>` element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-link-color` | `var(--bh-color-link)` | Link text color |

## bh-pixel-display

An M x N grid of square pixels with on/off glow, used for LED-style displays.

**Tag:** `<bh-pixel-display>`

The `data` property is a flat row-major `Uint8Array` of length `cols * rows`.
Each byte is a palette index: 0 = off, 1 = primary, 2 = success, 3 = warning, 4 = danger.

Lit only triggers updates on reference change, not mutation. Assign a new `Uint8Array` each time data changes.

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| cols | `number` | `20` | `cols` |
| rows | `number` | `5` | `rows` |
| data | `Uint8Array \| undefined` | `undefined` | -- |
| label | `string` | `''` | `label` |

**CSS Parts**

| Part | Element |
|------|---------|
| `grid` | The CSS Grid container |
| `pixel` | Each individual pixel div |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-pixel-size` | `4px` | Pixel width and height |
| `--bh-pixel-gap` | `1px` | Gap between pixels |
| `--bh-pixel-off` | `var(--bh-color-surface-recessed)` | Off-state pixel color |
| `--bh-pixel-radius` | `1px` | Pixel border-radius |
| `--bh-pixel-glow` | `4px` | Glow spread on lit pixels |

## bh-progress

A linear progress bar for loading states and completion tracking.

**Tag:** `<bh-progress>`

Set `indeterminate` for unknown duration, or `value` for determinate progress.

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| value | `number` | `0` | `value` |
| max | `number` | `100` | `max` |
| indeterminate | `boolean` | `false` | `indeterminate` |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | `size` |
| variant | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | `variant` |
| label | `string` | `'Progress'` | `label` |

**CSS Parts**

| Part | Element |
|------|---------|
| `track` | The background track |
| `bar` | The filled progress bar |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-progress-color` | `var(--bh-color-primary)` | Bar fill color |
| `--bh-progress-track` | `var(--bh-color-secondary)` | Track background color |

## bh-radio

A radio input for single-selection from a group.

**Tag:** `<bh-radio>`

Group radios by giving them the same `name` attribute.

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| checked | `boolean` | `false` | `checked` |
| disabled | `boolean` | `false` | `disabled` |
| value | `string` | `''` | `value` |
| name | `string` | `''` | `name` |
| label | `string` | `''` | `label` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-change` | `{ checked: boolean, value: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Label text displayed next to the radio |

**CSS Parts**

| Part | Element |
|------|---------|
| `radio` | The visual radio indicator |
| `label` | The label text container |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-radio-size` | `1.25rem` | Radio width and height |

## bh-select

A styled native select dropdown with full accessibility and mobile support.

**Tag:** `<bh-select>`

Pass options via the `options` property (array of `{ value, label }` objects).
For grouped options, use `optionGroups`.

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | `size` |
| value | `string` | `''` | `value` |
| name | `string` | `''` | `name` |
| label | `string` | `''` | `label` |
| placeholder | `string` | `''` | `placeholder` |
| options | `SelectOption[]` | `[]` | -- |
| optionGroups | `SelectOptionGroup[]` | `[]` | `option-groups` |
| disabled | `boolean` | `false` | `disabled` |
| required | `boolean` | `false` | `required` |
| error | `boolean` | `false` | `error` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-change` | `{ value: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| `prefix` | Content before the select (e.g. icon) |

**CSS Parts**

| Part | Element |
|------|---------|
| `wrapper` | The outer container with border and background |
| `select` | The native `<select>` element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-select-bg` | `var(--bh-color-surface-raised)` | Select background |
| `--bh-select-color` | `var(--bh-color-text)` | Select text color |
| `--bh-select-border` | `var(--bh-color-border)` | Select border color |
| `--bh-select-radius` | `var(--bh-radius-md)` | Select border radius |

## bh-skeleton

A content placeholder that shows a pulsing animation during loading.

**Tag:** `<bh-skeleton>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| variant | `'text' \| 'circle' \| 'rect'` | `'text'` | `variant` |
| width | `string` | `''` | `width` |
| height | `string` | `''` | `height` |

**CSS Parts**

| Part | Element |
|------|---------|
| `skeleton` | The skeleton element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-skeleton-color` | `var(--bh-color-secondary)` | Skeleton base color |
| `--bh-skeleton-highlight` | -- | Pulse highlight color |

## bh-slider

A range slider input component.

**Tag:** `<bh-slider>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| min | `number` | `0` | `min` |
| max | `number` | `100` | `max` |
| step | `number` | `1` | `step` |
| value | `number` | `0` | `value` |
| disabled | `boolean` | `false` | `disabled` |
| showValue | `boolean` | `false` | `show-value` |
| label | `string` | `''` | `label` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-input` | `{ value: number }` |
| `bh-change` | `{ value: number }` |

**CSS Parts**

| Part | Element |
|------|---------|
| `track` | The native range input element |
| `value` | The value display span |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-slider-thumb-size` | `14px` | Thumb diameter |
| `--bh-slider-thumb-color` | `var(--bh-color-primary)` | Thumb color |
| `--bh-slider-track-height` | `4px` | Track height |
| `--bh-slider-track-color` | `var(--bh-color-surface-raised)` | Track background |

## bh-spinner

A CSS-animated loading spinner. Inherits color from its parent.

**Tag:** `<bh-spinner>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | `size` |
| label | `string` | `'Loading'` | `label` |

**CSS Parts**

| Part | Element |
|------|---------|
| `spinner` | The `<svg>` element |

## bh-switch

A toggle switch for binary on/off settings. Unlike checkbox, a switch implies an immediate effect rather than a form submission.

**Tag:** `<bh-switch>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| checked | `boolean` | `false` | `checked` |
| disabled | `boolean` | `false` | `disabled` |
| label | `string` | `''` | `label` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-change` | `{ checked: boolean }` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Label text displayed next to the switch |

**CSS Parts**

| Part | Element |
|------|---------|
| `track` | The switch track/rail |
| `thumb` | The sliding thumb indicator |
| `label` | The label text container |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-switch-width` | `2.5rem` | Switch track width |
| `--bh-switch-height` | `1.5rem` | Switch track height |

## bh-text

A text component for consistent typography across variants.

**Tag:** `<bh-text>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| variant | `'body' \| 'heading' \| 'small' \| 'code'` | `'body'` | `variant` |
| truncate | `boolean` | `false` | `truncate` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Text content |

**CSS Parts**

| Part | Element |
|------|---------|
| `text` | The inner `<span>` element |

## bh-textarea

A multi-line text input for longer-form content like comments, descriptions, and messages.

**Tag:** `<bh-textarea>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | `size` |
| value | `string` | `''` | `value` |
| placeholder | `string` | `''` | `placeholder` |
| name | `string` | `''` | `name` |
| label | `string` | `''` | `label` |
| rows | `number` | `3` | `rows` |
| resize | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | `resize` |
| disabled | `boolean` | `false` | `disabled` |
| readonly | `boolean` | `false` | `readonly` |
| required | `boolean` | `false` | `required` |
| error | `boolean` | `false` | `error` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-input` | `{ value: string }` |
| `bh-change` | `{ value: string }` |

**CSS Parts**

| Part | Element |
|------|---------|
| `wrapper` | The outer container with border and background |
| `textarea` | The native `<textarea>` element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-textarea-bg` | `var(--bh-color-surface-raised)` | Textarea background |
| `--bh-textarea-color` | `var(--bh-color-text)` | Textarea text color |
| `--bh-textarea-border` | `var(--bh-color-border)` | Textarea border color |
| `--bh-textarea-radius` | `var(--bh-radius-md)` | Textarea border radius |

## bh-tooltip

A tooltip that shows contextual text on hover/focus of its trigger content. Pure CSS positioning.

**Tag:** `<bh-tooltip>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| content | `string` | `''` | `content` |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | `placement` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | The trigger element that activates the tooltip |

**CSS Parts**

| Part | Element |
|------|---------|
| `tooltip` | The tooltip popup element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-tooltip-bg` | `var(--bh-color-cod)` | Tooltip background |
| `--bh-tooltip-color` | `var(--bh-color-white)` | Tooltip text color |

# Molecules

## bh-accordion

A wrapper for collapsible accordion items. Set `multiple` to allow more than one item open at a time.

**Tag:** `<bh-accordion>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| multiple | `boolean` | `false` | `multiple` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | `bh-accordion-item` elements |

## bh-accordion-item

A single collapsible section within a `bh-accordion`.

**Tag:** `<bh-accordion-item>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| label | `string` | `''` | `label` |
| open | `boolean` | `false` | `open` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-toggle` | `{ open: boolean, label: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| `header` | Custom header content (replaces default label text) |
| (default) | Content revealed when open |

**CSS Parts**

| Part | Element |
|------|---------|
| `header` | The clickable header row |
| `content` | The collapsible content wrapper |
| `chevron` | The chevron indicator |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-accordion-border` | `var(--bh-color-border)` | Border color |

## bh-card

An elevated surface container with optional header and footer.

**Tag:** `<bh-card>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| variant | `'default' \| 'outlined' \| 'flat'` | `'default'` | `variant` |
| padding | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | `padding` |
| cornerAccents | `boolean` | `false` | `corner-accents` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Card body content |
| `header` | Content rendered in the start (left) of the card header |
| `header-actions` | Content rendered in the end (right) of the card header |
| `footer` | Content rendered in the card footer area |

**CSS Parts**

| Part | Element |
|------|---------|
| `card` | The outer card container |
| `header` | The header wrapper (only rendered when header or header-actions has content) |
| `body` | The body wrapper |
| `footer` | The footer wrapper (only rendered when slot has content) |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-card-bg` | `var(--bh-color-surface-raised)` | Card background color |
| `--bh-card-border` | `var(--bh-color-border)` | Card border color |
| `--bh-card-radius` | `var(--bh-radius-lg)` | Card border radius |
| `--bh-card-shadow` | `var(--bh-shadow-md)` | Card box shadow |
| `--bh-card-accent-color` | `var(--bh-color-border)` | Corner accent color |
| `--bh-card-accent-hover-color` | `var(--bh-color-primary)` | Corner accent hover color |
| `--bh-card-accent-glow` | `var(--bh-color-primary-glow)` | Corner accent glow color on hover |

## bh-chip

An interactive tag with optional dismiss button.

**Tag:** `<bh-chip>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| variant | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | `variant` |
| size | `'sm' \| 'md'` | `'md'` | `size` |
| dismissible | `boolean` | `false` | `dismissible` |
| selected | `boolean` | `false` | `selected` |
| disabled | `boolean` | `false` | `disabled` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-click` | `{ originalEvent: MouseEvent }` |
| `bh-dismiss` | `{}` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Chip label text |
| `prefix` | Content before the label (e.g. icon) |

**CSS Parts**

| Part | Element |
|------|---------|
| `chip` | The outer `<button>` element |
| `dismiss` | The dismiss/remove button |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-chip-bg` | -- | Chip background color |
| `--bh-chip-color` | -- | Chip text color |
| `--bh-chip-radius` | `var(--bh-radius-full)` | Chip border radius |

## bh-form-field

Wraps any form atom with a label, help text, and error message. Handles ARIA linking across Shadow DOM boundaries.

**Tag:** `<bh-form-field>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| label | `string` | `''` | `label` |
| helpText | `string` | `''` | `help-text` |
| error | `string` | `''` | `error` |
| required | `boolean` | `false` | `required` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | The form control (e.g. `<bh-input>`, `<bh-select>`) |

**CSS Parts**

| Part | Element |
|------|---------|
| `field` | The outer wrapper |
| `label` | The label element |
| `help-text` | The help text element |
| `error` | The error message element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-form-field-gap` | `var(--bh-spacing-1-5)` | Gap between label, control, and messages |
| `--bh-form-field-label-color` | `var(--bh-color-text)` | Label text color |
| `--bh-form-field-error-color` | `var(--bh-color-danger)` | Error text color |

## bh-nav-item

A navigation item for sidebars and navbars with icon + label + optional badge. Renders as `<a>` when `href` is provided, `<button>` otherwise.

**Tag:** `<bh-nav-item>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| active | `boolean` | `false` | `active` |
| disabled | `boolean` | `false` | `disabled` |
| href | `string` | `''` | `href` |
| target | `string` | `''` | `target` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-click` | `{ originalEvent: MouseEvent }` |

**Slots**

| Slot | Description |
|------|-------------|
| `prefix` | Icon slot (before label) |
| (default) | Label text |
| `suffix` | Badge or indicator slot (after label) |

**CSS Parts**

| Part | Element |
|------|---------|
| `item` | The inner `<a>` or `<button>` element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-nav-item-bg` | `transparent` | Item background color |
| `--bh-nav-item-color` | `var(--bh-color-text)` | Item text color |
| `--bh-nav-item-hover-bg` | `var(--bh-color-secondary)` | Hover background |
| `--bh-nav-item-active-bg` | `var(--bh-color-secondary)` | Active background |
| `--bh-nav-item-active-color` | `var(--bh-color-primary)` | Active text color |

## bh-panel-header

A small uppercase section header for sidebar panels.

**Tag:** `<bh-panel-header>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| label | `string` | `''` | `label` |

**Slots**

| Slot | Description |
|------|-------------|
| `end` | Actions rendered at the end of the header |

**CSS Parts**

| Part | Element |
|------|---------|
| `header` | The header container |
| `label` | The label text |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-panel-header-height` | `36px` | Header height |
| `--bh-panel-header-text` | `var(--bh-color-text-muted)` | Label color |

## bh-pixel-panel

Panel chrome that wraps a pixel display with header (label + value) and footer.

**Tag:** `<bh-pixel-panel>`

Dual mode:
- **Slot mode** (default): Set `cols` and `rows` to 0. Slot a `<bh-pixel-display>` yourself.
- **Managed mode**: Set `cols` and `rows` > 0. The panel renders its own display, handles buffering, grid generation, and visual transitions.

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| label | `string` | `''` | `label` |
| value | `string` | `''` | `value` |
| footerStart | `string` | `''` | `footer-start` |
| footerEnd | `string` | `''` | `footer-end` |
| cols | `number` | `0` | `cols` |
| rows | `number` | `0` | `rows` |
| type | `PixelDataType` | `'sparkline'` | `type` |
| transition | `PixelTransition` | `'step'` | `transition` |
| fps | `number` | `12` | `fps` |
| color | `number` | `1` | `color` |
| bufferSize | `number` | `0` | `buffer-size` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Display area (slot mode only; hidden in managed mode) |
| `label` | Custom label content (overrides `label` prop) |
| `value` | Custom value content (overrides `value` prop) |
| `footer-start` | Custom footer-start content (overrides `footerStart` prop) |
| `footer-end` | Custom footer-end content (overrides `footerEnd` prop) |

**CSS Parts**

| Part | Element |
|------|---------|
| `panel` | The outer panel container |
| `header` | The header row |
| `label` | The label text |
| `value` | The value text |
| `body` | The display area wrapper |
| `footer` | The footer row |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-pixel-panel-bg` | `var(--bh-color-surface)` | Panel background |
| `--bh-pixel-panel-border` | `var(--bh-color-border)` | Panel border color |
| `--bh-pixel-panel-radius` | `var(--bh-radius-lg)` | Panel border-radius |

## bh-section-header

A section title with optional count badge and horizontal rule filling remaining space.

**Tag:** `<bh-section-header>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| heading | `string` | `''` | `heading` |
| count | `number \| undefined` | `undefined` | `count` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Custom title content (overrides `heading` prop) |
| `badge` | Custom badge content (overrides count display) |
| `end` | Trailing content after the line |

**CSS Parts**

| Part | Element |
|------|---------|
| `header` | The outer flex container |
| `title` | The title text |
| `badge` | The badge wrapper |
| `line` | The horizontal rule |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-section-header-color` | `var(--bh-color-text-muted)` | Title text color |
| `--bh-section-header-size` | `var(--bh-text-xs)` | Title font size |
| `--bh-section-header-tracking` | `var(--bh-tracking-widest)` | Title letter-spacing |
| `--bh-section-header-line-color` | `var(--bh-color-border-muted)` | Line color |

## bh-table

A data-driven table that renders columns and rows from properties.

**Tag:** `<bh-table>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| variant | `'default' \| 'striped' \| 'bordered'` | `'default'` | `variant` |
| density | `'compact' \| 'default' \| 'comfortable'` | `'default'` | `density` |
| stickyHeader | `boolean` | `false` | `sticky-header` |
| columns | `TableColumn[]` | `[]` | -- |
| rows | `Record<string, unknown>[]` | `[]` | -- |

**CSS Parts**

| Part | Element |
|------|---------|
| `table` | The `<table>` element |
| `thead` | The `<thead>` element |
| `tbody` | The `<tbody>` element |
| `th` | A header cell |
| `td` | A body cell |
| `row` | A body `<tr>` row |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-table-bg` | `var(--bh-color-surface-raised)` | Table background |
| `--bh-table-border` | `var(--bh-color-border)` | Table border color |
| `--bh-table-header-bg` | `var(--bh-color-surface)` | Header background |
| `--bh-table-stripe-bg` | `var(--bh-color-surface)` | Striped row background |
| `--bh-table-hover-bg` | `var(--bh-color-secondary)` | Row hover background |
| `--bh-table-radius` | `var(--bh-radius-lg)` | Table border radius |

## bh-toolbar

A horizontal toolbar with start, center, and end slots.

**Tag:** `<bh-toolbar>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| gap | `'xs' \| 'sm' \| 'md'` | `'sm'` | `gap` |
| variant | `'default' \| 'surface'` | `'default'` | `variant` |
| sticky | `boolean` | `false` | `sticky` |

**Slots**

| Slot | Description |
|------|-------------|
| `start` | Content aligned to the start (left) |
| (default) | Default slot, placed in center |
| `end` | Content aligned to the end (right) |

**CSS Parts**

| Part | Element |
|------|---------|
| `toolbar` | The toolbar container |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-toolbar-bg` | `transparent` | Toolbar background |
| `--bh-toolbar-border` | `var(--bh-color-border)` | Bottom border color when sticky |
# Organisms

## bh-activity-bar

A vertical activity bar with icon items, similar to VS Code.

**Tag:** `<bh-activity-bar>`

**Events**

| Event | Detail |
|-------|--------|
| `bh-activity-change` | `{ id: string, label: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Activity items (`<bh-activity-item>`) |

**CSS Parts**

| Part | Element |
|------|---------|
| `container` | The items container |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-activity-bar-width` | `48px` | Bar width |
| `--bh-activity-bar-bg` | `var(--bh-color-surface-recessed)` | Background color |
| `--bh-activity-bar-border` | `var(--bh-color-border)` | Right border color |

---

## bh-activity-item

An individual item in the activity bar.

**Tag:** `<bh-activity-item>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| active | `boolean` | `false` | `active` |
| label | `string` | `''` | `label` |
| itemId | `string` | `''` | `item-id` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-activity-item-click` | `{ id: string, label: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Icon content (e.g. `<bh-icon>`) |

**CSS Parts**

| Part | Element |
|------|---------|
| `button` | The native `<button>` element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-activity-item-size` | `40px` | Item width and height |
| `--bh-activity-item-active-border` | `var(--bh-color-primary)` | Active indicator color |

---

## bh-app-shell

A CSS Grid application shell with named areas: activity, sidebar, main, status.

**Tag:** `<bh-app-shell>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| sidebarOpen | `boolean` | `false` | `sidebar-open` |

**Slots**

| Slot | Description |
|------|-------------|
| `activity` | The activity bar area (left icon strip) |
| `sidebar` | The sidebar area (collapsible panel) |
| (default) | The main content area |
| `status` | The status bar area (bottom strip) |

**CSS Parts**

| Part | Element |
|------|---------|
| `grid` | The grid container |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-shell-activity-width` | `48px` | Activity bar column width |
| `--bh-shell-sidebar-width` | `0px` | Sidebar column width (0 when collapsed) |
| `--bh-shell-status-height` | `24px` | Status bar row height |
| `--bh-shell-bg` | `var(--bh-color-bg)` | Shell background color |

---

## bh-command-palette

A VSCode-style command palette overlay.

**Tag:** `<bh-command-palette>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| open | `boolean` | `false` | `open` |
| placeholder | `string` | `'Type a command...'` | `placeholder` |
| items | `CommandPaletteItem[]` | `[]` | `items` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-execute` | `{ id: string, label: string }` |
| `bh-open` | — |
| `bh-close` | — |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-command-palette-width` | `min(500px, 90vw)` | Palette width |
| `--bh-command-palette-max-height` | `300px` | Max height for results list |
| `--bh-command-palette-backdrop` | `var(--bh-color-overlay, rgba(0,0,0,0.4))` | Backdrop color |

---

## bh-context-menu

A right-click context menu overlay.

**Tag:** `<bh-context-menu>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| open | `boolean` | `false` | `open` |
| x | `number` | `0` | `x` |
| y | `number` | `0` | `y` |
| items | `ContextMenuItem[]` | `[]` | `items` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-select` | `{ id: string, label: string }` |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-context-menu-min-width` | `160px` | Minimum menu width |

---

## bh-data-table

An interactive data table with sorting support. Extends `bh-table`.

**Tag:** `<bh-data-table>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| columns | `DataTableColumn[]` | `[]` | `columns` |
| rows | `Record<string, unknown>[]` | `[]` | `rows` |
| variant | `'default' \| 'striped' \| 'bordered'` | `'default'` | `variant` |
| density | `'default' \| 'compact' \| 'spacious'` | `'default'` | `density` |
| stickyHeader | `boolean` | `false` | `sticky-header` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-sort` | `{ column: string, direction: SortDirection }` |

**CSS Parts**

| Part | Element |
|------|---------|
| `table` | The `<table>` element |
| `thead` | The `<thead>` element |
| `tbody` | The `<tbody>` element |
| `th` | A header cell |
| `td` | A body cell |
| `row` | A body `<tr>` row |
| `sort-button` | A sortable header button |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-table-bg` | `var(--bh-color-surface-raised)` | Table background |
| `--bh-table-border` | `var(--bh-color-border)` | Table border color |
| `--bh-table-header-bg` | `var(--bh-color-surface)` | Header background |
| `--bh-table-stripe-bg` | `var(--bh-color-surface)` | Striped row background |
| `--bh-table-hover-bg` | `var(--bh-color-secondary)` | Row hover background |
| `--bh-table-radius` | `var(--bh-radius-lg)` | Table border radius |

---

## bh-sidebar-panel

A collapsible side panel with header and body slots.

**Tag:** `<bh-sidebar-panel>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| collapsed | `boolean` | `false` | `collapsed` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-sidebar-collapse` | `{ collapsed: boolean }` |

**Slots**

| Slot | Description |
|------|-------------|
| `header` | Panel header content (36px tall) |
| (default) | Panel body content (overflow auto) |

**CSS Parts**

| Part | Element |
|------|---------|
| `header` | The header wrapper |
| `body` | The scrollable body wrapper |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-sidebar-panel-width` | `250px` | Panel width |
| `--bh-sidebar-panel-bg` | `var(--bh-color-surface)` | Panel background |
| `--bh-sidebar-panel-border` | `var(--bh-color-border)` | Panel border color |

---

## bh-status-bar

A fixed-height status bar with left/right slots.

**Tag:** `<bh-status-bar>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| message | `string` | `''` | `message` |
| error | `boolean` | `false` | `error` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Left-aligned status content |
| `end` | Right-aligned status content |

**CSS Parts**

| Part | Element |
|------|---------|
| `bar` | The status bar container |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-status-bar-bg` | `var(--bh-color-surface)` | Bar background |
| `--bh-status-bar-border` | `var(--bh-color-border)` | Bar border color |
| `--bh-status-bar-text` | `var(--bh-color-text-muted)` | Text color |
| `--bh-status-bar-error-text` | `var(--bh-color-danger)` | Error text color |

---

## bh-tab

Individual tab item for use inside bh-tab-bar.

**Tag:** `<bh-tab>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| tabId | `string` | `''` | `tab-id` |
| label | `string` | `''` | `label` |
| active | `boolean` | `false` | `active` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-tab-click` | `{ tabId: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Tab label content |

**CSS Parts**

| Part | Element |
|------|---------|
| `button` | The inner button element |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-tab-color` | `var(--bh-color-text-muted)` | Default text color |
| `--bh-tab-active-color` | `var(--bh-color-text)` | Active text color |
| `--bh-tab-active-border` | `var(--bh-color-primary)` | Active bottom border color |

---

## bh-tab-bar

Horizontal tab bar that holds bh-tab items.

**Tag:** `<bh-tab-bar>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| active | `string` | `''` | `active` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-tab-change` | `{ tabId: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Tab items (bh-tab elements) |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-tab-bar-height` | `36px` | Bar height |
| `--bh-tab-bar-bg` | `transparent` | Background color |
| `--bh-tab-bar-border` | `var(--bh-color-border)` | Bottom border color |

---

## bh-tab-panel

Content panel associated with a tab. Hidden when not active.

**Tag:** `<bh-tab-panel>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| tabId | `string` | `''` | `tab-id` |
| active | `boolean` | `false` | `active` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Panel content |

---

## bh-tabs

Orchestrator that wires a bh-tab-bar to bh-tab-panel children.

**Tag:** `<bh-tabs>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| active | `string` | `''` | `active` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-tab-change` | `{ tabId: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| `tab-bar` | Slot for the bh-tab-bar element |
| (default) | Default slot for bh-tab-panel elements |

---

## bh-tree

A tree container that manages selection across nested bh-tree-items.

**Tag:** `<bh-tree>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| selected | `string` | `''` | `selected` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-select` | `{ value: string, label: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Tree items (bh-tree-item elements) |

---

## bh-tree-item

An individual tree node that supports nesting, expand/collapse, and selection.

**Tag:** `<bh-tree-item>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| value | `string` | `''` | `value` |
| label | `string` | `''` | `label` |
| selected | `boolean` | `false` | `selected` |
| expanded | `boolean` | `false` | `expanded` |
| indent | `number` | `0` | `indent` |

**Events**

| Event | Detail |
|-------|--------|
| `bh-tree-item-click` | `{ value: string, label: string }` |

**Slots**

| Slot | Description |
|------|-------------|
| `icon` | Icon slot (before label) |
| `end` | Trailing content slot (badges, actions) |
| `children` | Nested tree items |

**CSS Parts**

| Part | Element |
|------|---------|
| `row` | The clickable row element |
| `chevron` | The expand/collapse chevron |
| `label` | The label text |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-tree-item-hover-bg` | `var(--bh-color-secondary)` | Hover background |
| `--bh-tree-item-selected-bg` | `var(--bh-color-surface-raised)` | Selected background |
| `--bh-tree-item-selected-color` | `var(--bh-color-primary)` | Selected text color |

---

# Layout

## bh-center

Center content with optional max-width.

Centers slotted children horizontally with configurable max-width, gutters, and intrinsic sizing. Purely structural.

**Tag:** `<bh-center>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| max | `string` | `'none'` | `max` |
| gutters | `LayoutGap` | `'none'` | `gutters` |
| intrinsic | `boolean` | `false` | `intrinsic` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Default slot for content |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-center-max` | `none` | Override max-inline-size value |
| `--bh-center-gutters` | `0` | Override padding-inline value |

---

## bh-cluster

Horizontal wrapping flow layout primitive.

Arranges slotted children in a row with configurable gap, alignment, and justification. Wraps by default. Purely structural.

**Tag:** `<bh-cluster>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| gap | `LayoutGap` | `'md'` | `gap` |
| justify | `LayoutJustify` | `'start'` | `justify` |
| align | `LayoutAlign` | `'center'` | `align` |
| nowrap | `boolean` | `false` | `nowrap` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Default slot for content |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-cluster-gap` | — | Override gap value |

---

## bh-cover

Vertical layout with expanding center.

Places content in top, center, and bottom slots. The center slot expands to fill remaining space within the minimum height.

**Tag:** `<bh-cover>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| gap | `LayoutGap` | `'md'` | `gap` |
| minHeight | `string` | `'100vh'` | `min-height` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Default slot for top content |
| `center` | Center content that expands to fill space |
| `bottom` | Bottom content |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-cover-gap` | — | Override gap value |
| `--bh-cover-min-height` | `100vh` | Override minimum height |

---

## bh-grid

Responsive auto-fit grid layout primitive.

Arranges slotted children in columns that auto-fit to the container with a configurable minimum column width and gap. Purely structural.

**Tag:** `<bh-grid>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| gap | `LayoutGap` | `'md'` | `gap` |
| min | `string` | `'250px'` | `min` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Default slot for content |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-grid-gap` | — | Override gap value |
| `--bh-grid-min` | `250px` | Override minimum column width |

---

## bh-reel

Horizontal scroll strip layout primitive.

Arranges slotted children in a horizontal scrollable row with configurable gap, item width, and optional scroll snapping. Purely structural.

**Tag:** `<bh-reel>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| gap | `LayoutGap` | `'md'` | `gap` |
| itemWidth | `string` | `'auto'` | `item-width` |
| snap | `boolean` | `false` | `snap` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Default slot for content |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-reel-gap` | — | Override gap value |
| `--bh-reel-item-width` | `auto` | Override item width |

---

## bh-repel

Push children to opposite ends.

Arranges slotted children along the main axis with space-between justification and configurable gap and alignment. Purely structural.

**Tag:** `<bh-repel>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| gap | `LayoutGap` | `'md'` | `gap` |
| align | `LayoutAlign` | `'center'` | `align` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Default slot for content |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-repel-gap` | — | Override gap value |

---

## bh-split

Explicit column ratio layout primitive.

Arranges slotted children in a grid with configurable gap and column ratios. Purely structural.

**Tag:** `<bh-split>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| gap | `LayoutGap` | `'md'` | `gap` |
| ratio | `string` | `'1/1'` | `ratio` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Default slot for content |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-split-gap` | — | Override gap value |

---

## bh-stack

Vertical flow layout primitive.

Arranges slotted children in a column with configurable gap and alignment. Purely structural.

**Tag:** `<bh-stack>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| gap | `LayoutGap` | `'md'` | `gap` |
| align | `LayoutAlign` | `'stretch'` | `align` |
| wrap | `boolean` | `false` | `wrap` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Default slot for content |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-stack-gap` | — | Override gap value |

---

## bh-switcher

Columns that collapse below a threshold.

Uses CSS Grid auto-fit to switch between multi-column and single-column layouts based on available width. Purely structural.

**Tag:** `<bh-switcher>`

**Properties**

| Property | Type | Default | Attribute |
|----------|------|---------|-----------|
| gap | `LayoutGap` | `'md'` | `gap` |
| threshold | `string` | `'30rem'` | `threshold` |
| limit | `number` | `4` | `limit` |

**Slots**

| Slot | Description |
|------|-------------|
| (default) | Default slot for content |

**CSS Custom Properties**

| Property | Default | Description |
|----------|---------|-------------|
| `--bh-switcher-gap` | — | Override gap value |
| `--bh-switcher-threshold` | `30rem` | Override threshold value |
