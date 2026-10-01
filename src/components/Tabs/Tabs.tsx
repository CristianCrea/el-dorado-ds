import { useRef, type KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import './Tabs.css';

export interface TabItem<T extends string = string> {
  /** Identificador de la pestaña. */
  value: T;
  /** Figma: Label. */
  label: string;
}

export interface TabsProps<T extends string = string> {
  /** Pestañas en orden (Figma: instancias de Tab dentro del selector). */
  items: TabItem<T>[];
  /** Pestaña activa (Figma: Estado = Activo). */
  value: T;
  onChange: (value: T) => void;
  /** Nombre del grupo para lectores de pantalla. */
  label: string;
  /** Prefijo para los id de los paneles: cada pestaña controla `${idPrefix}-panel-${value}`. */
  idPrefix?: string;
  className?: string;
}

/** Selector segmentado de pestañas (Info del club / Próximos partidos, Resumen / Alineaciones). */
export function Tabs<T extends string>({ items, value, onChange, label, idPrefix = 'ld-tabs', className }: TabsProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = items.findIndex((item) => item.value === value);
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : delta ? (current + delta + items.length) % items.length : -1;
    if (target < 0) return;
    event.preventDefault();
    onChange(items[target].value);
    refs.current[target]?.focus();
  }

  return (
    <div role="tablist" aria-label={label} className={cx('ld-tabs', className)} onKeyDown={onKeyDown}>
      {items.map((item, index) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => { refs.current[index] = el; }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${item.value}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${item.value}`}
            tabIndex={selected ? 0 : -1}
            className={cx('ld-tabs__tab', selected && 'ld-tabs__tab--active', 'ld-focusable')}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
