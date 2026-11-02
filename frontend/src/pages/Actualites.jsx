import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Languages, Radio, ShieldCheck, Siren } from 'lucide-react';
import { heroSlides, kindMeta, news } from '../data/mock.js';
import { useStore } from '../store.jsx';
import VerifyBox from '../components/VerifyBox.jsx';
import NewsCard, { ActionButtons } from '../components/NewsCard.jsx';
import { Scene } from '../components/ui.jsx';
import { LangSelect } from '../components/Header.jsx';

function Hero({ slides }) {
  const { t } = useStore();
  const [i, setI] = useState(0);
  const s = slides[i % slides.length];

  useEffect(() => {
    setI(0);
  }, [slides]);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setI((x) => (x + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, [slides]);

  if (!s) return null;
  return (
    <article className="relative isolate overflow-hidden rounded-[2rem] bg-slate-900 text-white shadow-soft">
      <Scene variant={s.scene} className="absolute inset-0 -z-10 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
      <div className="flex min-h-[380px] flex-col justify-end gap-4 p-6 sm:min-h-[460px] sm:p-10">
        <div className="flex flex-wrap gap-2">
          {s.official && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-extrabold">
              <Siren className="h-3.5 w-3.5" /> {t('official')}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-extrabold">
            <ShieldCheck className="h-3.5 w-3.5" /> {t('certified')}
          </span>
        </div>
        <h2 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{s.title}</h2>
        <p className="max-w-2xl text-base text-white/85">{s.excerpt}</p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-white/80">
            <b className="text-white">{s.source}</b> · {s.time}
          </span>
          <div className="flex items-center gap-2">
            <ActionButtons item={s} dark />
            <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-ink hover:bg-slate-100">
              {t('readArticle')} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setI((i - 1 + slides.length) % slides.length)} aria-label="Précédent" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25">
            <ChevronLeft className="h-5 w-5" />
          </button>
          {slides.map((x, idx) => (
            <button key={x.id} onClick={() => setI(idx)} aria-label={`Diapositive ${idx + 1}`} className={`h-2 rounded-full transition-all ${idx === i % slides.length ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
          ))}
          <button onClick={() => setI((i + 1) % slides.length)} aria-label="Suivant" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Actualites() {
  const { t } = useStore();
  const [tab, setTab] = useState('all');
  const [expanded, setExpanded] = useState(false);

  const tabs = [
    { id: 'all', label: t('forYou') },
    { id: 'urgent', label: t('urgent') },
    { id: 'fact', label: t('factCheck') }
  ];

  const filteredNews = useMemo(() => (tab === 'all' ? news : news.filter((n) => n.kind === tab)), [tab]);
  const slides = useMemo(() => (tab === 'all' ? heroSlides : heroSlides.filter((h) => h.kind === tab)), [tab]);
  const visible = expanded ? filteredNews : filteredNews.slice(0, 3);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-28 pt-8 sm:px-6 lg:pb-16 lg:pt-12">
      <div className="relative">
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-extrabold tracking-wider text-red-600">
          <Radio className="h-4 w-4" /> {t('live')}
        </p>
        <h1 className="page-title max-w-3xl">{t('heroTitle')}</h1>
        <p className="mt-3 text-base text-slate-500 dark:text-slate-400 sm:text-lg">{t('heroSub')}</p>
        <div className="mt-4 flex items-center gap-2 sm:absolute sm:right-0 sm:top-0 sm:mt-0">
          <Languages className="hidden h-5 w-5 text-slate-500 sm:block" />
          <span className="hidden sm:block">
            <LangSelect />
          </span>
        </div>
      </div>

      <div className="mt-8">
        <VerifyBox />
      </div>

      <section className="mt-12" aria-labelledby="une">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="une" className="text-3xl font-bold">
              {t('topStories')}
            </h2>
            <p className="mt-1 text-xs text-slate-500">{t('updated')}</p>
          </div>
          <div className="flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800" role="tablist">
            {tabs.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={tab === x.id}
                onClick={() => {
                  setTab(x.id);
                  setExpanded(false);
                }}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  tab === x.id ? 'bg-white text-brand-600 shadow-sm dark:bg-slate-900 dark:text-brand-300' : 'text-slate-500'
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>

        {slides.length > 0 && <Hero slides={slides} />}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>

        {filteredNews.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button className="btn-ghost !px-5 !py-3 !text-sm" onClick={() => setExpanded(!expanded)}>
              {expanded ? t('less') : t('more')}
              <ChevronDown className={`h-4 w-4 transition ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
