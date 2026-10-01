import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Icon, type IconName } from '../Icon/Icon';
import './IconButton.css';

export type IconButtonVariant = 'tonal' | 'on-color';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma: Ícono. */
  icon: IconName;
  /** Texto accesible obligatorio: describe la acción ("Volver", "Notificaciones"). */
  label: string;
  /** Figma: Estilo (Tonal / Sobre color). Usa `on-color` sobre cabeceras con color de club. */
  variant?: IconButtonVariant;
  /** Figma: Notificación. Muestra el punto rojo. */
  notification?: boolean;
}

/** Botón circular con ícono. */
export function IconButton({ icon, label, variant = 'tonal', notification, className, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cx('ld-icon-button', `ld-icon-button--${variant}`, 'ld-focusable', className)}
      {...rest}
    >
      <Icon name={icon} size={20} />
      {notification && <span className="ld-icon-button__dot" aria-hidden="true" />}
    </button>
  );
}
