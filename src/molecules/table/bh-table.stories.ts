import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './bh-table.js';
import type { TableColumn } from './bh-table.js';

const columns: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

const rows = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'Inactive' },
  { name: 'David Brown', email: 'david@example.com', role: 'User', status: 'Active' },
  { name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
];

const meta: Meta = {
  title: 'Molecules/Table',
  component: 'bh-table',
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
    <bh-table
      variant=${args.variant}
      density=${args.density}
      ?sticky-header=${args.stickyHeader}
      .columns=${columns}
      .rows=${rows}
    ></bh-table>
  `,
};

export const Striped: Story = {
  args: { variant: 'striped' },
  render: (args) => html`
    <bh-table
      variant=${args.variant}
      .columns=${columns}
      .rows=${rows}
    ></bh-table>
  `,
};

export const Bordered: Story = {
  args: { variant: 'bordered' },
  render: (args) => html`
    <bh-table
      variant=${args.variant}
      .columns=${columns}
      .rows=${rows}
    ></bh-table>
  `,
};

export const Compact: Story = {
  args: { density: 'compact' },
  render: (args) => html`
    <bh-table
      density=${args.density}
      variant="striped"
      .columns=${columns}
      .rows=${rows}
    ></bh-table>
  `,
};

export const Comfortable: Story = {
  args: { density: 'comfortable' },
  render: (args) => html`
    <bh-table
      density=${args.density}
      .columns=${columns}
      .rows=${rows}
    ></bh-table>
  `,
};

export const WithAlignment: Story = {
  render: () => {
    const cols: TableColumn[] = [
      { key: 'item', label: 'Item' },
      { key: 'qty', label: 'Qty', align: 'center' },
      { key: 'price', label: 'Price', align: 'end' },
    ];
    const data = [
      { item: 'Widget A', qty: 10, price: '$9.99' },
      { item: 'Widget B', qty: 25, price: '$14.99' },
      { item: 'Widget C', qty: 5, price: '$29.99' },
    ];
    return html`
      <bh-table variant="bordered" .columns=${cols} .rows=${data}></bh-table>
    `;
  },
};

export const WithColumnWidths: Story = {
  render: () => {
    const cols: TableColumn[] = [
      { key: 'id', label: 'ID', width: '60px' },
      { key: 'name', label: 'Name', width: '200px' },
      { key: 'description', label: 'Description' },
    ];
    const data = [
      { id: 1, name: 'First Item', description: 'A longer description that takes up the remaining space.' },
      { id: 2, name: 'Second Item', description: 'Another description for the second row.' },
    ];
    return html`
      <bh-table .columns=${cols} .rows=${data}></bh-table>
    `;
  },
};
