import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './DayChip.css';

export interface DayChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma: Día (HOY, MIÉ, JUE…). */
  day: string;
  /** Figma: Fecha (número del día). */
  date: string | number;
  /** Figma: Estado = Seleccionado. */
  selected?: boolean;
}

/** Selector de día del calendario de partidos. */
export function DayChip({ day, date, selected = false, className, type = 'button', ...rest }: DayChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cx('ld-day-chip', selected && 'ld-day-chip--selected', 'ld-focusable', className)}
      {...rest}
    >
      <span className="ld-day-chip__day">{day}</span>
      <span className="ld-day-chip__date ld-tabular">{date}</span>
    </button>
  );
}
