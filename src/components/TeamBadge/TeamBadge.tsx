import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './TeamBadge.css';

export type TeamBadgeSize = 'sm' | 'md' | 'lg';

export interface TeamBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma: Iniciales. También sirve para el dorsal de un jugador. */
  initials: string;
  /** Color del club. Es identidad del equipo, por eso no sale de los tokens del tema. */
  color?: string;
  /** Figma: Tamaño (S 28 px · M 40 px · L 80 px con borde de marca). */
  size?: TeamBadgeSize;
  /** Nombre del equipo para lectores de pantalla. Sin valor, el escudo es decorativo. */
  teamName?: string;
}

/** Escudo circular de un equipo con sus iniciales. */
export function TeamBadge({ initials, color, size = 'sm', teamName, className, style, ...rest }: TeamBadgeProps) {
  return (
    <span
      className={cx('ld-team-badge', `ld-team-badge--${size}`, className)}
      style={{ ...(color ? { '--ld-team-color': color } : null), ...style } as CSSProperties}
      role={teamName ? 'img' : undefined}
      aria-label={teamName}
      aria-hidden={teamName ? undefined : true}
      {...rest}
    >
      {initials}
    </span>
  );
}
