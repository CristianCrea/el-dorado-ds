# Liga El Dorado · Sistema de diseño

Tokens, componentes React y documentación (Storybook) de la app de la Liga El Dorado. Todo sale de los componentes y variables del archivo de Figma.

- **Storybook:** https://cristiancrea.github.io/el-dorado-ds/
- **Figma:** [Liga El Dorado](https://www.figma.com/design/O72IfV29ZUupkthYAASwE7/Liga-el-dorado) (página *Componentes*)
- **Prototipo:** https://cristiancrea.github.io/liga-el-dorado/

## Qué incluye

| Carpeta | Contenido |
|---|---|
| `tokens/figma-export.json` | Variables de Figma (Primitivos, Tokens claro/oscuro, Espaciado) y estilos de texto. |
| `tokens/dtcg/` | Los mismos tokens en formato estándar [DTCG](https://www.designtokens.org/), generados. |
| `src/styles/tokens.css` | Variables CSS generadas con Style Dictionary, con los mismos nombres que el *code syntax* de Figma (`--cta-primary-default`, `--spacing-16`…). |
| `src/components/` | Componentes React + TypeScript, cada uno con sus historias de Storybook. |
| `figma-map.json` | Relación entre cada componente de Figma y el de código, con la equivalencia de propiedades. |

Componentes disponibles: `Icon`, `Button`, `IconButton`, `TeamBadge`, `ResultChip`, `DayChip`, `Tabs`, `SectionHeader`, `FixtureCard` y `BottomNav`. La lista de los que faltan está en `figma-map.json` → `pending`.

## Uso en una app

```bash
npm install github:CristianCrea/el-dorado-ds
```

```tsx
import '@liga-el-dorado/ds/styles.css';
import { Button, FixtureCard } from '@liga-el-dorado/ds';

export function Ejemplo() {
  return (
    <div data-theme="light"> {/* o "dark" */}
      <Button icon="ticket">Comprar boleta</Button>
    </div>
  );
}
```

- El modo oscuro se activa con `data-theme="dark"` en cualquier contenedor (normalmente `<html>`).
- La fuente es **Inter**; cárgala en la app (por ejemplo desde Google Fonts).

## Trabajar en el repositorio

Requiere Node 22.

```bash
npm install
npm run storybook        # Storybook en http://localhost:6006
npm test                 # pruebas
npm run build            # librería en dist/
```

### Actualizar los tokens desde Figma

1. Cambia la variable en Figma (colecciones *Primitivos*, *Tokens* o *Espaciado*).
2. Exporta las variables a `tokens/figma-export.json` con el mismo formato.
3. Ejecuta `npm run tokens`. Se regeneran `tokens/dtcg/` y `src/styles/tokens.css`.
4. Abre un pull request. La CI falla si los archivos generados no coinciden con el export.

## Relación con Figma

El plan de Figma es Professional, así que la conexión se hace sin Code Connect:

- **`figma-map.json`**: cada componente con su nodo de Figma y la equivalencia de propiedades (por ejemplo *Estilo = Primario* → `variant="primary"`).
- **Storybook → Figma**: cada página de documentación tiene el enlace "Ver en Figma".
- **Figma → Storybook**: cada componente de la página *Componentes* (y cada ícono) tiene:
  - un **enlace de documentación** a su página de Storybook, visible al inspeccionar el componente y en Dev Mode;
  - una **descripción** con el ejemplo de código React y la equivalencia de propiedades Figma → código, visible en el panel lateral y en el panel de Assets.
- **Nombres de variables**: los tokens CSS usan los mismos nombres que muestra Dev Mode en Figma.

## Publicación

- **CI** (`.github/workflows/ci.yml`): en cada pull request revisa los tokens, los tipos, las pruebas y las dos compilaciones.
- **Storybook** (`.github/workflows/storybook.yml`): se publica en GitHub Pages cada vez que algo llega a `main`. En *Settings → Pages*, la fuente debe ser **GitHub Actions**.
