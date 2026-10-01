import type { KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import { TeamBadge } from '../TeamBadge/TeamBadge';
import './FixtureCard.css';

export interface Team {
  /** Nombre visible del equipo. */
  name: string;
  /** Iniciales del escudo. */
  initials: string;
  /** Color del club. */
  color: string;
}

export interface FixtureCardProps {
  /** Figma: Local. */
  home: Team;
  /** Figma: Visitante. */
  away: Team;
  /** Figma: Fecha ("Sáb 26 sep"). */
  date: string;
  /** Figma: Hora ("3:00 PM"). */
  time: string;
  /** Figma: Estadio. */
  venue: string;
  /** Al tocar la tarjeta (abre el detalle del partido). */
  onClick?: () => void;
  /** Al tocar el nombre de un equipo (abre la ficha del club). */
  onTeamClick?: (side: 'home' | 'away') => void;
  className?: string;
}

/** Tarjeta de partido: fecha, hora, estadio y enfrentamiento. */
export function FixtureCard({ home, away, date, time, venue, onClick, onTeamClick, className }: FixtureCardProps) {
  const interactive = Boolean(onClick);
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick?.(); }
  };

  const teamName = (team: Team, side: 'home' | 'away') =>
    onTeamClick ? (
      <button
        type="button"
        className="ld-fixture-card__team-name ld-reset-button ld-focusable"
        onClick={(event) => { event.stopPropagation(); onTeamClick(side); }}
      >
        {team.name}
      </button>
    ) : (
      <span className="ld-fixture-card__team-name">{team.name}</span>
    );

  return (
    <article
      className={cx('ld-fixture-card', interactive && 'ld-fixture-card--interactive', interactive && 'ld-focusable', className)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${home.name} contra ${away.name}, ${date}, ${time}, ${venue}`}
      onClick={onClick}
      onKeyDown={interactive ? onKeyDown : undefined}
    >
      <div className="ld-fixture-card__meta">
        <div>
          <span className="ld-fixture-card__date">{date}</span>
          <span className="ld-fixture-card__time ld-tabular">{time}</span>
        </div>
        <span className="ld-fixture-card__venue">{venue}</span>
      </div>
      <hr className="ld-fixture-card__divider" />
      <div className="ld-fixture-card__matchup">
        <div className="ld-fixture-card__team">
          <TeamBadge initials={home.initials} color={home.color} />
          {teamName(home, 'home')}
        </div>
        <span className="ld-fixture-card__vs" aria-hidden="true">VS</span>
        <div className="ld-fixture-card__team ld-fixture-card__team--away">
          {teamName(away, 'away')}
          <TeamBadge initials={away.initials} color={away.color} />
        </div>
      </div>
    </article>
  );
}
