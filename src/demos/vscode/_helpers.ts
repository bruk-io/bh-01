import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BhIcon } from '../../atoms/icon/bh-icon.js';

// ---------------------------------------------------------------------------
// Component imports
// ---------------------------------------------------------------------------

import '../../atoms/badge/bh-badge.js';
import '../../atoms/button/bh-button.js';
import '../../atoms/divider/bh-divider.js';
import '../../atoms/icon/bh-icon.js';
import '../../atoms/input/bh-input.js';
import '../../atoms/led/bh-led.js';
import '../../atoms/text/bh-text.js';
import '../../atoms/slider/bh-slider.js';
import '../../molecules/accordion/bh-accordion.js';
import '../../molecules/card/bh-card.js';
import '../../molecules/panel-header/bh-panel-header.js';
import '../../molecules/toolbar/bh-toolbar.js';
import '../../organisms/shell/bh-app-shell.js';
import '../../organisms/shell/bh-activity-bar.js';
import '../../organisms/shell/bh-activity-item.js';
import '../../organisms/shell/bh-sidebar-panel.js';
import '../../organisms/shell/bh-status-bar.js';
import '../../organisms/tabs/bh-tab-bar.js';
import '../../organisms/tabs/bh-tab.js';
import '../../organisms/tabs/bh-tab-panel.js';
import '../../organisms/tabs/bh-tabs.js';
import '../../organisms/tree/bh-tree.js';
import '../../organisms/tree/bh-tree-item.js';
import '../../layout/flex/stack/bh-stack.js';
import '../../layout/flex/cluster/bh-cluster.js';
import '../../layout/flex/repel/bh-repel.js';

// ---------------------------------------------------------------------------
// Custom icons
// ---------------------------------------------------------------------------

BhIcon.register('files', '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>');
BhIcon.register('search', '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>');
BhIcon.register('git-branch', '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>');
BhIcon.register('extensions', '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>');
BhIcon.register('settings-gear', '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>');
BhIcon.register('new-file', '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>');
BhIcon.register('refresh', '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>');
BhIcon.register('git-commit', '<circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/>');
BhIcon.register('git-diff', '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>');

// ---------------------------------------------------------------------------
// Fake file content
// ---------------------------------------------------------------------------

const fileContents: Record<string, string> = {
  'bh-button.ts': `import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../primitives/base-element.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@customElement('bh-button')
export class BhButton extends BaseElement {
  static styles = [
    ...([BaseElement.styles].flat()),
    css\`
      :host { display: inline-flex; }
      button {
        display: inline-flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        border-radius: var(--bh-radius-md);
        font-weight: 500;
        cursor: pointer;
        transition: background var(--bh-transition-fast);
      }
    \`,
  ];

  @property() variant: ButtonVariant = 'secondary';
  @property() size: ButtonSize = 'md';
  @property({ type: Boolean }) disabled = false;

  render() {
    return html\`
      <button ?disabled=\${this.disabled}>
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
      </button>
    \`;
  }
}`,

  'base-element.ts': `import { LitElement, css } from 'lit';

/**
 * Abstract base class for all bh-01 components.
 * Extends LitElement with shared utilities.
 */
export abstract class BaseElement extends LitElement {
  static styles = css\`
    :host {
      box-sizing: border-box;
    }
    :host *,
    :host *::before,
    :host *::after {
      box-sizing: inherit;
    }
    :host([hidden]) {
      display: none !important;
    }
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
  \`;
}`,

  'default.css': `:root {
  --bh-color-bg: #ffffff;
  --bh-color-surface: #f5f5f5;
  --bh-color-surface-raised: #e8e8e8;
  --bh-color-primary: #2563eb;
  --bh-color-text: #111827;
  --bh-color-text-muted: #6b7280;
  --bh-color-border: #e5e7eb;
}

[data-theme='dark'] {
  --bh-color-bg: #0d0c0a;
  --bh-color-surface: #151412;
  --bh-color-surface-raised: #222120;
  --bh-color-primary: #ff6b35;
  --bh-color-text: #f0ebe3;
  --bh-color-text-muted: #7a7570;
  --bh-color-border: #2a2825;
}`,
};

// ---------------------------------------------------------------------------
// Sidebar panel renderers (one per activity)
// ---------------------------------------------------------------------------

