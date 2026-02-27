import { html, type TemplateResult } from 'lit';
import { BhIcon } from '../../atoms/icon/bh-icon.js';

// -- Component imports --
import '../../atoms/avatar/bh-avatar.js';
import '../../atoms/badge/bh-badge.js';
import '../../atoms/button/bh-button.js';
import '../../atoms/divider/bh-divider.js';
import '../../atoms/icon/bh-icon.js';
import '../../atoms/input/bh-input.js';
import '../../atoms/led/bh-led.js';
import '../../atoms/progress/bh-progress.js';
import '../../atoms/select/bh-select.js';
import '../../atoms/text/bh-text.js';
import '../../molecules/card/bh-card.js';
import '../../molecules/chip/bh-chip.js';
import '../../molecules/nav-item/bh-nav-item.js';
import '../../molecules/pixel-panel/bh-pixel-panel.js';
import '../../molecules/section-header/bh-section-header.js';
import '../../molecules/table/bh-table.js';
import '../../organisms/data-table/bh-data-table.js';
import '../../layout/flex/stack/bh-stack.js';
import '../../layout/flex/cluster/bh-cluster.js';
import '../../layout/flex/repel/bh-repel.js';
import '../../layout/flex/center/bh-center.js';
import '../../layout/flex/reel/bh-reel.js';
import '../../layout/flex/cover/bh-cover.js';
import '../../layout/grid/grid/bh-grid.js';
import '../../layout/grid/split/bh-split.js';
import '../../layout/grid/switcher/bh-switcher.js';

// ---------------------------------------------------------------------------
// Custom icons
// ---------------------------------------------------------------------------

BhIcon.register('home', '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 14 15 14 15 21"/>');
BhIcon.register('grid', '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>');
BhIcon.register('compass', '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" stroke="none"/>');
BhIcon.register('bell', '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>');
BhIcon.register('settings', '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>');
BhIcon.register('database', '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>');
BhIcon.register('refresh', '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>');

// ---------------------------------------------------------------------------
// Scoped styles — rendered once by the fullscreen decorator
// ---------------------------------------------------------------------------

const grafStyles = html`<style>
  /* Shell layout */
  .graf-shell {
    display: grid;
    grid-template-columns: 220px 1fr;
    height: 100vh;
    background: var(--bh-color-bg);
    color: var(--bh-color-text);
  }
  .graf-content-col { overflow: hidden; }
  .graf-content { flex: 1; overflow-y: auto; padding: var(--bh-spacing-4); }
  .graf-fullscreen {
    background: var(--bh-color-bg);
    color: var(--bh-color-text);
    min-height: 100vh;
  }

  /* Sidebar */
  .graf-sidebar {
    width: 220px;
    flex-shrink: 0;
    background: var(--bh-color-surface-recessed);
    border-right: 1px solid var(--bh-color-border);
    overflow-y: auto;
  }
  .graf-sidebar-logo {
    padding: var(--bh-spacing-3) var(--bh-spacing-4);
    border-bottom: 1px solid var(--bh-color-border);
  }
  .graf-section-label {
    display: block;
    font-family: var(--bh-font-mono);
    font-size: var(--bh-text-2xs, 0.625rem);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--bh-color-text-muted);
    padding: var(--bh-spacing-1) var(--bh-spacing-3);
    margin-bottom: var(--bh-spacing-1);
  }
  .graf-nav-section { padding: var(--bh-spacing-2); }

  /* Top bar */
  .graf-topbar {
    padding: var(--bh-spacing-2) var(--bh-spacing-4);
    border-bottom: 1px solid var(--bh-color-border);
    background: var(--bh-color-surface);
  }
  .graf-breadcrumb-sep { opacity: 0.4; }

  /* Stat panels */
  .graf-stat-content { text-align: center; }
  .graf-stat-label {
    font-size: var(--bh-text-2xs, 0.625rem);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--bh-color-text-muted);
  }
  .graf-stat-value {
    font-size: 2rem;
    font-weight: 700;
    font-family: var(--bh-font-mono);
    color: var(--bh-color-text);
    line-height: 1;
  }
  .graf-stat-unit { font-size: 1rem; opacity: 0.7; }

  /* Panel wrappers */
  .graf-panel-body { padding: var(--bh-spacing-3); }

  /* Alert card accent wrapper */
  .graf-alert-card {
    border: 1px solid var(--bh-color-border);
    border-left: 3px solid var(--bh-color-danger);
    border-radius: var(--bh-radius-lg);
    overflow: hidden;
  }

  /* Status bar */
  .graf-status-bar {
    padding-top: var(--bh-spacing-3);
    border-top: 1px solid var(--bh-color-border);
  }
</style>`;

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

