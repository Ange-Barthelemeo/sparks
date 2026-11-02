import { ChevronDown, MapPin, Moon, PenLine, Sun, Wifi, WifiOff } from 'lucide-react';
import { useStore } from '../store.jsx';
import { Logo } from './ui.jsx';

const tabs = [
  { id: 'actualites', key: 'news' },
  { id: 'statistiques', key: 'stats' },
  { id: 'contacts', key: 'contacts' }
  // L'onglet 'rediger' a été retiré ici d'ici du menu principal
];

export function LangSelect() {
  const { lang, setLang } = useStore();
  return (
    <label className="chip relative !gap-1 !pr-8">
      <span className="sr-only">Langue</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="cursor-pointer appearance-none bg-transparent pr-1 font-bold uppercase focus:outline-none"
      >
        <option value="mg">MG</option>
        <option value="fr">FR</option>
        <option value="en">EN</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4" />
    </label>
  );
}

export default function Header() {
  const { route, navigate, t, online, dark, setDark } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6">
        <Logo />

        <nav className="hidden h-full items-stretch gap-1 lg:flex" aria-label="Navigation principale">
          {tabs.map((tab) => {
            const active = route === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.id)}
                className={`relative px-4 text-[15px] font-semibold transition ${
                  active ? 'text-brand-600 dark:text-brand-300' : 'text-slate-600 hover:text-ink dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {t(tab.key)}
                {active && <span className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-brand-500" />}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="chip hidden md:inline-flex">
            <MapPin className="h-4 w-4 text-brand-600" /> Analamanga
          </span>
          <span className={`chip ${online ? '' : '!border-amber-300 !text-amber-700'}`}>
            {online ? <Wifi className="h-4 w-4 text-emerald-500" /> : <WifiOff className="h-4 w-4 text-amber-500" />}
            <span className="hidden sm:inline">{online ? t('online') : t('offline')}</span>
          </span>
          <LangSelect />
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Mode sombre">
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="btn-primary hidden !py-2.5 sm:inline-flex" onClick={() => navigate('rediger')}>
            <PenLine className="h-4 w-4" /> {t('write')}
          </button>
          <button className="btn-primary !p-0 h-10 w-10 sm:hidden" onClick={() => navigate('rediger')} aria-label={t('write')}>
            <PenLine className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}