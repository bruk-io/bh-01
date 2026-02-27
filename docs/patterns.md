# Composition Patterns

Common patterns for assembling bh-01 components into application layouts and interactive UIs.

## Shell Layout

Use `bh-app-shell` to create a full application frame with an activity bar, collapsible sidebar, main content area, and status bar. The shell uses CSS Grid with named areas and supports sidebar toggle via the `sidebar-open` attribute.

```html
<bh-app-shell sidebar-open style="height: 100vh;">
  <!-- Activity bar: vertical icon strip on the far left -->
  <bh-activity-bar slot="activity">
    <bh-activity-item item-id="explorer" label="Explorer">
      <bh-icon name="files"></bh-icon>
    </bh-activity-item>
    <bh-activity-item item-id="search" label="Search">
      <bh-icon name="search"></bh-icon>
    </bh-activity-item>
    <bh-activity-item item-id="git" label="Source Control">
      <bh-icon name="git-branch"></bh-icon>
    </bh-activity-item>
  </bh-activity-bar>

  <!-- Sidebar: collapsible panel next to the activity bar -->
  <bh-sidebar-panel slot="sidebar">
    <span slot="header">Explorer</span>
    <div>Sidebar content here</div>
  </bh-sidebar-panel>

  <!-- Main content: default slot -->
  <div>Main application content</div>

  <!-- Status bar: bottom strip -->
  <bh-status-bar slot="status" message="Ready">
    <span slot="end">Ln 1, Col 1</span>
    <span slot="end">UTF-8</span>
  </bh-status-bar>
</bh-app-shell>
```

### Key points

- **`slot="activity"`** -- Left-most column (48px default). Place a `bh-activity-bar` here with `bh-activity-item` children.
- **`slot="sidebar"`** -- Collapsible column (250px when open, 0 when closed). Visibility is controlled by the `sidebar-open` attribute on the shell.
- **Default slot** -- The main content area fills the remaining space.
- **`slot="status"`** -- Bottom row spanning all columns (24px default). `bh-status-bar` has a default slot for left-aligned content and a `slot="end"` for right-aligned content.
- Listen for **`bh-activity-change`** on the activity bar to know which item was clicked. The event detail contains `{ id, label }`. Clicking an active item deactivates it (toggles).
- Set **`sidebar-open`** on `bh-app-shell` to expand the sidebar. Remove it to collapse. You can wire this to the activity bar's change event.
- The `bh-sidebar-panel` has a **`slot="header"`** for a title row and a default slot for body content. Set the `collapsed` attribute to animate its width to 0.

## Tab Navigation

Use `bh-tabs` as the orchestrator, `bh-tab-bar` for the tab strip, `bh-tab` for individual tabs, and `bh-tab-panel` for content panels. The `tab-id` attribute links tabs to their panels.

```html
<bh-tabs active="overview" style="height: 300px;">
  <bh-tab-bar slot="tab-bar">
    <bh-tab tab-id="overview" label="Overview"></bh-tab>
    <bh-tab tab-id="settings" label="Settings"></bh-tab>
    <bh-tab tab-id="activity" label="Activity"></bh-tab>
  </bh-tab-bar>

  <bh-tab-panel tab-id="overview">
    <div style="padding: 1rem;">Overview content</div>
  </bh-tab-panel>

  <bh-tab-panel tab-id="settings">
    <div style="padding: 1rem;">Settings content</div>
  </bh-tab-panel>

  <bh-tab-panel tab-id="activity">
    <div style="padding: 1rem;">Activity log</div>
  </bh-tab-panel>
</bh-tabs>
```

### Key points

- Set the **`active`** attribute on `bh-tabs` to the `tab-id` of the initially visible tab. The orchestrator syncs both the tab bar and panels automatically.
- **`slot="tab-bar"`** is required on `bh-tab-bar` so the orchestrator can wire up events.
- Each `bh-tab` needs a **`tab-id`** and a **`label`**. The `tab-id` must match a corresponding `bh-tab-panel`.
- Each `bh-tab-panel` is hidden by default and shown only when its `tab-id` matches the active tab.
- Listen for **`bh-tab-change`** on `bh-tabs` to react to tab switches. The event detail contains `{ tabId }`.
- The tab bar scrolls horizontally when there are many tabs.

## Form Composition

Use `bh-form-field` to wrap any form atom (`bh-input`, `bh-select`, `bh-textarea`) with a label, help text, and error message. The wrapper automatically links ARIA attributes across Shadow DOM boundaries.

