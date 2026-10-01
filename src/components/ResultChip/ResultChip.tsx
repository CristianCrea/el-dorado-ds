import { cx } from '../../utils/cx';
import './ResultChip.css';

export type MatchResult = 'win' | 'draw' | 'loss';

const LABELS: Record<MatchResult, { letter: string; name: string }> = {
  win: { letter: 'G', name: 'Ganado' },
  draw: { letter: 'E', name: 'Empate' },
  loss: { letter: 'P', name: 'Perdido' },
};

export interface ResultChipProps {
  /** Figma: Resultado (Ganado / Empate / Perdido). */
  result: MatchResult;
  className?: string;
}

/** Resultado de un partido (G / E / P) en rachas e historiales. */
export function ResultChip({ result, className }: ResultChipProps) {
  const { letter, name } = LABELS[result];
  return (
    <span className={cx('ld-result-chip', `ld-result-chip--${result}`, className)} title={name}>
      <span aria-hidden="true">{letter}</span>
      <span className="ld-visually-hidden">{name}</span>
    </span>
  );
}
