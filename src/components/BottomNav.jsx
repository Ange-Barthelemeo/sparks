import { BarChart3, Home, Phone } from 'lucide-react';
import { useStore } from '../store.jsx';

// Navigation mobile (les signets, dossiers et l'onglet rediger ont été retirés)
const items = [
  { id: 'actualites', key: 'home', Icon: Home },
  { id: 'statistiques', key: 'reports', Icon: BarChart3 },
  { id: 'contacts', key: 'contacts', Icon: Phone }
];

export default function BottomNav() {
  const { route, navigate, t } = useStore();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
      aria-label="Navigation mobile"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-3">
        {items.map(({ id, key, Icon }) => {
          const active = route === id;
          return (
            <li key={id}>
              <button
                onClick={() => navigate(id)}
                className={`flex w-full flex-col items-center gap-1 py-2.5 text-xs font-bold ${
                  active ? 'text-brand-600 dark:text-brand-300' : 'text-slate-500'
                }`}
              >
                <span className={`flex h-8 w-12 items-center justify-center rounded-full transition ${active ? 'bg-brand-100 dark:bg-brand-700/30' : ''}`}>
                  <Icon className="h-5 w-5" />
                </span>
                {t(key)}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}