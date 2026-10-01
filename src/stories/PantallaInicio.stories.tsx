import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomNav, DayChip, FixtureCard, IconButton, Icon, SectionHeader, type BottomNavSection, type Team } from '../index';
import { figmaUrl } from './figma';

const T: Record<string, Team> = {
  DF: { name: 'Dorado FC', initials: 'DF', color: '#E0A82E' },
  RC: { name: 'Real Cundinamarca', initials: 'RC', color: '#1B2A4A' },
  AA: { name: 'Atlético Andino', initials: 'AA', color: '#C0392B' },
  SU: { name: 'Sabana United', initials: 'SU', color: '#1A8A8A' },
  BS: { name: 'Boyacá Star', initials: 'BS', color: '#6C3FA0' },
  LF: { name: 'Llanos FC', initials: 'LF', color: '#D2691E' },
  CS: { name: 'Cordillera SC', initials: 'CS', color: '#2E7D4F' },
  PU: { name: 'Pacífico United', initials: 'PU', color: '#2563AB' },
};
const FIXTURES = [
  { home: T.DF, away: T.RC, date: 'Sáb 26 sep', time: '3:00 PM', venue: 'Estadio El Dorado' },
  { home: T.AA, away: T.SU, date: 'Sáb 26 sep', time: '5:30 PM', venue: 'Estadio La Sabana' },
  { home: T.BS, away: T.LF, date: 'Dom 27 sep', time: '2:00 PM', venue: 'Alto Chicamocha' },
  { home: T.CS, away: T.PU, date: 'Dom 27 sep', time: '4:30 PM', venue: 'Estadio Pacífico' },
];
const DAYS: Array<[string, number]> = [['HOY', 22], ['MIÉ', 23], ['JUE', 24], ['VIE', 25], ['SÁB', 26]];

function Inicio() {
  const [day, setDay] = useState(22);
  const [section, setSection] = useState<BottomNavSection>('inicio');
  return (
    <div style={{ width: 375, margin: '0 auto', border: '1px solid var(--outline-default)', borderRadius: 28, overflow: 'hidden', background: 'var(--background-primary)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)', background: 'var(--background-brand)', color: 'var(--text-on-brand)', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: 14 }}>LD</span>
          <span className="ld-text-title-brand">LIGA EL DORADO</span>
        </div>
        <IconButton icon="bell" label="Notificaciones" notification />
      </header>
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 20px' }}>
        {DAYS.map(([d, n]) => <DayChip key={n} day={d} date={n} selected={day === n} onClick={() => setDay(n)} />)}
        <button type="button" aria-label="Abrir calendario" className="ld-focusable" style={{ width: 46, border: 0, borderRadius: 'var(--radius-md)', background: 'var(--background-tertiary)', color: 'var(--icon-primary)', display: 'grid', placeItems: 'center' }}>
          <Icon name="calendar" size={18} />
        </button>
      </div>
      <main style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 20px 24px' }}>
        <SectionHeader title="Próximos encuentros" linkLabel="Ver todos" />
        {FIXTURES.map((f) => <FixtureCard key={f.home.initials + f.away.initials} {...f} onClick={() => {}} onTeamClick={() => {}} />)}
      </main>
      <BottomNav active={section} onNavigate={setSection} />
    </div>
  );
}

const meta = {
  title: 'Pantallas/Inicio',
  parameters: {
    layout: 'padded',
    docs: { description: { component: `Pantalla de Inicio armada solo con componentes de la librería. [Ver en Figma](${figmaUrl('screenHome')})` } },
  },
} satisfies Meta;

export default meta;
export const ProximosEncuentros: StoryObj = { render: () => <Inicio /> };