function renderExplorerPanel(): TemplateResult {
  return html`
    <bh-sidebar-panel style="height:100%">
      <bh-panel-header slot="header" label="Explorer">
        <bh-button slot="end" variant="ghost" size="sm" icon-only label="New File">
          <bh-icon slot="prefix" name="new-file"></bh-icon>
        </bh-button>
        <bh-button slot="end" variant="ghost" size="sm" icon-only label="Refresh">
          <bh-icon slot="prefix" name="refresh"></bh-icon>
        </bh-button>
      </bh-panel-header>

      <bh-accordion>
        <bh-accordion-item label="BH-01" open>
          <bh-tree>
            <bh-tree-item value="src" label="src" expanded>
              <bh-tree-item slot="children" value="atoms" label="atoms" expanded>
                <bh-tree-item slot="children" value="bh-button.ts" label="bh-button.ts" selected></bh-tree-item>
                <bh-tree-item slot="children" value="bh-input.ts" label="bh-input.ts"></bh-tree-item>
                <bh-tree-item slot="children" value="bh-badge.ts" label="bh-badge.ts"></bh-tree-item>
                <bh-tree-item slot="children" value="bh-slider.ts" label="bh-slider.ts"></bh-tree-item>
              </bh-tree-item>
              <bh-tree-item slot="children" value="primitives" label="primitives" expanded>
                <bh-tree-item slot="children" value="base-element.ts" label="base-element.ts"></bh-tree-item>
              </bh-tree-item>
              <bh-tree-item slot="children" value="themes" label="themes">
                <bh-tree-item slot="children" value="default.css" label="default.css"></bh-tree-item>
              </bh-tree-item>
            </bh-tree-item>
          </bh-tree>
        </bh-accordion-item>
        <bh-accordion-item label="Open Editors">
          <bh-tree>
            <bh-tree-item value="bh-button.ts" label="bh-button.ts" selected></bh-tree-item>
            <bh-tree-item value="base-element.ts" label="base-element.ts"></bh-tree-item>
          </bh-tree>
        </bh-accordion-item>
      </bh-accordion>
    </bh-sidebar-panel>
  `;
}

function renderSearchPanel(): TemplateResult {
  return html`
    <bh-sidebar-panel style="height:100%">
      <bh-panel-header slot="header" label="Search"></bh-panel-header>
      <div style="padding: var(--bh-spacing-3)">
        <bh-stack gap="md">
          <bh-input placeholder="Search" size="sm"></bh-input>
          <bh-text variant="small" style="color:var(--bh-color-text-muted)">
            3 results in 2 files
          </bh-text>
          <bh-accordion>
            <bh-accordion-item label="bh-button.ts (2)" open>
              <bh-stack gap="xs" style="padding: var(--bh-spacing-2)">
                <bh-text variant="small"><code>extends BaseElement</code></bh-text>
                <bh-text variant="small"><code>export class BhButton extends BaseElement</code></bh-text>
              </bh-stack>
            </bh-accordion-item>
            <bh-accordion-item label="base-element.ts (1)" open>
              <bh-stack gap="xs" style="padding: var(--bh-spacing-2)">
                <bh-text variant="small"><code>export abstract class BaseElement</code></bh-text>
              </bh-stack>
            </bh-accordion-item>
          </bh-accordion>
        </bh-stack>
      </div>
    </bh-sidebar-panel>
  `;
}

function renderGitPanel(): TemplateResult {
  return html`
    <bh-sidebar-panel style="height:100%">
      <bh-panel-header slot="header" label="Source Control">
        <bh-button slot="end" variant="ghost" size="sm" icon-only label="Commit">
          <bh-icon slot="prefix" name="git-commit"></bh-icon>
        </bh-button>
        <bh-button slot="end" variant="ghost" size="sm" icon-only label="Refresh">
          <bh-icon slot="prefix" name="refresh"></bh-icon>
        </bh-button>
      </bh-panel-header>
      <bh-stack gap="none">
        <bh-panel-header label="Changes (3)"></bh-panel-header>
        <bh-tree>
          <bh-tree-item value="bh-app-shell.ts" label="bh-app-shell.ts">
            <bh-badge slot="end" variant="warning" size="sm">M</bh-badge>
          </bh-tree-item>
          <bh-tree-item value="bh-activity-bar.ts" label="bh-activity-bar.ts">
            <bh-badge slot="end" variant="success" size="sm">A</bh-badge>
          </bh-tree-item>
          <bh-tree-item value="bh-sidebar-panel.ts" label="bh-sidebar-panel.ts">
            <bh-badge slot="end" variant="success" size="sm">A</bh-badge>
          </bh-tree-item>
        </bh-tree>
      </bh-stack>
    </bh-sidebar-panel>
  `;
}

