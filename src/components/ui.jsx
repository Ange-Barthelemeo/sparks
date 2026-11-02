import { Star } from 'lucide-react';
import { useStore } from '../store.jsx';

export function Logo({ compact = false }) {
  const { t } = useStore();
  return (
    <a href="#/actualites" className="flex items-center gap-3">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-glow">
        <Star className="h-6 w-6" fill="currentColor" strokeWidth={1.5} />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-base font-extrabold">
            Madagascar <span className="text-brand-500">Cheky</span>
          </span>
          <span className="hidden text-xs font-semibold text-slate-500 dark:text-slate-400 sm:block">{t('tagline')}</span>
        </span>
      )}
    </a>
  );
}

// Illustrations SVG embarquées : fonctionnent hors ligne (aucune image distante)
export function Scene({ variant = 'village', className = '' }) {
  const palettes = {
    village: ['#1f2a37', '#3b4a5c', '#8a6a4b'],
    city: ['#7dd3fc', '#e0f2fe', '#f87171'],
    crowd: ['#fbbf77', '#fde7c0', '#92400e'],
    road: ['#86efac', '#dcfce7', '#a16207']
  };
  const [a, b, c] = palettes[variant] || palettes.village;
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#sky-${variant})`} />
      {variant === 'city' && (
        <g>
          {[20, 70, 120, 180, 240, 300, 350].map((x, i) => (
            <rect key={x} x={x} y={110 - (i % 3) * 20} width="42" height={130 + (i % 3) * 20} fill={i % 2 ? '#fef3c7' : '#fecaca'} />
          ))}
          <rect y="200" width="400" height="40" fill="#15803d" />
        </g>
      )}
      {variant === 'village' && (
        <g>
          <path d="M40 170 L120 110 L200 170 Z" fill={c} />
          <rect x="55" y="170" width="130" height="60" fill="#5b4636" />
          <path d="M230 180 L300 130 L370 180 Z" fill="#9ca3af" />
          <rect x="240" y="180" width="120" height="50" fill="#475569" />
          <rect y="225" width="400" height="15" fill="#0f172a" opacity=".6" />
        </g>
      )}
      {variant === 'crowd' && (
        <g>
          <rect y="130" width="400" height="110" fill="#c2764a" />
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={10 + (i % 20) * 20} cy={170 + Math.floor(i / 20) * 26} r="9" fill={['#1e293b', '#7c2d12', '#be123c', '#0f766e'][i % 4]} />
          ))}
          <rect x="260" y="80" width="110" height="60" fill="#fff" opacity=".85" />
        </g>
      )}
      {variant === 'road' && (
        <g>
          <path d="M150 240 L190 90 L220 90 L290 240 Z" fill={c} opacity=".85" />
          <circle cx="60" cy="150" r="60" fill="#16a34a" />
          <circle cx="350" cy="140" r="70" fill="#15803d" />
        </g>
      )}
    </svg>
  );
}

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 lg:bottom-8" role="status">
      <div className="animate-pop rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white shadow-xl dark:bg-white dark:text-ink">
        {toast}
      </div>
    </div>
  );
}