export const timeRangeOptions = [
  { value: '15m', label: 'Last 15 minutes' },
  { value: '30m', label: 'Last 30 minutes' },
  { value: '1h', label: 'Last 1 hour' },
  { value: '3h', label: 'Last 3 hours' },
  { value: '6h', label: 'Last 6 hours' },
  { value: '12h', label: 'Last 12 hours' },
  { value: '24h', label: 'Last 24 hours' },
];

export const dashboardList = [
  { name: 'System Overview', folder: 'Infrastructure', stars: 12, uid: 'sys-overview' },
  { name: 'Node Exporter', folder: 'Infrastructure', stars: 8, uid: 'node-exporter' },
  { name: 'PostgreSQL', folder: 'Databases', stars: 15, uid: 'postgres' },
  { name: 'Redis Cluster', folder: 'Databases', stars: 6, uid: 'redis' },
  { name: 'Kubernetes Cluster', folder: 'Infrastructure', stars: 22, uid: 'k8s' },
  { name: 'Network Traffic', folder: 'Networking', stars: 9, uid: 'network' },
  { name: 'API Gateway', folder: 'Services', stars: 11, uid: 'api-gw' },
  { name: 'Loki Logs', folder: 'Observability', stars: 7, uid: 'loki' },
];

export const k8sNodes = [
  { name: 'node-01', status: 'Ready', role: 'control-plane', cpu: '32%', memory: '58%', pods: '26/110' },
  { name: 'node-02', status: 'Ready', role: 'worker', cpu: '45%', memory: '71%', pods: '31/110' },
  { name: 'node-03', status: 'Ready', role: 'worker', cpu: '28%', memory: '52%', pods: '22/110' },
  { name: 'node-04', status: 'Ready', role: 'worker', cpu: '61%', memory: '67%', pods: '12/110' },
];

export const alertRules = [
  { name: 'HighCPUUsage', state: 'firing', severity: 'critical', instance: 'node-02:9100', duration: '12m', value: '92.4%' },
  { name: 'DiskSpaceLow', state: 'firing', severity: 'warning', instance: 'node-04:9100', duration: '5m', value: '89.1%' },
  { name: 'MemoryPressure', state: 'firing', severity: 'critical', instance: 'node-02:9100', duration: '3m', value: '94.7%' },
  { name: 'PodCrashLoop', state: 'pending', severity: 'warning', instance: 'default/api-svc', duration: '1m', value: '3 restarts' },
  { name: 'CertExpiring', state: 'resolved', severity: 'info', instance: '*.example.com', duration: '0s', value: '45 days' },
];

export const services = [
  { name: 'API Gateway', status: 'success' as const },
  { name: 'Auth Service', status: 'success' as const },
  { name: 'Database', status: 'success' as const },
  { name: 'Cache', status: 'warning' as const },
  { name: 'Queue Worker', status: 'success' as const },
  { name: 'Scheduler', status: 'success' as const },
];

// ---------------------------------------------------------------------------
// Shared layout helpers
// ---------------------------------------------------------------------------

