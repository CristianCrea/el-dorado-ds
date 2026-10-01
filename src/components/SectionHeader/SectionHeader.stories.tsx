import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';
import { describe } from '../../stories/figma';

const meta = {
  title: 'Componentes/SectionHeader',
  component: SectionHeader,
  parameters: { layout: 'padded', ...describe('Encabezado de sección con enlace opcional.', 'sectionHeader') },
  args: { title: 'Próximos encuentros', linkLabel: 'Ver todos' },
  decorators: [(Story) => <div style={{ maxWidth: 335 }}><Story /></div>],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConEnlace: Story = {};
export const SinEnlace: Story = { args: { title: 'Historia', linkLabel: undefined } };
