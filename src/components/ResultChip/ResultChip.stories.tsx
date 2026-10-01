import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResultChip } from './ResultChip';
import { describe } from '../../stories/figma';

const meta = {
  title: 'Componentes/ResultChip',
  component: ResultChip,
  parameters: { layout: 'padded', ...describe('Resultado de un partido en la racha de un equipo o en el historial.', 'resultChip') },
  args: { result: 'win' },
} satisfies Meta<typeof ResultChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ganado: Story = {};
export const Empate: Story = { args: { result: 'draw' } };
export const Perdido: Story = { args: { result: 'loss' } };
export const Racha: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 6 }}>
      {(['win', 'win', 'draw', 'win', 'loss'] as const).map((r, i) => <ResultChip key={i} result={r} />)}
    </div>
  ),
};
