import { useEffect, useMemo, useState } from 'react';
import { 
  ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Languages, Radio, 
  Search, ShieldCheck, Siren, PenTool, X, Copy, Share2, Sparkles 
} from 'lucide-react';
import { heroSlides, news } from '../data/mock.js';
import { useStore } from '../store.jsx';
import VerifyBox from '../components/VerifyBox.jsx';
import NewsCard, { ActionButtons } from '../components/NewsCard.jsx';
import { Scene } from '../components/ui.jsx';
import { LangSelect } from '../components/Header.jsx';

function ArticleReaderModal({ article, onClose, onAutoWrite }) {
  const { t } = useStore();
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${article.title}\n\n${article.excerpt || article.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* Barre d'outils supérieure */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" /> {t('certified') || 'Certifié IA'}
            </span>
            {article.official && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-600 dark:text-red-400">
                <Siren className="h-3.5 w-3.5" /> {t('official') || 'Officiel'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy} 
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              title="Copier le texte"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button 
              onClick={onClose} 
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Corps de l'article - Mode lecture épuré */}
        <div className="overflow-y-auto p-6 sm:p-10">
          <div className="mb-4 text-xs font-semibold text-slate-400">
            <span>{article.source}</span> · <span>{article.time}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            {article.title}
          </h1>
          <div className="prose prose-slate dark:prose-invert max-w-none text-base leading-relaxed text-slate-700 dark:text-slate-300">
            <p className="font-medium text-lg text-slate-600 dark:text-slate-400 mb-6">
              {article.excerpt}
            </p>
            <p className="mb-4">
              {article.content || "L'Analyse de l'IA confirme la véracité des informations transmises à travers les canaux officiels et les dépêches certifiées. Les éléments factuels ont été recoupés auprès de multiples sources gouvernementales et institutionnelles."}
            </p>
          </div>
        </div>

        {/* Pied de page avec bouton Rédaction Automatique */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/50">
          <span className="text-xs text-slate-500">
            Proposer une réécriture basée sur cette source ?
          </span>
          <button
            onClick={() => onAutoWrite(article)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-brand-700"
          >
            <Sparkles className="h-4 w-4" />
            Rédiger un article automatique
          </button>
        </div>

      </div>
    </div>
  );
}

function Hero({ slides, onRead, onAutoWrite }) {
  const { t } = useStore();
  const [i, setI] = useState(0);
  const s = slides[i % slides.length];

  useEffect(() => { setI(0); }, [slides]);
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
            <button 
              onClick={() => onAutoWrite(s)}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-bold text-white hover:bg-brand-700"
            >
              <Sparkles className="h-4 w-4" /> Rédiger
            </button>
            <button 
              onClick={() => onRead(s)}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-ink hover:bg-slate-100"
            >
              {t('readArticle') || 'Lire'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setI((i - 1 + slides.length) % slides.length)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25">
            <ChevronLeft className="h-5 w-5" />
          </button>
          {slides.map((x, idx) => (
            <button key={x.id} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i % slides.length ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
          ))}
          <button onClick={() => setI((i + 1) % slides.length)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Actualites() {
  const { t, navigate } = useStore();
  const [tab, setTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [readingArticle, setReadingArticle] = useState(null);

  const tabs = [
    { id: 'all', label: t('forYou') },
    { id: 'urgent', label: t('urgent') },
    { id: 'fact', label: t('factCheck') }
  ];

  const filteredNews = useMemo(() => {
    let result = tab === 'all' ? news : news.filter((n) => n.kind === tab);
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.source.toLowerCase().includes(q)
      );
    }
    return result;
  }, [tab, searchQuery]);

  const slides = useMemo(() => (tab === 'all' ? heroSlides : heroSlides.filter((h) => h.kind === tab)), [tab]);
  const visible = expanded ? filteredNews : filteredNews.slice(0, 3);

  // Redirection automatique vers le module de rédaction avec les données de l'article
  const handleAutoWrite = (item) => {
    setReadingArticle(null);
    navigate('rediger', { sourceArticle: item });
  };

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
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="une" className="text-3xl font-bold">{t('topStories')}</h2>
            <p className="mt-1 text-xs text-slate-500">{t('updated')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une actualité..."
                className="rounded-2xl border border-slate-200 bg-slate-50/80 py-2.5 pl-9 pr-4 text-xs font-medium text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 sm:w-64"
              />
            </div>

            <div className="flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800" role="tablist">
              {tabs.map((x) => (
                <button
                  key={x.id}
                  role="tab"
                  aria-selected={tab === x.id}
                  onClick={() => { setTab(x.id); setExpanded(false); }}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    tab === x.id ? 'bg-white text-brand-600 shadow-sm dark:bg-slate-900 dark:text-brand-300' : 'text-slate-500'
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {slides.length > 0 && searchQuery === '' && (
          <Hero 
            slides={slides} 
            onRead={(item) => setReadingArticle(item)} 
            onAutoWrite={handleAutoWrite} 
          />
        )}

        {filteredNews.length === 0 ? (
          <div className="my-16 rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
            <p className="text-base font-semibold text-slate-500">Aucune actualité ne correspond à votre recherche.</p>
            <button
              onClick={() => { setSearchQuery(''); setTab('all'); }}
              className="mt-4 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow hover:bg-brand-600"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((n) => (
              <div 
                key={n.id} 
                onClick={() => setReadingArticle(n)}
                className="cursor-pointer transition transform hover:-translate-y-1"
              >
                <NewsCard item={n} />
              </div>
            ))}
          </div>
        )}

        {filteredNews.length > 3 && !searchQuery && (
          <div className="mt-8 flex justify-center">
            <button className="btn-ghost !px-5 !py-3 !text-sm" onClick={() => setExpanded(!expanded)}>
              {expanded ? t('less') : t('more')}
              <ChevronDown className={`h-4 w-4 transition ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </section>

      {/* Modal de Lecture de l'Article */}
      <ArticleReaderModal 
        article={readingArticle} 
        onClose={() => setReadingArticle(null)} 
        onAutoWrite={handleAutoWrite}
      />
    </div>
  );
}