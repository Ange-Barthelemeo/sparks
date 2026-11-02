import { Bookmark, Image as ImageIcon, Share2, ShieldCheck, Video } from 'lucide-react';
import { kindMeta } from '../data/mock.js';
import { useStore } from '../store.jsx';
import { Scene } from './ui.jsx';

export function ActionButtons({ item, dark = false }) {
  const { bookmarks, toggleBookmark, share } = useStore();
  const saved = bookmarks.includes(item.id);
  const base = dark
    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300';
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => share(item)} aria-label="Partager" className={`flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur ${base}`}>
        <Share2 className="h-4 w-4" />
      </button>
      <button
        onClick={() => toggleBookmark(item.id)}
        aria-label="Enregistrer"
        aria-pressed={saved}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur ${base} ${saved ? '!border-brand-500 !text-brand-500' : ''}`}
      >
        <Bookmark className="h-4 w-4" fill={saved ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}

export default function NewsCard({ item }) {
  const { t } = useStore();
  const meta = kindMeta[item.kind];
  return (
    <article className="card flex flex-col overflow-hidden transition hover:-translate-y-0.5">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Scene variant={item.scene} className="h-full w-full" />
        {item.media && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-bold uppercase text-white backdrop-blur">
            {item.media === 'video' ? <Video className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
            {item.media === 'video' ? 'Vidéo' : 'Image'}
          </span>
        )}
        <span className={`absolute bottom-3 left-3 rounded-lg px-2.5 py-1 text-xs font-extrabold text-white ${meta.cls}`}>{meta.label}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600">
          <ShieldCheck className="h-4 w-4" /> {t('certified')}
        </span>
        <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{item.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <span className="text-xs text-slate-500">
            <b className="text-slate-700 dark:text-slate-200">{item.source}</b> · {item.time}
          </span>
          <ActionButtons item={item} />
        </div>
      </div>
    </article>
  );
}
