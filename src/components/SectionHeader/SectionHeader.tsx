import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import './SectionHeader.css';

export interface SectionHeaderProps {
  /** Figma: Título. */
  title: string;
  /** Figma: Link. Sin valor se oculta (Mostrar link = false). */
  linkLabel?: string;
  onLinkClick?: () => void;
  /** Nivel del encabezado para la estructura de la página. */
  as?: 'h2' | 'h3';
  className?: string;
}

/** Encabezado de sección con enlace opcional ("Ver todos"). */
export function SectionHeader({ title, linkLabel, onLinkClick, as: Heading = 'h2', className }: SectionHeaderProps) {
  return (
    <div className={cx('ld-section-header', className)}>
      <Heading className="ld-section-header__title">{title}</Heading>
      {linkLabel && (
        <button type="button" className="ld-section-header__link ld-reset-button ld-focusable" onClick={onLinkClick}>
          {linkLabel}
          <Icon name="chevron-right" size={16} />
        </button>
      )}
    </div>
  );
}
