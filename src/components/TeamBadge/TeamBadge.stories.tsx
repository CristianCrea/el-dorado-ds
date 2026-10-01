import type { Meta, StoryObj } from '@storybook/react-vite';
import { TeamBadge } from './TeamBadge';
import { describe } from '../../stories/figma';

const meta = {
  title: 'Componentes/TeamBadge',
  component: TeamBadge,
  parameters: { layout: 'padded', ...describe('Escudo de un equipo. El color es el del club y no cambia con el tema.', 'teamBadge') },
  args: { initials: 'SU', color: '#1A8A8A', size: 'sm' },
  argTypes: { color: { control: 'color' } },
} satisfies Meta<typeof TeamBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pequeno: Story = {};
export const Mediano: Story = { args: { size: 'md', initials: 'DF', color: '#E0A82E' } };
export const Grande: Story = { args: { size: 'lg', initials: 'RC', color: '#1B2A4A' } };

const TEAMS = [['DF', '#E0A82E'], ['RC', '#1B2A4A'], ['AA', '#C0392B'], ['SU', '#1A8A8A'], ['BS', '#6C3FA0'], ['LF', '#D2691E'], ['CS', '#2E7D4F'], ['PU', '#2563AB']];
export const LosOchoEquipos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {TEAMS.map(([initials, color]) => <TeamBadge key={initials} initials={initials} color={color} size="md" />)}
    </div>
  ),
};
