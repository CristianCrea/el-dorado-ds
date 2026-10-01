/** Enlaces a los componentes en el archivo de Figma de Liga El Dorado. */
const FILE = 'https://www.figma.com/design/O72IfV29ZUupkthYAASwE7/Liga-el-dorado';

export const figmaNodes = {
  icons: '12-3',
  button: '14-34',
  iconButton: '14-46',
  teamBadge: '13-11',
  resultChip: '13-27',
  dayChip: '13-19',
  tab: '14-52',
  sectionHeader: '15-14',
  fixtureCard: '15-42',
  bottomNav: '15-290',
  screenHome: '16-2',
} as const;

export const figmaUrl = (node: keyof typeof figmaNodes) => `${FILE}?node-id=${figmaNodes[node]}`;

/** Texto para la documentación de cada componente, con el enlace a Figma. */
export const describe = (text: string, node: keyof typeof figmaNodes) => ({
  docs: { description: { component: `${text}\n\n[Ver en Figma](${figmaUrl(node)})` } },
});
