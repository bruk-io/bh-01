# Testing Patterns Reference

## web-test-runner.config.mjs Setup

```javascript
import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: 'src/**/*.test.ts',
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ ts: true }),
  ],
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    // Optionally add firefox, webkit
  ],
  coverageConfig: {
    report: true,
    include: ['src/**/*.ts'],
    exclude: ['src/**/*.test.ts', 'src/**/*.stories.ts'],
  },
};
```

## @open-wc/testing Full API

### `fixture(html\`...\`)`

Render a template, append it to the document body, and return the element after `updateComplete` resolves.

```typescript
const el = await fixture<BhButton>(html`<bh-button>Click</bh-button>`);
```

### `fixtureCleanup()`

Manually remove all fixtures from the DOM. Normally handled automatically between tests.

```typescript
afterEach(() => {
  fixtureCleanup();
});
```

### `expect(el).shadowDom.to.equal(...)`

Assert the shadow DOM structure of an element. Whitespace is normalized.

```typescript
expect(el).shadowDom.to.equal(`
  <button part="button">
    <slot></slot>
  </button>
`);
```

### `expect(el).lightDom.to.equal(...)`

Assert the light DOM (children) of an element.

```typescript
expect(el).lightDom.to.equal(`
  <span>Child content</span>
`);
```

### `expect(el).to.be.accessible()`

Run an axe-core accessibility audit against the element.

```typescript
await expect(el).to.be.accessible();
```

### `oneEvent(el, 'event-name')`

Return a Promise that resolves with the next event of the given name dispatched on the element.

```typescript
setTimeout(() => el.click());
const event = await oneEvent(el, 'bh-click');
```

### `waitUntil(fn, message?, options?)`

Poll a function until it returns truthy. Throws with the provided message on timeout.

```typescript
await waitUntil(() => el.loaded, 'Element did not load in time', { timeout: 2000 });
```

### `aTimeout(ms)`

Promise-based timeout. Use sparingly — prefer `waitUntil` or `updateComplete`.

```typescript
await aTimeout(100);
```

### `nextFrame()`

Wait for the next animation frame (next browser paint).

```typescript
await nextFrame();
```

### `defineCE(class)`

Define an anonymous custom element for one-off test scenarios. Returns the generated tag name.

```typescript
const tag = defineCE(class extends LitElement {
  render() {
    return html`<p>Test</p>`;
  }
});
const el = await fixture(`<${tag}></${tag}>`);
```

## Test Patterns Per Atomic Level

### Atoms

Single-purpose UI elements. Test in complete isolation.

```typescript
import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import type { BhButton } from './bh-button.js';
import './bh-button.js';

describe('bh-button', () => {
  // Property states
  it('reflects variant attribute', async () => {
    const el = await fixture<BhButton>(html`<bh-button variant="primary"></bh-button>`);
    expect(el.variant).to.equal('primary');
    expect(el.getAttribute('variant')).to.equal('primary');
  });

  it('applies disabled state', async () => {
    const el = await fixture<BhButton>(html`<bh-button disabled></bh-button>`);
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.disabled).to.be.true;
  });

  // Keyboard interactions
  it('activates on Enter key', async () => {
    const el = await fixture<BhButton>(html`<bh-button>Click</bh-button>`);

    setTimeout(() => {
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    const event = await oneEvent(el, 'bh-click');
    expect(event).to.exist;
  });

  // Event emission
  it('emits bh-click on click', async () => {
    const el = await fixture<BhButton>(html`<bh-button>Click</bh-button>`);

    setTimeout(() => {
      el.shadowRoot!.querySelector('button')!.click();
    });

    const event = await oneEvent(el, 'bh-click');
    expect(event).to.exist;
  });

  // Accessibility
  it('is accessible', async () => {
    const el = await fixture(html`<bh-button>Click me</bh-button>`);
    await expect(el).to.be.accessible();
  });
});
```

### Molecules

Composed from atoms. Test that composition works and events propagate correctly.