```html
<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
  <bh-form-field label="Full Name" required>
    <bh-input placeholder="John Doe"></bh-input>
  </bh-form-field>

  <bh-form-field label="Email" required help-text="We'll never share your email.">
    <bh-input placeholder="you@example.com" type="email"></bh-input>
  </bh-form-field>

  <bh-form-field label="Password" required error="Password must be at least 8 characters.">
    <bh-input type="password" error></bh-input>
  </bh-form-field>

  <bh-form-field label="Bio" help-text="Tell us about yourself.">
    <bh-textarea placeholder="Write something..."></bh-textarea>
  </bh-form-field>
</div>
```

### Key points

- Place exactly one form control in the **default slot**. The form field automatically sets `aria-labelledby`, `aria-describedby`, `aria-invalid`, and `aria-required` on the slotted control.
- Set **`label`** for the visible label text. The `required` attribute adds a red asterisk.
- Set **`help-text`** for guidance below the control. It is hidden when an error is present.
- Set **`error`** for a validation error message. This replaces the help text and marks the control as invalid. Also set the `error` attribute on the input itself for visual styling.
- Use CSS parts (`label`, `help-text`, `error`, `field`) to customize styling from outside.

## Overlays

### Command Palette

`bh-command-palette` is a modal overlay with fuzzy search. Open it programmatically via its `show()` method, typically bound to a keyboard shortcut.

```html
<bh-command-palette
  id="palette"
  placeholder="Type a command..."
></bh-command-palette>

<script>
  const palette = document.querySelector('#palette');

  // Provide the command list
  palette.items = [
    { id: 'new-file', label: 'New File', category: 'File', keybinding: 'Ctrl+N' },
    { id: 'save-file', label: 'Save File', category: 'File', keybinding: 'Ctrl+S' },
    { id: 'find', label: 'Find in File', category: 'Edit', keybinding: 'Ctrl+F' },
    { id: 'toggle-sidebar', label: 'Toggle Sidebar', category: 'View', keybinding: 'Ctrl+B' },
  ];

  // Open with keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      palette.show();
    }
  });

  // Handle command execution
  palette.addEventListener('bh-execute', (e) => {
    console.log('Executed:', e.detail.id, e.detail.label);
  });
</script>
```

### Key points

- Set **`.items`** as a JavaScript property (not an attribute) with an array of `{ id, label, category?, keybinding? }` objects.
- Call **`show()`** to open, **`close()`** to close, or **`toggle()`** to flip state.
- The palette supports **fuzzy search** out of the box -- typing filters the list by label.
- Use **Arrow keys** to navigate, **Enter** to execute, **Escape** to close.
- Listen for **`bh-execute`** to handle the selected command. Detail contains `{ id, label }`.
- Additional events: **`bh-open`** and **`bh-close`** fire when the palette opens/closes.

### Context Menu

`bh-context-menu` is a positioned menu overlay, typically triggered by right-click.

```html
<div id="file-list" style="width: 300px; height: 200px; border: 1px dashed gray;">
  Right-click for options
</div>

<bh-context-menu id="ctx-menu"></bh-context-menu>

<script>
  const trigger = document.querySelector('#file-list');
  const menu = document.querySelector('#ctx-menu');

  // Open on right-click, passing position and items
  trigger.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.show(e.clientX, e.clientY, [
      { id: 'new-file', label: 'New File' },
      { id: 'new-folder', label: 'New Folder' },
      { id: 'sep-1', label: '', separator: true },
      { id: 'cut', label: 'Cut' },
      { id: 'copy', label: 'Copy' },
      { id: 'paste', label: 'Paste', disabled: true },
      { id: 'sep-2', label: '', separator: true },
      { id: 'delete', label: 'Delete' },
    ]);
  });

  // Handle selection
  menu.addEventListener('bh-select', (e) => {
    console.log('Selected:', e.detail.id, e.detail.label);
  });
</script>
```

### Key points

- Call **`show(x, y, items?)`** to open the menu at specific coordinates. Pass items as the third argument, or set them beforehand via the `.items` property.
- Each item is `{ id, label, icon?, disabled?, separator? }`. Separator items render as a horizontal line.
- Disabled items are visually muted and not clickable.
- Listen for **`bh-select`** when an item is chosen. Detail contains `{ id, label }`.
- Call **`hide()`** to close programmatically. The menu also closes on Escape or clicking outside.

## Tree Navigation

Use `bh-tree` as the container and `bh-tree-item` for each node. Nest items using the `slot="children"` on child items and set the `indent` attribute to control visual depth.

