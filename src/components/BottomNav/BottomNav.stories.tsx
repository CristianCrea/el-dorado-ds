import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomNav, type BottomNavSection } from './BottomNav';
import { describe } from '../../stories/figma';

const meta = {
  title: 'Componentes/BottomNav',
  component: BottomNav,
  parameters: { layout: 'padded', ...describe('Barra de navegación inferior: Inicio, Siguiendo y Perfil.', 'bottomNav') },
  args: { active: 'inicio' },
  decorators: [(Story) => <div style={{ maxWidth: 375 }}><Story /></div>],
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inicio: Story = {};
export const Siguiendo: Story = { args: { active: 'siguiendo' } };
export const Perfil: Story = { args: { active: 'perfil' } };

function Interactive() {
  const [active, setActive] = useState<BottomNavSection>('inicio');
  return <BottomNav active={active} onNavigate={setActive} />;
}
export const Interactiva: Story = { render: () => <Interactive /> };
