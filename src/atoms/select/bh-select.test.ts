import { html } from 'lit';
import { fixture, expect, oneEvent } from '@open-wc/testing';
import type { BhSelect } from './bh-select.js';
import './bh-select.js';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('bh-select', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options}></bh-select>`);
    expect(el.size).to.equal('md');
    expect(el.disabled).to.equal(false);
  });

  it('renders options from property', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options}></bh-select>`);
    const opts = el.shadowRoot!.querySelectorAll('option:not([disabled])');
    expect(opts.length).to.equal(3);
    expect(opts[0].textContent).to.equal('Option A');
  });

  it('renders placeholder option', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options} placeholder="Choose..."></bh-select>`);
    const placeholder = el.shadowRoot!.querySelector('option[disabled]');
    expect(placeholder).to.exist;
    expect(placeholder!.textContent).to.equal('Choose...');
  });

  it('reflects disabled attribute', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options} disabled></bh-select>`);
    const select = el.shadowRoot!.querySelector('select')!;
    expect(select.disabled).to.equal(true);
  });

  it('fires bh-change on selection', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options}></bh-select>`);
    const select = el.shadowRoot!.querySelector('select')!;

    setTimeout(() => {
      select.value = 'b';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'bh-change');
    expect(event.detail.value).to.equal('b');
  });

  it('updates value on change', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options}></bh-select>`);
    const select = el.shadowRoot!.querySelector('select')!;
    select.value = 'b';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    expect(el.value).to.equal('b');
  });

  it('exposes wrapper CSS part', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options}></bh-select>`);
    expect(el.shadowRoot!.querySelector('[part="wrapper"]')).to.exist;
  });

  it('exposes select CSS part', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options}></bh-select>`);
    expect(el.shadowRoot!.querySelector('[part="select"]')).to.exist;
  });

  it('renders chevron indicator', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options}></bh-select>`);
    expect(el.shadowRoot!.querySelector('.chevron svg')).to.exist;
  });

  it('reflects error attribute', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options} error></bh-select>`);
    const select = el.shadowRoot!.querySelector('select')!;
    expect(select.getAttribute('aria-invalid')).to.equal('true');
  });

  it('renders option groups', async () => {
    const groups = [
      { label: 'Fruits', options: [{ value: 'apple', label: 'Apple' }] },
      { label: 'Vegs', options: [{ value: 'carrot', label: 'Carrot' }] },
    ];
    const el = await fixture<BhSelect>(html`<bh-select .optionGroups=${groups}></bh-select>`);
    const optgroups = el.shadowRoot!.querySelectorAll('optgroup');
    expect(optgroups.length).to.equal(2);
    expect(optgroups[0].label).to.equal('Fruits');
  });

  it('selects option matching value', async () => {
    const el = await fixture<BhSelect>(html`<bh-select .options=${options} value="b"></bh-select>`);
    const selected = el.shadowRoot!.querySelector('option[selected]') as HTMLOptionElement;
    expect(selected).to.exist;
    expect(selected.value).to.equal('b');
  });
});
