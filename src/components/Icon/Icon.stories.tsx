import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, iconNames } from './Icon';
import { describe } from '../../stories/figma';

const meta = {
  title: 'Fundamentos/Iconos',
  component: Icon,
  parameters: { layout: 'padded', ...describe('Íconos de línea de 24 px. Toman el color del texto que los rodea.', 'icons') },
  args: { name: 'bell', size: 24 },
  argTypes: { name: { control: 'select', options: iconNames } },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uno: Story = {};
export const Todos: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 16 }}>
      {iconNames.map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--icon-primary)' }}>
          <Icon name={name} size={24} />
          <code style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};
