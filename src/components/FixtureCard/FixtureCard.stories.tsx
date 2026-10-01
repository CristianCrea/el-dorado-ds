import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FixtureCard } from './FixtureCard';
import { describe } from '../../stories/figma';

const meta = {
  title: 'Componentes/FixtureCard',
  component: FixtureCard,
  parameters: { layout: 'padded', ...describe('Tarjeta de partido. Tocar la tarjeta abre el detalle; tocar un equipo abre su ficha.', 'fixtureCard') },
  args: {
    home: { name: 'Dorado FC', initials: 'DF', color: '#E0A82E' },
    away: { name: 'Real Cundinamarca', initials: 'RC', color: '#1B2A4A' },
    date: 'Sáb 26 sep',
    time: '3:00 PM',
    venue: 'Estadio El Dorado',
    onClick: fn(),
    onTeamClick: fn(),
  },
  decorators: [(Story) => <div style={{ maxWidth: 335 }}><Story /></div>],
} satisfies Meta<typeof FixtureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NombresCortos: Story = {
  args: {
    home: { name: 'Boyacá Star', initials: 'BS', color: '#6C3FA0' },
    away: { name: 'Llanos FC', initials: 'LF', color: '#D2691E' },
    date: 'Dom 27 sep', time: '2:00 PM', venue: 'Alto Chicamocha',
  },
};
export const SoloLectura: Story = { args: { onClick: undefined, onTeamClick: undefined } };
