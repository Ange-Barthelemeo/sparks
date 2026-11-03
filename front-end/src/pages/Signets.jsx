import { Bookmark } from 'lucide-react';
import { heroSlides, news } from '../data/mock.js';
import { useStore } from '../store.jsx';
import NewsCard from '../components/NewsCard.jsx';

export default function Signets() {
  const { bookmarks, t } = useStore();
  const all = [...news, ...heroSlides.map((h) => ({ ...h, media: null }))];
  const seen = new Set();
  const items = all.filter((n) => bookmarks.includes(n.id) && !seen.has(n.id) && seen.add(n.id));

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-28 pt-8 sm:px-6 lg:pt-12">
      <p className="eyebrow">{t('saved')}</p>
      <h1 className="page-title mt-2">{t('saved')}</h1>
      {items.length === 0 ? (
        <div className="card mt-8 flex flex-col items-center gap-3 p-12 text-center text-slate-500">
          <Bookmark className="h-10 w-10" />
          <p>Aucun article enregistré pour le moment. Ils restent disponibles hors ligne.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      )}
    </div>
  );
}