function renderExtensionsPanel(): TemplateResult {
  return html`
    <bh-sidebar-panel style="height:100%">
      <bh-panel-header slot="header" label="Extensions"></bh-panel-header>
      <div style="padding: var(--bh-spacing-3)">
        <bh-stack gap="md">
          <bh-input placeholder="Search extensions" size="sm"></bh-input>
          <bh-panel-header label="Installed"></bh-panel-header>
          <bh-stack gap="sm">
            ${(['Lit', 'ESLint', 'Prettier', 'GitLens'] as const).map(name => html`
              <bh-card variant="outlined" padding="sm">
                <bh-cluster gap="sm" align="center">
                  <bh-led state="on" size="sm"></bh-led>
                  <bh-text variant="small"><strong>${name}</strong></bh-text>
                </bh-cluster>
              </bh-card>
            `)}
          </bh-stack>
        </bh-stack>
      </div>
    </bh-sidebar-panel>
  `;
}

// ---------------------------------------------------------------------------
// Main content — editor tabs
// ---------------------------------------------------------------------------

function lineNumbers(content: string): TemplateResult {
  const lines = content.split('\n').length;
  const nums = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  return html`
    <div class="vs-gutter">
      <pre class="vs-line-numbers">${nums}</pre>
      <pre class="vs-code">${content}</pre>
    </div>
  `;
}

function renderEditorTabs(activeTab: string): TemplateResult {
  return html`
    <bh-tabs active=${activeTab} class="vs-tabs">
      <bh-tab-bar slot="tab-bar">
        <bh-tab tab-id="bh-button.ts" label="bh-button.ts"></bh-tab>
        <bh-tab tab-id="base-element.ts" label="base-element.ts"></bh-tab>
        <bh-tab tab-id="default.css" label="default.css"></bh-tab>
      </bh-tab-bar>
      <bh-tab-panel tab-id="bh-button.ts">
        ${lineNumbers(fileContents['bh-button.ts'])}
      </bh-tab-panel>
      <bh-tab-panel tab-id="base-element.ts">
        ${lineNumbers(fileContents['base-element.ts'])}
      </bh-tab-panel>
      <bh-tab-panel tab-id="default.css">
        ${lineNumbers(fileContents['default.css'])}
      </bh-tab-panel>
    </bh-tabs>
  `;
}

// ---------------------------------------------------------------------------
// Stateful demo shell component
// Manages activity-sidebar coupling and wires all slots correctly.
// Uses light DOM (no shadow root) so global styles apply.
// ---------------------------------------------------------------------------

type PanelId = 'explorer' | 'search' | 'git' | 'extensions' | '';

@customElement('bh-vscode-demo')
export class BhVscodeDemo extends LitElement {
  // Render into light DOM so the story's global styles apply
  protected createRenderRoot() { return this; }

  @state() protected _panel: PanelId = 'explorer';
  @state() protected _activeTab = 'bh-button.ts';
  @state() protected _statusError = false;
  @state() protected _statusMessage = '';

  private get _sidebarOpen() { return this._panel !== ''; }

  render() {
    return html`
      <bh-app-shell ?sidebar-open=${this._sidebarOpen} class="vs-shell">

        <!-- Activity bar: leftmost column, drives sidebar -->
        <bh-activity-bar slot="activity" @bh-activity-change=${this._onActivity}>
          <bh-activity-item item-id="explorer" label="Explorer">
            <bh-icon name="files"></bh-icon>
          </bh-activity-item>
          <bh-activity-item item-id="search" label="Search">
            <bh-icon name="search"></bh-icon>
          </bh-activity-item>
          <bh-activity-item item-id="git" label="Source Control">
            <bh-icon name="git-branch"></bh-icon>
          </bh-activity-item>
          <bh-activity-item item-id="extensions" label="Extensions">
            <bh-icon name="extensions"></bh-icon>
          </bh-activity-item>
        </bh-activity-bar>

        <!-- Sidebar: content switches with active activity -->
        <div slot="sidebar" class="vs-sidebar-slot">
          ${this._panel === 'explorer'   ? renderExplorerPanel()   : nothing}
          ${this._panel === 'search'     ? renderSearchPanel()     : nothing}
          ${this._panel === 'git'        ? renderGitPanel()        : nothing}
          ${this._panel === 'extensions' ? renderExtensionsPanel() : nothing}
        </div>

        <!-- Main content: editor tabs -->
        <div class="vs-main-slot">
          ${renderEditorTabs(this._activeTab)}
        </div>

        <!-- Status bar -->
        <bh-status-bar
          slot="status"
          ?error=${this._statusError}
          message=${this._statusMessage || ''}
        >
          <bh-icon name="git-branch" size="sm"></bh-icon>
          main
          <span slot="end">Ln 12, Col 8</span>
          <span slot="end">UTF-8</span>
          <bh-led slot="end" state="on" size="sm"></bh-led>
        </bh-status-bar>

      </bh-app-shell>
    `;
  }

