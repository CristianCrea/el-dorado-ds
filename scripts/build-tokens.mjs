// Genera src/styles/tokens.css a partir de tokens/dtcg/ con Style Dictionary.
//  - :root                → primitivas, espaciado, radios y tokens del modo claro
//  - [data-theme="dark"]  → solo los tokens que cambian en modo oscuro
//  - .ld-text-*           → clases de los estilos de texto de Figma
// Uso: npm run tokens:build
import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dtcg = (file) => join(root, 'tokens/dtcg', file);
const tmp = (file) => join(root, 'node_modules/.cache/ld-tokens', file);

const isSource = (token) => token.isSource;

async function build(source, include, file, selector) {
  const sd = new StyleDictionary({
    usesDtcg: true,
    log: { verbosity: 'silent', warnings: 'disabled' },
    include,
    source,
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: dirname(tmp(file)) + '/',
        files: [{
          destination: file,
          format: 'css/variables',
          filter: include.length ? isSource : undefined,
          options: { selector, outputReferences: true, showFileHeader: false },
        }],
      },
    },
  });
  await sd.buildAllPlatforms();
  return readFileSync(tmp(file), 'utf8').trim();
}

const light = await build(
  [dtcg('primitives.json'), dtcg('spacing.json'), dtcg('semantic.light.json')], [], 'light.css', ':root',
);
const dark = await build([dtcg('semantic.dark.json')], [dtcg('primitives.json')], 'dark.css', '[data-theme="dark"]');

const typography = JSON.parse(readFileSync(dtcg('typography.json'), 'utf8')).typography;
const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');
const classes = [];
for (const [group, styles] of Object.entries(typography)) {
  for (const [name, { $value: v }] of Object.entries(styles)) {
    classes.push(`.ld-text-${slug(group)}-${slug(name)} {\n  font-family: var(--ld-font-family);\n  font-weight: ${v.fontWeight};\n  font-size: ${v.fontSize};\n  line-height: ${v.lineHeight};\n  letter-spacing: ${v.letterSpacing};\n}`);
  }
}

const css = `/**
 * Liga El Dorado · tokens de diseño
 * Archivo generado por scripts/build-tokens.mjs a partir de las variables de Figma.
 * No lo edites a mano: cambia la variable en Figma, exporta y ejecuta npm run tokens.
 */
${light.replace(':root {', ':root {\n  --ld-font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;')}

${dark.replace('[data-theme="dark"] {', '[data-theme="dark"] {\n  color-scheme: dark;')}

${classes.join('\n\n')}
`;
writeFileSync(join(root, 'src/styles/tokens.css'), css);
console.log('src/styles/tokens.css generado');
