import { useMemo, useState } from 'react';
import { Building2, CloudSun, HeartPulse, Phone, Search, Shield, Siren } from 'lucide-react';
import { contacts } from '../data/mock.js';
import { useStore } from '../store.jsx';

const icons = { siren: Siren, shield: Shield, building: Building2, heart: HeartPulse, weather: CloudSun };

export default function Contacts() {
  const { t } = useStore();
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return contacts.filter((c) => !s || [c.name, c.cat, c.desc, c.phone].some((v) => v.toLowerCase().includes(s)));
  }, [q]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-28 pt-8 sm:px-6 lg:pb-16 lg:pt-12">
      <p className="eyebrow">{t('services')}</p>
      <h1 className="page-title mt-3">{t('contactsTitle')}</h1>
      <p className="mt-3 text-base text-slate-500 sm:text-lg">{t('contactsSub')}</p>

      <div className="card mt-8 flex items-center gap-3 px-5 py-3">
        <Search className="h-5 w-5 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('searchService')} className="w-full bg-transparent py-1.5 text-sm placeholder:text-slate-400 focus:outline-none" />
        <span className="whitespace-nowrap text-xs text-slate-400">
          {list.length} {t('results')}
        </span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {list.map((c) => {
          const Icon = icons[c.icon];
          return (
            <article key={c.id} className="card flex items-center gap-4 p-5 sm:p-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-brand-600 dark:bg-sky-900/30">
                <Icon className="h-7 w-7" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold tracking-wide text-brand-600">{c.cat}</p>
                <h3 className="truncate text-lg font-bold">{c.name}</h3>
                <p className="text-xs text-slate-500">{c.desc}</p>
                <p className="mt-2 text-sm font-bold">{c.phone}</p>
              </div>
              <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="btn-ghost !border-0 !bg-sky-50 !px-4 !py-3 !text-brand-600 dark:!bg-sky-900/30">
                <Phone className="h-4 w-4" /> {t('call')}
              </a>
            </article>
          );
        })}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-slate-500">Aucun résultat.</p>}
    </div>
  );
}