```typescript
import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import type { BhSearchBar } from './bh-search-bar.js';
import './bh-search-bar.js';

describe('bh-search-bar', () => {
  // Composed behavior
  it('renders internal atoms', async () => {
    const el = await fixture<BhSearchBar>(html`<bh-search-bar></bh-search-bar>`);
    const input = el.shadowRoot!.querySelector('bh-input');
    const button = el.shadowRoot!.querySelector('bh-button');
    expect(input).to.exist;
    expect(button).to.exist;
  });

  // Events bubble from child atoms
  it('emits bh-search when button is clicked', async () => {
    const el = await fixture<BhSearchBar>(html`<bh-search-bar></bh-search-bar>`);
    const input = el.shadowRoot!.querySelector('bh-input')!;

    // Set value on internal input
    input.value = 'query';
    await input.updateComplete;

    setTimeout(() => {
      el.shadowRoot!.querySelector('bh-button')!.click();
    });

    const event = await oneEvent(el, 'bh-search');
    expect(event.detail.query).to.equal('query');
  });

  // Internal atoms receive correct properties
  it('passes placeholder to internal input', async () => {
    const el = await fixture<BhSearchBar>(
      html`<bh-search-bar placeholder="Search..."></bh-search-bar>`
    );
    const input = el.shadowRoot!.querySelector('bh-input')!;
    expect(input.placeholder).to.equal('Search...');
  });

  // Slot content
  it('renders custom button text via slot', async () => {
    const el = await fixture(html`
      <bh-search-bar>
        <span slot="button-text">Go</span>
      </bh-search-bar>
    `);
    const slot = el.shadowRoot!.querySelector('slot[name="button-text"]') as HTMLSlotElement;
    const assigned = slot.assignedElements();
    expect(assigned[0].textContent).to.equal('Go');
  });
});
```

### Organisms

Complex interactive regions. Test navigation, focus management, and dynamic content.

```typescript
import { fixture, html, expect, oneEvent, waitUntil } from '@open-wc/testing';
import type { BhDataTable } from './bh-data-table.js';
import './bh-data-table.js';

describe('bh-data-table', () => {
  const rows = [
    { id: '1', name: 'Alice', role: 'Admin' },
    { id: '2', name: 'Bob', role: 'User' },
  ];

  // Complex interactions
  it('sorts by column on header click', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .rows=${rows} .columns=${['name', 'role']}></bh-data-table>
    `);

    const nameHeader = el.shadowRoot!.querySelector('[data-column="name"]')!;
    nameHeader.click();
    await el.updateComplete;

    const firstCell = el.shadowRoot!.querySelector('td')!;
    expect(firstCell.textContent).to.contain('Alice');
  });

  // Keyboard navigation
  it('navigates rows with arrow keys', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .rows=${rows} .columns=${['name', 'role']}></bh-data-table>
    `);

    const firstRow = el.shadowRoot!.querySelector('tr[data-row]')!;
    firstRow.focus();

    firstRow.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    const activeRow = el.shadowRoot!.querySelector('tr[data-row]:focus');
    expect(activeRow?.getAttribute('data-row')).to.equal('1');
  });

  // Focus management
  it('traps focus in modal mode', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .rows=${rows} modal></bh-data-table>
    `);
    await el.updateComplete;

    const focusable = el.shadowRoot!.querySelectorAll('[tabindex], button, input');
    expect(focusable.length).to.be.greaterThan(0);
  });

  // Dynamic content
  it('updates when rows change', async () => {
    const el = await fixture<BhDataTable>(html`
      <bh-data-table .rows=${rows} .columns=${['name']}></bh-data-table>
    `);

    el.rows = [...rows, { id: '3', name: 'Charlie', role: 'User' }];
    await el.updateComplete;

    const rowElements = el.shadowRoot!.querySelectorAll('tr[data-row]');
    expect(rowElements.length).to.equal(3);
  });
});
```

## Async Patterns

### `await el.updateComplete`

Wait for a single Lit update cycle. Use after setting any reactive property.

```typescript
el.disabled = true;
await el.updateComplete;
expect(el.shadowRoot!.querySelector('button')!.disabled).to.be.true;
```

### `await oneEvent(el, 'event')`

Wait for a specific event. Schedule the trigger in `setTimeout` so the listener registers first.

```typescript
setTimeout(() => el.shadowRoot!.querySelector('button')!.click());
const event = await oneEvent(el, 'bh-click');
```

### `await nextFrame()`

Wait for the browser to paint. Use when you need post-layout measurements.

```typescript
el.style.width = '200px';
await nextFrame();
const rect = el.getBoundingClientRect();
expect(rect.width).to.equal(200);
```

### `await aTimeout(ms)`

Explicit delay. Use sparingly — prefer `waitUntil` or `updateComplete`.

```typescript
el.triggerAnimation();
await aTimeout(300); // wait for 250ms transition + buffer
expect(el.classList.contains('animated')).to.be.true;
```

### `await waitUntil(() => condition, message)`

Poll until a condition is met. Best for async operations with unpredictable timing.

```typescript
el.loadData();
await waitUntil(() => el.items.length > 0, 'Items did not load');
expect(el.items).to.have.length(3);
```

## Mocking Context Providers

Test components that consume `@lit/context` by providing context from a wrapper element.

```typescript
import { createContext, ContextProvider } from '@lit/context';

