import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/styles/tokens.css';
import '../src/styles/base.css';

/** Aplica el modo claro u oscuro elegido en la barra de Storybook. */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? 'dark' : 'light';
  return (
    <div
      data-theme={theme}
      className="ld-root"
      style={{ background: 'var(--background-primary)', padding: 24, minHeight: context.viewMode === 'docs' ? undefined : '100vh', boxSizing: 'border-box' }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Modo de color (colección Tokens de Figma)',
      toolbar: {
        title: 'Tema',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro' },
          { value: 'dark', title: 'Oscuro' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default preview;
