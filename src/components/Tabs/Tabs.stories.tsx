import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import { describe } from '../../stories/figma';

const meta = {
  title: 'Componentes/Tabs',
  component: Tabs,
  parameters: { layout: 'padded', ...describe('Selector segmentado de pestañas. Se navega con las flechas del teclado.', 'tab') },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({ items, label }: { items: Array<{ value: string; label: string }>; label: string }) {
  const [value, setValue] = useState(items[0].value);
  return <div style={{ maxWidth: 335 }}><Tabs items={items} value={value} onChange={setValue} label={label} /></div>;
}

export const Club: Story = {
  args: { items: [], value: '', onChange: () => {}, label: '' },
  render: () => <Example label="Secciones del club" items={[{ value: 'info', label: 'Info del club' }, { value: 'proximos', label: 'Próximos partidos' }]} />,
};
export const Partido: Story = {
  args: { items: [], value: '', onChange: () => {}, label: '' },
  render: () => <Example label="Secciones del partido" items={[{ value: 'resumen', label: 'Resumen' }, { value: 'alineaciones', label: 'Alineaciones' }]} />,
};
