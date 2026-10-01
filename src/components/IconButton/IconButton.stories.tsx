import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { iconNames } from '../Icon/Icon';
import { describe } from '../../stories/figma';

const meta = {
  title: 'Componentes/IconButton',
  component: IconButton,
  parameters: { layout: 'padded', ...describe('Botón circular con ícono. Usa `on-color` sobre cabeceras con el color de un club.', 'iconButton') },
  args: { icon: 'bell', label: 'Notificaciones', variant: 'tonal', notification: false },
  argTypes: { icon: { control: 'select', options: iconNames } },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tonal: Story = {};
export const ConNotificacion: Story = { args: { notification: true } };
export const SobreColor: Story = {
  args: { variant: 'on-color', icon: 'chevron-left', label: 'Volver' },
  decorators: [(Story) => <div style={{ background: '#1A8A8A', padding: 16, borderRadius: 14, display: 'inline-block' }}><Story /></div>],
};
