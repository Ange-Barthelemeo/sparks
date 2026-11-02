import { useState } from 'react';
import { ArrowRight, ChevronDown, Clock, Map as MapIcon, ShieldCheck, Siren, Sparkles, TrendingUp, X, Check } from 'lucide-react';
import { statsBySubject, subjects } from '../data/mock.js';
import { useStore } from '../store.jsx';

function Kpi({ Icon, tone, label, value, foot, children }) {
  const tones = {
    blue: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30',
    green: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'
  };
  const blobs = { blue: 'bg-sky-100', red: 'bg-red-100', green: 'bg-emerald-100' };
  return (
    <div className="card relative overflow-hidden p-6">
      <div className="flex items-start justify-between">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tones[tone]}`}>
          <Icon className="h-6 w-6" />
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-slate-400">{children}</span>
      </div>
      <p className="mt-5 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-5xl font-extrabold tracking-tight">{value}</p>
      <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
        <TrendingUp className="h-4 w-4" /> {foot}
      </p>
      <span className={`absolute -bottom-10 -right-8 h-32 w-32 rounded-full opacity-60 dark:opacity-20 ${blobs[tone]}`} />
    </div>
  );
}

export default function Statistiques() {
  const { t } = useStore();
  const [subject, setSubject] = useState('all');
  const [period, setPeriod] = useState('week');
  const d = statsBySubject[subject];
  const levelColor = { Élevé: 'text-red-500', Modéré: 'text-amber-500', Faible: 'text-emerald-500' };

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-28 pt-8 sm:px-6 lg:pb-16 lg:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{t('observatory')}</p>
          <h1 className="page-title mt-3">{t('statsTitle')}</h1>
          <p className="mt-3 text-base text-slate-500 sm:text-lg">{t('statsSub')}</p>
        </div>
        <label className="w-full sm:w-64">
          <span className="mb-1.5 block text-xs font-bold uppercase text-slate-500">{t('subject')}</span>
          <span className="relative block">
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="field cursor-pointer appearance-none !pr-10 font-semibold">
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          </span>
        </label>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Kpi Icon={ShieldCheck} tone="blue" label="Taux de fiabilité global" value={`${d.kpis.reliability}%`} foot={d.kpis.trend}>
          Analysé par l'IA
        </Kpi>
        <Kpi Icon={Siren} tone="red" label="Infox virales interceptées" value={d.kpis.viral} foot="mise à jour en direct">
          Analysé par l'IA
        </Kpi>
        <Kpi Icon={Clock} tone="green" label="Temps moyen de démenti IA" value={`${d.kpis.minutes} min`} foot="assisté par Cheky IA">
          &nbsp;
        </Kpi>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <section className="card p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-brand-600">
                <Sparkles className="h-4 w-4" /> Analyse IA
              </p>
              <h2 className="mt-3 text-2xl font-bold">Vérité vs Infox</h2>
            </div>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="field !w-auto cursor-pointer !py-2 text-xs font-semibold">
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </select>
          </div>

          <div className="mt-6 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-3xl bg-red-50 p-5 dark:bg-red-950/30">
              <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-red-600">
                <X className="h-4 w-4" /> Rumeur virale
              </p>
              <p className="mt-4 text-3xl font-extrabold text-red-800 dark:text-red-300">{d.versus.rumor}</p>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{d.versus.shares}</p>
              <span className="mt-4 inline-block rounded-lg bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">Capture non sourcée</span>
            </div>
            <span className="text-center text-xs font-extrabold text-slate-400">VS</span>
            <div className="rounded-3xl bg-emerald-50 p-5 dark:bg-emerald-950/30">
              <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-emerald-700">
                <Check className="h-4 w-4" /> Bilan officiel
              </p>
              <p className="mt-4 text-3xl font-extrabold text-emerald-800 dark:text-emerald-300">{d.versus.official}</p>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{d.versus.by}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" /> Source certifiée
              </span>
            </div>
          </div>
        </section>

        <section className="card p-6">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-brand-600">
            <MapIcon className="h-4 w-4" /> Baromètre régional
          </p>
          <h2 className="mt-3 text-2xl font-bold">Intensité des rumeurs</h2>
          <ul className="mt-6 space-y-5">
            {d.regions.map((r) => (
              <li key={r.name} className="grid grid-cols-[110px_1fr_28px] items-center gap-3 sm:grid-cols-[140px_1fr_32px]">
                <div>
                  <p className="text-sm font-bold">{r.name}</p>
                  <p className={`text-xs font-semibold ${levelColor[r.level]}`}>{r.level}</p>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-300 to-brand-600 transition-all duration-700" style={{ width: `${r.value}%` }} />
                </div>
                <span className="text-right text-sm font-bold text-slate-600 dark:text-slate-300">{r.value}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card mt-5 flex flex-wrap items-center gap-5 bg-gradient-to-r from-white to-brand-50/60 p-6 dark:from-slate-900 dark:to-slate-900">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white">
          <Sparkles className="h-7 w-7" />
        </span>
        <div className="min-w-[220px] flex-1">
          <p className="text-xs font-bold uppercase text-brand-600">
            Insight & tendance · {subjects.find((s) => s.id === subject).label}
          </p>
          <p className="mt-1 text-xl font-semibold">{d.insight}</p>
          <p className="mt-1 text-xs text-slate-500">Cette synthèse est générée à partir des vérifications, signalements et sources officielles des sept derniers jours.</p>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-bold text-brand-600">
          Voir l'analyse complète <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
}
