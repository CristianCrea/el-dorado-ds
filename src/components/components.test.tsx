import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BottomNav, Button, DayChip, FixtureCard, IconButton, ResultChip, Tabs } from '../index';

const dorado = { name: 'Dorado FC', initials: 'DF', color: '#E0A82E' };
const real = { name: 'Real Cundinamarca', initials: 'RC', color: '#1B2A4A' };

describe('Button', () => {
  it('aplica la variante y no dispara clics deshabilitado', () => {
    const onClick = vi.fn();
    render(<Button variant="secondary" disabled onClick={onClick}>Pagar</Button>);
    const button = screen.getByRole('button', { name: 'Pagar' });
    expect(button).toHaveClass('ld-button--secondary');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('IconButton', () => {
  it('expone su acción a lectores de pantalla', () => {
    render(<IconButton icon="bell" label="Notificaciones" notification />);
    expect(screen.getByRole('button', { name: 'Notificaciones' })).toBeInTheDocument();
  });
});

describe('DayChip', () => {
  it('indica el día seleccionado con aria-pressed', () => {
    render(<DayChip day="HOY" date={22} selected />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('ResultChip', () => {
  it('muestra la letra y el nombre accesible del resultado', () => {
    render(<ResultChip result="loss" />);
    expect(screen.getByText('P')).toBeInTheDocument();
    expect(screen.getByText('Perdido')).toBeInTheDocument();
  });
});

describe('Tabs', () => {
  function Example() {
    const [value, setValue] = useState('resumen');
    return (
      <Tabs
        label="Secciones del partido"
        value={value}
        onChange={setValue}
        items={[{ value: 'resumen', label: 'Resumen' }, { value: 'alineaciones', label: 'Alineaciones' }]}
      />
    );
  }

  it('cambia de pestaña con clic y con las flechas', () => {
    render(<Example />);
    const resumen = screen.getByRole('tab', { name: 'Resumen' });
    const alineaciones = screen.getByRole('tab', { name: 'Alineaciones' });
    expect(resumen).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(alineaciones);
    expect(alineaciones).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(alineaciones, { key: 'ArrowRight' });
    expect(resumen).toHaveAttribute('aria-selected', 'true');
    expect(resumen).toHaveFocus();
  });
});

describe('FixtureCard', () => {
  it('abre el partido al tocar la tarjeta o con Enter', () => {
    const onClick = vi.fn();
    render(<FixtureCard home={dorado} away={real} date="Sáb 26 sep" time="3:00 PM" venue="Estadio El Dorado" onClick={onClick} />);
    const card = screen.getByRole('button', { name: /Dorado FC contra Real Cundinamarca/ });
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('abre el equipo sin abrir el partido al tocar su nombre', () => {
    const onClick = vi.fn();
    const onTeamClick = vi.fn();
    render(<FixtureCard home={dorado} away={real} date="Sáb 26 sep" time="3:00 PM" venue="Estadio El Dorado" onClick={onClick} onTeamClick={onTeamClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Real Cundinamarca' }));
    expect(onTeamClick).toHaveBeenCalledWith('away');
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('BottomNav', () => {
  it('marca la sección actual y avisa al navegar', () => {
    const onNavigate = vi.fn();
    render(<BottomNav active="siguiendo" onNavigate={onNavigate} />);
    expect(screen.getByRole('button', { name: 'Siguiendo' })).toHaveAttribute('aria-current', 'page');
    fireEvent.click(screen.getByRole('button', { name: 'Perfil' }));
    expect(onNavigate).toHaveBeenCalledWith('perfil');
  });
});