  firstUpdated() {
    // Sync initial active panel to the activity bar's internal state
    const bar = this.querySelector('bh-activity-bar') as any;
    bar?.setActive('explorer');
  }

  private _onActivity(e: CustomEvent<{ id: string }>) {
    this._panel = (e.detail.id || '') as PanelId;
  }
}

// Error-state variant — same shell, status bar shows an error
@customElement('bh-vscode-demo-error')
export class BhVscodeDemoError extends BhVscodeDemo {
  protected override createRenderRoot() { return this; }

  override firstUpdated() {
    super.firstUpdated();
    this._statusError = true;
    this._statusMessage = "Cannot find module '../../primitives/base-element.js'";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bh-vscode-demo': BhVscodeDemo;
    'bh-vscode-demo-error': BhVscodeDemoError;
  }
}

// ---------------------------------------------------------------------------
// Shared story styles
// ---------------------------------------------------------------------------

export const vsStyles = html`<style>
  .vs-shell {
    height: 100vh !important;
    width: 100%;
    overflow: hidden;
  }

  /* Sidebar slot must fill the grid cell */
  .vs-sidebar-slot {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  /* Main slot fills remaining space, tabs fill it */
  .vs-main-slot {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .vs-tabs {
    flex: 1;
    height: 100%;
  }

  /* Editor code display */
  .vs-gutter {
    display: grid;
    grid-template-columns: 3rem 1fr;
    height: 100%;
    overflow: auto;
  }
  .vs-line-numbers {
    padding: var(--bh-spacing-4) 0;
    padding-right: var(--bh-spacing-3);
    text-align: right;
    font-family: var(--bh-font-mono, monospace);
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--bh-color-text-muted);
    user-select: none;
    border-right: 1px solid var(--bh-color-border);
    background: var(--bh-color-surface);
    overflow: hidden;
    margin: 0;
  }
  .vs-code {
    display: block;
    padding: var(--bh-spacing-4);
    font-family: var(--bh-font-mono, monospace);
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--bh-color-text);
    white-space: pre;
    margin: 0;
    background: var(--bh-color-bg);
    overflow: auto;
  }

  /* Welcome screen */
  .vs-welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: var(--bh-spacing-6);
    padding: var(--bh-spacing-8);
    color: var(--bh-color-text-muted);
  }
  .vs-welcome-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--bh-color-text);
  }
  .vs-welcome-shortcuts {
    display: flex;
    flex-direction: column;
    gap: var(--bh-spacing-2);
    width: 100%;
    max-width: 320px;
  }
  .vs-shortcut-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }
  .vs-kbd { display: inline-flex; gap: 2px; }
  .vs-kbd kbd {
    display: inline-block;
    padding: 1px 6px;
    border: 1px solid var(--bh-color-border);
    border-radius: var(--bh-radius-sm);
    font-family: var(--bh-font-mono);
    font-size: 0.75rem;
    background: var(--bh-color-surface);
    color: var(--bh-color-text);
  }
</style>`;

// ---------------------------------------------------------------------------
// Story decorator
// ---------------------------------------------------------------------------

export function fullscreenDecorator(
  story: () => unknown,
  context: { globals: { theme?: string } },
): TemplateResult {
  const theme = context.globals.theme || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  return html`
    ${vsStyles}
    <div style="height:100vh;width:100%;overflow:hidden;background:var(--bh-color-bg);color:var(--bh-color-text);font-family:var(--bh-font-sans)" data-theme=${theme}>
      ${story()}
    </div>
  `;
}
