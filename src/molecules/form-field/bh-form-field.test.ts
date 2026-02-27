import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { BhFormField } from './bh-form-field.js';
import './bh-form-field.js';
import '../../atoms/input/bh-input.js';

describe('bh-form-field', () => {
  it('renders with default props', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field><bh-input></bh-input></bh-form-field>
    `);
    expect(el.label).to.equal('');
    expect(el.helpText).to.equal('');
    expect(el.error).to.equal('');
    expect(el.required).to.equal(false);
  });

  it('renders label text', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field label="Email"><bh-input></bh-input></bh-form-field>
    `);
    const label = el.shadowRoot!.querySelector('label')!;
    expect(label.textContent!.trim()).to.equal('Email');
  });

  it('renders required marker when required', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field label="Email" required><bh-input></bh-input></bh-form-field>
    `);
    const marker = el.shadowRoot!.querySelector('.required-marker');
    expect(marker).to.exist;
    expect(marker!.textContent).to.equal('*');
  });

  it('does not render label when not provided', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field><bh-input></bh-input></bh-form-field>
    `);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).to.not.exist;
  });

  it('renders help text', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field help-text="Enter your email address"><bh-input></bh-input></bh-form-field>
    `);
    const help = el.shadowRoot!.querySelector('.help-text');
    expect(help).to.exist;
    expect(help!.textContent).to.equal('Enter your email address');
  });

  it('renders error text', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field error="This field is required"><bh-input></bh-input></bh-form-field>
    `);
    const error = el.shadowRoot!.querySelector('.error');
    expect(error).to.exist;
    expect(error!.textContent).to.equal('This field is required');
    expect(error!.getAttribute('role')).to.equal('alert');
  });

  it('hides help text when error is present', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field help-text="Help" error="Error"><bh-input></bh-input></bh-form-field>
    `);
    const help = el.shadowRoot!.querySelector('.help-text');
    const error = el.shadowRoot!.querySelector('.error');
    expect(help).to.not.exist;
    expect(error).to.exist;
  });

  it('sets aria-labelledby on slotted control', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field label="Email"><bh-input></bh-input></bh-form-field>
    `);
    await el.updateComplete;
    const input = el.querySelector('bh-input')!;
    expect(input.getAttribute('aria-labelledby')).to.match(/bh-ff-\d+-label/);
  });

  it('sets aria-describedby to help text', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field help-text="Help text"><bh-input></bh-input></bh-form-field>
    `);
    await el.updateComplete;
    const input = el.querySelector('bh-input')!;
    expect(input.getAttribute('aria-describedby')).to.match(/bh-ff-\d+-help/);
  });

  it('sets aria-describedby to error when error present', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field help-text="Help" error="Error"><bh-input></bh-input></bh-form-field>
    `);
    await el.updateComplete;
    const input = el.querySelector('bh-input')!;
    expect(input.getAttribute('aria-describedby')).to.match(/bh-ff-\d+-error/);
  });

  it('sets aria-invalid when error present', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field error="Error"><bh-input></bh-input></bh-form-field>
    `);
    await el.updateComplete;
    const input = el.querySelector('bh-input')!;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
  });

  it('removes aria-invalid when no error', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field><bh-input></bh-input></bh-form-field>
    `);
    await el.updateComplete;
    const input = el.querySelector('bh-input')!;
    expect(input.hasAttribute('aria-invalid')).to.equal(false);
  });

  it('sets aria-required on control when required', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field label="Name" required><bh-input></bh-input></bh-form-field>
    `);
    await el.updateComplete;
    const input = el.querySelector('bh-input')!;
    expect(input.getAttribute('aria-required')).to.equal('true');
  });

  it('exposes field CSS part', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field><bh-input></bh-input></bh-form-field>
    `);
    const field = el.shadowRoot!.querySelector('[part="field"]');
    expect(field).to.exist;
  });

  it('exposes label CSS part', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field label="Name"><bh-input></bh-input></bh-form-field>
    `);
    const label = el.shadowRoot!.querySelector('[part="label"]');
    expect(label).to.exist;
  });

  it('exposes help-text CSS part', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field help-text="Help"><bh-input></bh-input></bh-form-field>
    `);
    const help = el.shadowRoot!.querySelector('[part="help-text"]');
    expect(help).to.exist;
  });

  it('exposes error CSS part', async () => {
    const el = await fixture<BhFormField>(html`
      <bh-form-field error="Error"><bh-input></bh-input></bh-form-field>
    `);
    const error = el.shadowRoot!.querySelector('[part="error"]');
    expect(error).to.exist;
  });
});
