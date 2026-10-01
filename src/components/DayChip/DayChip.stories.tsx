import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayChip } from './DayChip';
import { describe } from '../../stories/figma';

const meta = {
  title: 'Componentes/DayChip',
  component: DayChip,
  parameters: { layout: 'padded', ...describe('Selector de día del calendario de partidos.', 'dayChip') },
  args: { day: 'HOY', date: 22, selected: false },
} satisfies Meta<typeof DayChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Seleccionado: Story = { args: { selected: true } };

const DAYS: Array<[string, number]> = [['HOY', 22], ['MIÉ', 23], ['JUE', 24], ['VIE', 25], ['SÁB', 26]];
function Selector() {
  const [selected, setSelected] = useState(22);
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {DAYS.map(([day, date]) => <DayChip key={date} day={day} date={date} selected={selected === date} onClick={() => setSelected(date)} />)}
    </div>
  );
}
export const Semana: Story = { render: () => <Selector /> };
