import { cx } from '../../utils/cx';
import { Icon, type IconName } from '../Icon/Icon';
import './BottomNav.css';

export type BottomNavSection = 'inicio' | 'siguiendo' | 'perfil';

const ITEMS: Array<{ value: BottomNavSection; label: string; icon: IconName }> = [
  { value: 'inicio', label: 'Inicio', icon: 'home' },
  { value: 'siguiendo', label: 'Siguiendo', icon: 'star' },
  { value: 'perfil', label: 'Perfil', icon: 'user' },
];

export interface BottomNavProps {
  /** Figma: Activo (Inicio / Siguiendo / Perfil). */
  active: BottomNavSection;
  onNavigate?: (section: BottomNavSection) => void;
  className?: string;
}

/** Barra de navegación inferior con las 3 secciones de la app. */
export function BottomNav({ active, onNavigate, className }: BottomNavProps) {
  return (
    <nav className={cx('ld-bottom-nav', className)} aria-label="Navegación principal">
      {ITEMS.map((item) => {
        const current = item.value === active;
        return (
          <button
            key={item.value}
            type="button"
            aria-current={current ? 'page' : undefined}
            className={cx('ld-bottom-nav__item', current && 'ld-bottom-nav__item--active', 'ld-focusable')}
            onClick={() => onNavigate?.(item.value)}
          >
            <Icon name={item.icon} size={20} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