it('consumes theme context', async () => {
  const themeContext = createContext<string>('theme');

  const wrapper = await fixture(html`
    <div>
      <bh-button>Themed</bh-button>
    </div>
  `);

  // Provide context from wrapper
  new ContextProvider(wrapper, { context: themeContext, initialValue: 'dark' });

  const button = wrapper.querySelector('bh-button')!;
  await button.updateComplete;

  // Assert theme was consumed
  expect(button.theme).to.equal('dark');
});
```

## Visual Regression with Playwright

Capture and compare screenshots of rendered components.

```typescript
import { visualDiff } from '@web/test-runner-visual-regression';

it('matches visual snapshot', async () => {
  const el = await fixture(html`<bh-button variant="primary">Click</bh-button>`);
  await visualDiff(el, 'bh-button-primary');
});
```

On first run, a baseline image is saved. Subsequent runs compare against the baseline and fail if the diff exceeds the threshold.

## Accessibility Audit Patterns

### Full Page Audit

```typescript
it('entire page is accessible', async () => {
  const page = await fixture(html`
    <bh-page-layout>
      <bh-navbar slot="header"></bh-navbar>
      <bh-sidebar slot="aside"></bh-sidebar>
      <main>Content</main>
    </bh-page-layout>
  `);
  await expect(page).to.be.accessible();
});
```

### Selective Rule Checking

```typescript
it('meets color contrast requirements', async () => {
  const el = await fixture(html`<bh-button>Click</bh-button>`);
  await expect(el).to.be.accessible({
    ignoredRules: ['button-name'],  // if testing other aspects
  });
});
```

### Testing ARIA Roles and Properties

```typescript
it('has correct role and labels', async () => {
  const el = await fixture(html`<bh-dialog open title="Confirm"></bh-dialog>`);
  const dialog = el.shadowRoot!.querySelector('[role="dialog"]')!;
  expect(dialog).to.exist;
  expect(dialog.getAttribute('aria-label')).to.equal('Confirm');
});
```

## Testing Forms and Validation

```typescript
it('shows validation error for required field', async () => {
  const el = await fixture<BhInput>(html`<bh-input required></bh-input>`);

  // Trigger validation
  el.reportValidity();
  await el.updateComplete;

  const error = el.shadowRoot!.querySelector('.error-message');
  expect(error).to.exist;
  expect(error!.textContent).to.contain('required');
});

it('clears error when value is provided', async () => {
  const el = await fixture<BhInput>(html`<bh-input required></bh-input>`);

  el.reportValidity();
  await el.updateComplete;
  expect(el.shadowRoot!.querySelector('.error-message')).to.exist;

  el.value = 'filled';
  el.reportValidity();
  await el.updateComplete;
  expect(el.shadowRoot!.querySelector('.error-message')).to.not.exist;
});
```

## Testing CSS Custom Property Application

```typescript
it('applies design tokens', async () => {
  const el = await fixture(html`<bh-button variant="primary">Click</bh-button>`);
  const button = el.shadowRoot!.querySelector('button')!;
  const styles = getComputedStyle(button);

  // Verify the component uses tokens (exact values depend on theme)
  expect(styles.backgroundColor).to.not.equal('rgba(0, 0, 0, 0)');
});

it('responds to custom property overrides', async () => {
  const el = await fixture(html`
    <div style="--bh-button-bg: red;">
      <bh-button>Custom</bh-button>
    </div>
  `);

  const button = el.querySelector('bh-button')!.shadowRoot!.querySelector('button')!;
  const styles = getComputedStyle(button);
  expect(styles.backgroundColor).to.equal('rgb(255, 0, 0)');
});
```

## Testing Lifecycle Behavior

```typescript
it('cleans up on disconnect', async () => {
  const el = await fixture<BhTimer>(html`<bh-timer></bh-timer>`);
  const spy = sinon.spy(window, 'clearInterval');

  el.remove();

  expect(spy).to.have.been.called;
  spy.restore();
});

it('re-initializes on reconnect', async () => {
  const el = await fixture<BhTimer>(html`<bh-timer></bh-timer>`);
  const parent = el.parentElement!;

  el.remove();
  parent.appendChild(el);
  await el.updateComplete;

  expect(el.isConnected).to.be.true;
});
```
