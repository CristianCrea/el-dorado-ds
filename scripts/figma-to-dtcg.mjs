// Convierte tokens/figma-export.json (variables y estilos de texto de Figma)
// en archivos con formato estándar DTCG dentro de tokens/dtcg/.
// Uso: npm run tokens:convert
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const exportFile = JSON.parse(readFileSync(join(root, 'tokens/figma-export.json'), 'utf8'));
const outDir = join(root, 'tokens/dtcg');
mkdirSync(outDir, { recursive: true });

const PRIMITIVE_GROUP = 'color';

function setPath(obj, path, value) {
  let node = obj;
  path.slice(0, -1).forEach((key) => { node = node[key] ??= {}; });
  node[path[path.length - 1]] = value;
}

// "{Neutral/950}" (alias de Figma) -> "{color.Neutral.950}" (referencia DTCG)
function convertValue(value) {
  if (typeof value === 'string' && value.startsWith('{')) {
    return `{${PRIMITIVE_GROUP}.${value.slice(1, -1).split('/').join('.')}}`;
  }
  return value;
}

function collectionToDtcg(collection, mode, { prefix = [], type }) {
  const out = {};
  for (const [name, variable] of Object.entries(collection.vars)) {
    const $type = type ?? (variable.type === 'COLOR' ? 'color' : 'dimension');
    let $value = convertValue(variable.values[mode]);
    if ($type === 'dimension' && typeof $value === 'number') $value = `${$value}px`;
    setPath(out, [...prefix, ...name.split('/')], { $type, $value });
  }
  return out;
}

const { Primitivos, Tokens, Espaciado } = exportFile.collections;
const write = (file, data) => writeFileSync(join(outDir, file), JSON.stringify(data, null, 2) + '\n');

write('primitives.json', collectionToDtcg(Primitivos, 'Value', { prefix: [PRIMITIVE_GROUP] }));
write('spacing.json', collectionToDtcg(Espaciado, 'Value', {}));
write('semantic.light.json', collectionToDtcg(Tokens, 'Light', {}));
write('semantic.dark.json', collectionToDtcg(Tokens, 'Dark', {}));

const WEIGHTS = { Thin: 100, 'Extra Light': 200, Light: 300, Regular: 400, Medium: 500, 'Semi Bold': 600, Bold: 700, 'Extra Bold': 800, Black: 900 };
const typography = {};
for (const style of exportFile.textStyles) {
  const lineHeight = style.lineHeight.unit === 'PERCENT' ? +(style.lineHeight.value / 100).toFixed(3)
    : style.lineHeight.unit === 'PIXELS' ? `${style.lineHeight.value}px` : 'normal';
  setPath(typography, ['typography', ...style.name.split('/')], {
    $type: 'typography',
    $value: {
      fontFamily: style.family,
      fontWeight: WEIGHTS[style.style] ?? 400,
      fontSize: `${style.size}px`,
      lineHeight,
      letterSpacing: `${+(style.letterSpacing.value).toFixed(2)}px`,
    },
  });
}
write('typography.json', typography);
console.log('Tokens DTCG generados en tokens/dtcg/');
