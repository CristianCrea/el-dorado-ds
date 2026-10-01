import type { Meta, StoryObj } from '@storybook/react-vite';

const GROUPS: Array<[string, string[]]> = [
  ['Background', ['background-primary', 'background-secondary', 'background-tertiary', 'background-inverse', 'background-brand', 'background-brand-subtle', 'background-spotlight']],
  ['Text', ['text-primary', 'text-secondary', 'text-tertiary', 'text-disabled', 'text-inverse', 'text-brand', 'text-on-brand']],
  ['CTA', ['cta-primary-default', 'cta-primary-hover', 'cta-primary-pressed', 'cta-secondary-default', 'cta-secondary-hover', 'cta-disabled-default']],
  ['Outline', ['outline-default', 'outline-subtle', 'outline-strong', 'outline-brand', 'outline-focus']],
  ['Icon', ['icon-primary', 'icon-secondary', 'icon-disabled', 'icon-brand']],
  ['Semantic', ['semantic-success-solid', 'semantic-error-solid', 'semantic-warning-solid', 'semantic-info-solid', 'semantic-success-background', 'semantic-error-background', 'semantic-warning-background', 'semantic-info-background']],
];

function Palette() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {GROUPS.map(([group, tokens]) => (
        <section key={group}>
          <h2 className="ld-text-heading-section" style={{ margin: '0 0 12px', textTransform: 'uppercase' }}>{group}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12 }}>
            {tokens.map((token) => (
              <div key={token} style={{ border: '1px solid var(--outline-default)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <div style={{ height: 56, background: `var(--${token})` }} />
                <code style={{ display: 'block', padding: '8px 10px', fontSize: 11, color: 'var(--text-secondary)' }}>--{token}</code>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: 'Fundamentos/Colores',
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Tokens de color de la colección **Tokens** de Figma. Cambia el tema en la barra superior para ver el modo oscuro.' } },
  },
} satisfies Meta;

export default meta;
export const Tokens: StoryObj = { render: () => <Palette /> };
