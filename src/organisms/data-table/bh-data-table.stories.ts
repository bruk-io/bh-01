import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-data-table.js';
import type { DataTableColumn } from './bh-data-table.js';

const columns: DataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
];

const rows = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'Inactive' },
  { name: 'David Brown', email: 'david@example.com', role: 'User', status: 'Active' },
  { name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
  { name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'Inactive' },
  { name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active' },
];

const meta: Meta = {
  title: 'Organisms/DataTable',
  component: 'bh-data-table',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
    },
    density: {
      control: 'select',
      options: ['compact', 'default', 'comfortable'],
    },
    stickyHeader: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    density: 'default',
    stickyHeader: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <bh-data-table
      variant=${args.variant}
      density=${args.density}
      ?sticky-header=${args.stickyHeader}
      .columns=${columns}
      .rows=${rows}
    ></bh-data-table>
  `,
};

export const Sortable: Story = {
  render: () => html`
    <bh-data-table
      .columns=${columns}
      .rows=${rows}
      @bh-sort=${(e: CustomEvent) => console.log('Sort:', e.detail)}
    ></bh-data-table>
    <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--bh-color-text-muted);">
      Click column headers to sort. Click Name, Email, or Role to sort ascending, descending, or reset.
    </p>
  `,
};

export const StripedSortable: Story = {
  render: () => html`
    <bh-data-table
      variant="striped"
      .columns=${columns}
      .rows=${rows}
    ></bh-data-table>
  `,
};

export const BorderedCompact: Story = {
  render: () => html`
    <bh-data-table
      variant="bordered"
      density="compact"
      .columns=${columns}
      .rows=${rows}
    ></bh-data-table>
  `,
};

export const WithNumericSort: Story = {
  render: () => {
    const cols: DataTableColumn[] = [
      { key: 'product', label: 'Product', sortable: true },
      { key: 'quantity', label: 'Qty', align: 'center', sortable: true },
      { key: 'price', label: 'Unit Price', align: 'end', sortable: true },
      { key: 'total', label: 'Total', align: 'end', sortable: true },
    ];
    const data = [
      { product: 'Widget A', quantity: 10, price: 9.99, total: 99.90 },
      { product: 'Widget B', quantity: 25, price: 14.99, total: 374.75 },
      { product: 'Widget C', quantity: 5, price: 29.99, total: 149.95 },
      { product: 'Widget D', quantity: 100, price: 4.99, total: 499.00 },
      { product: 'Widget E', quantity: 2, price: 199.99, total: 399.98 },
    ];
    return html`
      <bh-data-table variant="striped" .columns=${cols} .rows=${data}></bh-data-table>
    `;
  },
};
