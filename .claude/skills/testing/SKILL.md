---
name: testing
description: >
  Testing Lit 3 web components with @web/test-runner and @open-wc/testing.
  Covers test fixtures, property testing, events, slots, and accessibility.
---

# Testing Skill

Test Lit 3 web components in real browsers using @web/test-runner and @open-wc/testing.

## Stack

- **@web/test-runner** — runs tests in real browsers (Chromium, Firefox, WebKit via Playwright)
- **@open-wc/testing** — provides `fixture()`, `expect()`, `html`, `oneEvent`, etc.
- **@open-wc/testing-helpers** — additional test utilities
- **Chai** for assertions (included via @open-wc/testing)

## Why Real Browsers

Web components use Shadow DOM, custom elements API, and slots — JSDOM does not support these. Tests must run in real rendering engines. `@web/test-runner` handles this automatically via Playwright browser launchers.

## Test File Location

Tests live alongside components, mirroring the component directory structure:

```
src/atoms/button/bh-button.ts
src/atoms/button/bh-button.test.ts
src/molecules/search-bar/bh-search-bar.ts
src/molecules/search-bar/bh-search-bar.test.ts
```

## Test Fixture Pattern

```typescript
import { fixture, html, expect } from '@open-wc/testing';
import type { BhButton } from './bh-button.js';
import './bh-button.js';

describe('bh-button', () => {
  it('renders with default properties', async () => {
    const el = await fixture<BhButton>(html`<bh-button>Click me</bh-button>`);
    expect(el).to.exist;
    expect(el).shadowDom.to.equal(`
      <button part="button">
        <slot></slot>
      </button>
    `);
  });
});
```

**Key points:**
- Always import the component file as a side-effect (`import './bh-button.js'`) to register the custom element.
- Use `type`-only imports for the class to avoid duplicate registration.
- `fixture()` renders the template, appends it to the DOM, and waits for `updateComplete`.

## Testing Reactive Properties

```typescript
it('updates label when property changes', async () => {
  const el = await fixture<BhButton>(html`<bh-button label="Hello"></bh-button>`);
  expect(el.label).to.equal('Hello');

  el.label = 'World';
  await el.updateComplete;

  const inner = el.shadowRoot!.querySelector('button')!;
  expect(inner.textContent).to.contain('World');
});
```

Always `await el.updateComplete` after changing a reactive property before asserting on rendered output.

## Testing Custom Events

```typescript
import { oneEvent } from '@open-wc/testing';

it('emits bh-change event on input', async () => {
  const el = await fixture<BhInput>(html`<bh-input></bh-input>`);

  setTimeout(() => {
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
  });

  const event = await oneEvent(el, 'bh-change');
  expect(event.detail.value).to.equal('test');
});
```

`oneEvent` returns a Promise that resolves with the next dispatched event of that name. Schedule the trigger in a `setTimeout` so the listener is registered before the event fires.

## Testing Slots

```typescript
it('renders slotted content', async () => {
  const el = await fixture(html`
    <bh-card>
      <span slot="header">Title</span>
      <p>Body content</p>
    </bh-card>
  `);

  const headerSlot = el.shadowRoot!.querySelector('slot[name="header"]') as HTMLSlotElement;
  const assignedNodes = headerSlot.assignedElements();
  expect(assignedNodes).to.have.length(1);
  expect(assignedNodes[0].textContent).to.equal('Title');
});
```

## Testing Accessibility

```typescript
it('is accessible', async () => {
  const el = await fixture(html`<bh-button>Click me</bh-button>`);
  await expect(el).to.be.accessible();
});

it('has correct ARIA attributes', async () => {
  const el = await fixture(html`<bh-button disabled>Click me</bh-button>`);
  const button = el.shadowRoot!.querySelector('button')!;
  expect(button.getAttribute('aria-disabled')).to.equal('true');
});
```

The `.accessible()` assertion runs an axe-core audit against the rendered element.

## Unit vs Integration Boundary

- **Unit**: Single component in isolation — test its properties, events, render output.
- **Integration**: Multiple components together — test composition, slot behavior, event propagation between parent and child.
- Both run in real browsers via @web/test-runner.

## Anti-patterns

- **Using JSDOM for web component tests** — JSDOM lacks Shadow DOM and custom elements support.
- **Not awaiting `updateComplete` after property changes** — assertions run against stale DOM.
- **Testing Shadow DOM structure too tightly** — test behavior, not implementation details. Prefer checking text content, attributes, and event outcomes over exact DOM trees.
- **Not testing keyboard interactions** — web components must be keyboard-accessible.
- **Forgetting to import the component file** — the side-effect import registers the custom element; without it, `fixture()` renders an unknown element.
- **Synchronous assertions on async render cycles** — Lit rendering is asynchronous; always await before asserting.