```html
<bh-tree selected="button" style="width: 280px;">
  <bh-tree-item value="src" label="src" expanded>
    <bh-tree-item slot="children" value="atoms" label="atoms" indent="1" expanded>
      <bh-tree-item slot="children" value="button" label="bh-button.ts" indent="2"></bh-tree-item>
      <bh-tree-item slot="children" value="input" label="bh-input.ts" indent="2"></bh-tree-item>
      <bh-tree-item slot="children" value="badge" label="bh-badge.ts" indent="2"></bh-tree-item>
    </bh-tree-item>
    <bh-tree-item slot="children" value="molecules" label="molecules" indent="1">
      <bh-tree-item slot="children" value="card" label="bh-card.ts" indent="2"></bh-tree-item>
    </bh-tree-item>
  </bh-tree-item>
  <bh-tree-item value="tokens" label="tokens"></bh-tree-item>
</bh-tree>
```

### Key points

- Set **`selected`** on `bh-tree` to the `value` of the initially selected item. The tree manages selection state for all descendants.
- Each `bh-tree-item` needs a **`value`** (unique identifier) and a **`label`** (display text).
- Nest child items in **`slot="children"`**. Set the **`indent`** attribute to match the nesting depth (0-based) for proper visual indentation.
- Items with children automatically show a **chevron** that rotates on expand/collapse. Set the `expanded` attribute for initially open nodes.
- Listen for **`bh-select`** on `bh-tree` when any item is clicked. Detail contains `{ value, label }`.
- Clicking an item with children **toggles** its expanded state and selects it. Leaf items are just selected.
- Keyboard support: **Enter/Space** to select, **ArrowRight** to expand, **ArrowLeft** to collapse. The tree uses roving tabindex for accessibility.
- Use **`slot="icon"`** on a tree item to place an icon before the label, and **`slot="end"`** for trailing content like badges.

## Card with Actions

Use `bh-card` with named slots to build content containers with headers, actions, and footers.

```html
<bh-card variant="outlined">
  <span slot="header" style="font-weight: 600;">Team Members</span>
  <div slot="header-actions" style="display: flex; gap: 0.5rem;">
    <bh-button variant="ghost" size="sm" icon-only label="Edit">E</bh-button>
    <bh-button size="sm">Add</bh-button>
  </div>

  <p>Card body content goes here.</p>

  <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
    <bh-button variant="ghost" size="sm">Cancel</bh-button>
    <bh-button size="sm">Save</bh-button>
  </div>
</bh-card>
```

### Key points

- **`slot="header"`** -- Left-aligned header content (title). The header row only renders when either `header` or `header-actions` has content.
- **`slot="header-actions"`** -- Right-aligned header controls (buttons, badges). Displayed in a flex row alongside the header.
- **Default slot** -- The card body. Padding is controlled by the `padding` attribute: `none`, `sm`, `md` (default), or `lg`.
- **`slot="footer"`** -- Footer area with a top border separator. Useful for action buttons.
- The **`variant`** attribute controls appearance: `default` (shadow, no border), `outlined` (border, no shadow), or `flat` (neither).
- Add the **`corner-accents`** attribute for decorative corner highlights that glow on hover.
- Use CSS parts (`card`, `header`, `body`, `footer`) to customize styling from outside.

## Toolbar

Use `bh-toolbar` to create a horizontal action bar with start, center, and end sections.

```html
<bh-toolbar variant="surface" gap="sm" sticky>
  <bh-button slot="start" variant="ghost" size="sm">File</bh-button>
  <bh-button slot="start" variant="ghost" size="sm">Edit</bh-button>
  <bh-button slot="start" variant="ghost" size="sm">View</bh-button>

  <!-- Default slot content goes in the center -->
  <span>Page 1 of 12</span>

  <bh-button slot="end" variant="ghost" size="sm">Share</bh-button>
  <bh-button slot="end" size="sm">Save</bh-button>
</bh-toolbar>
```

### Key points

- **`slot="start"`** -- Left-aligned items (pushed to the start with `margin-inline-end: auto`).
- **Default slot** -- Center-aligned content. Useful for pagination or status text.
- **`slot="end"`** -- Right-aligned items (pushed to the end with `margin-inline-start: auto`).
- The **`gap`** attribute controls spacing between items: `xs`, `sm` (default), or `md`.
- The **`variant`** attribute controls background: `default` (transparent) or `surface` (uses the surface color token).
- Set **`sticky`** to make the toolbar stick to the top of its scroll container. When sticky, a bottom border is added automatically.
- Use the `toolbar` CSS part to further customize the container.
