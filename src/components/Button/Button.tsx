import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon, type IconName } from '../Icon/Icon';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Estilo (Primario / Secundario). */
  variant?: ButtonVariant;
  /** Figma: Ícono + Mostrar ícono. Sin valor, el botón no muestra ícono. */
  icon?: IconName;
  /** Ocupa todo el ancho disponible. */
  fullWidth?: boolean;
  /** Figma: Label. */
  children: ReactNode;
}

/**
 * Botón de acción. Primario (dorado) para la acción principal de la pantalla;
 * Secundario (negro en claro, blanco en oscuro) para acciones de apoyo.
 * Los estados Hover, Pressed y Disabled de Figma se resuelven con CSS y el atributo `disabled`.
 */
export function Button({ variant = 'primary', icon, fullWidth, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cx('ld-button', `ld-button--${variant}`, fullWidth && 'ld-button--full', 'ld-focusable', className)}
      {...rest}
    >
      {icon && <Icon name={icon} size={16} />}
      <span>{children}</span>
    </button>
  );
}
