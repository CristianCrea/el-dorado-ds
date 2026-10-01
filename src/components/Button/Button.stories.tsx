import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { iconNames } from '../Icon/Icon';
import { describe } from '../../stories/figma';

const meta = {
  title: 'Componentes/Button',
  component: Button,
  parameters: { layout: 'padded', ...describe('Botón de acción. Primario para la acción principal; Secundario para acciones de apoyo.', 'button') },
  args: { children: 'Seguir', variant: 'primary', icon: 'plus' },
  argTypes: { icon: { control: 'select', options: [undefined, ...iconNames] } },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primario: Story = {};
export const Secundario: Story = { args: { variant: 'secondary', children: 'Volver al inicio', icon: 'home' } };
export const Deshabilitado: Story = { args: { disabled: true } };
export const AnchoCompleto: Story = { args: { fullWidth: true, children: 'Comprar boleta', icon: 'ticket' } };

export const Todos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, max-content)' }}>
      <Button icon="plus">Seguir</Button>
      <Button variant="secondary" icon="home">Volver al inicio</Button>
      <Button disabled icon="plus">Seguir</Button>
      <Button icon="ticket">Comprar boleta</Button>
      <Button variant="secondary">Explorar equipos</Button>
      <Button icon="lock">Pagar</Button>
    </div>
  ),
};