export function renderSidebar(activeItem: string): TemplateResult {
  return html`
    <nav class="graf-sidebar">
      <bh-stack gap="none">
        <div class="graf-sidebar-logo">
          <bh-cluster gap="sm" align="center" nowrap>
            <bh-avatar size="sm" initials="G"></bh-avatar>
            <bh-text variant="body"><strong>Grafana</strong></bh-text>
          </bh-cluster>
        </div>

        <bh-stack gap="xs" class="graf-nav-section">
          <bh-nav-item ?active=${activeItem === 'home'}>
            <bh-icon slot="prefix" name="home" size="sm"></bh-icon>
            Home
          </bh-nav-item>
          <bh-nav-item ?active=${activeItem === 'dashboards'}>
            <bh-icon slot="prefix" name="grid" size="sm"></bh-icon>
            Dashboards
          </bh-nav-item>
        </bh-stack>

        <bh-divider spacing="xs"></bh-divider>

        <div class="graf-nav-section">
          <span class="graf-section-label">OBSERVE</span>
          <bh-stack gap="xs">
            <bh-nav-item ?active=${activeItem === 'explore'}>
              <bh-icon slot="prefix" name="compass" size="sm"></bh-icon>
              Explore
            </bh-nav-item>
            <bh-nav-item ?active=${activeItem === 'alerting'}>
              <bh-icon slot="prefix" name="bell" size="sm"></bh-icon>
              Alerting
              <bh-badge slot="suffix" variant="danger" size="sm">3</bh-badge>
            </bh-nav-item>
          </bh-stack>
        </div>

        <bh-divider spacing="xs"></bh-divider>

        <div class="graf-nav-section">
          <span class="graf-section-label">CONFIGURE</span>
          <bh-stack gap="xs">
            <bh-nav-item ?active=${activeItem === 'datasources'}>
              <bh-icon slot="prefix" name="database" size="sm"></bh-icon>
              Data sources
            </bh-nav-item>
            <bh-nav-item ?active=${activeItem === 'admin'}>
              <bh-icon slot="prefix" name="settings" size="sm"></bh-icon>
              Administration
            </bh-nav-item>
          </bh-stack>
        </div>
      </bh-stack>
    </nav>
  `;
}

export function renderTopBar(breadcrumbs: string[]): TemplateResult {
  return html`
    <bh-repel gap="md" class="graf-topbar">
      <bh-cluster gap="xs" align="center">
        ${breadcrumbs.map((crumb, i) => {
          const isLast = i === breadcrumbs.length - 1;
          return html`
            ${i > 0 ? html`<bh-icon name="chevron-right" size="sm" class="graf-breadcrumb-sep"></bh-icon>` : null}
            ${isLast
              ? html`<bh-text variant="small"><strong>${crumb}</strong></bh-text>`
              : html`<bh-text variant="small">${crumb}</bh-text>`}
          `;
        })}
      </bh-cluster>

      <bh-cluster gap="sm" align="center" nowrap>
        <bh-select size="sm" .options=${timeRangeOptions} value="1h"></bh-select>
        <bh-button variant="secondary" size="sm" icon-only label="Refresh">
          <bh-icon slot="prefix" name="refresh"></bh-icon>
        </bh-button>
      </bh-cluster>
    </bh-repel>
  `;
}

export function renderAppShell(
  activeNav: string,
  breadcrumbs: string[],
  content: TemplateResult,
): TemplateResult {
  return html`
    <div class="graf-shell">
      ${renderSidebar(activeNav)}
      <bh-stack gap="none" class="graf-content-col">
        ${renderTopBar(breadcrumbs)}
        <div class="graf-content">
          ${content}
        </div>
      </bh-stack>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Panel helpers
// ---------------------------------------------------------------------------

export function renderStatPanel(
  label: string,
  value: string,
  unit?: string,
): TemplateResult {
  return html`
    <bh-card variant="outlined" padding="md">
      <bh-stack gap="xs" align="center" class="graf-stat-content">
        <span class="graf-stat-label">${label}</span>
        <span class="graf-stat-value">${value}${unit ? html`<span class="graf-stat-unit">${unit}</span>` : null}</span>
      </bh-stack>
    </bh-card>
  `;
}

export function renderPanel(title: string, body: TemplateResult): TemplateResult {
  return html`
    <bh-card variant="outlined" padding="none">
      <bh-text slot="header" variant="small"><strong>${title}</strong></bh-text>
      <bh-button slot="header-actions" variant="ghost" size="sm" icon-only label="Menu">
        <bh-icon slot="prefix" name="menu"></bh-icon>
      </bh-button>
      <div class="graf-panel-body">${body}</div>
    </bh-card>
  `;
}

// ---------------------------------------------------------------------------
// Alert card helper — wraps bh-card in a container with rounded accent bar
// ---------------------------------------------------------------------------

export function renderAlertCard(content: TemplateResult): TemplateResult {
  return html`
    <div class="graf-alert-card">
      <bh-card variant="flat" padding="sm">
        ${content}
      </bh-card>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Fullscreen story decorator — injects scoped styles
// ---------------------------------------------------------------------------

export function fullscreenDecorator(story: () => unknown, context: { globals: { theme?: string } }): TemplateResult {
  const theme = context.globals.theme || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  return html`
    ${grafStyles}
    <div class="graf-fullscreen" data-theme=${theme}>${story()}</div>
  `;
}
