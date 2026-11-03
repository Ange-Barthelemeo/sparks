import { useRef, useState } from 'react';
import { CheckCircle2, Loader2, Paperclip, Search, ShieldCheck, Sparkles, X, AlertTriangle } from 'lucide-react';
import { useStore } from '../store.jsx';

// Vérification simulée (démo) : branchez ici votre API IA plus tard.
function fakeVerify(text) {
  const suspicious = /(50 victimes|fermeture|gratuit|urgent|partagez|exclusif)/i.test(text);
  return suspicious
    ? { ok: false, score: 18, label: 'Probablement faux', detail: 'Aucune source officielle ne confirme cette information. Elle ressemble à une rumeur déjà démentie.' }
    : { ok: true, score: 87, label: 'Plutôt fiable', detail: '3 sources officielles concordantes (BNGRC, ministères concernés, Météo Madagascar).' };
}

export default function VerifyBox() {
  const { t } = useStore();
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(true);
  const fileRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(fakeVerify(text));
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="card relative overflow-hidden border-brand-200/70 bg-gradient-to-br from-white to-brand-50/60 p-4 dark:from-slate-900 dark:to-slate-900 sm:p-6">
      <div className="flex gap-4">
        <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 sm:flex dark:bg-brand-700/30 dark:text-brand-200">
          <Sparkles className="h-7 w-7" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-3">
            <h2 className="text-base font-bold">{t('verifyTitle')}</h2>
            <p className="text-xs text-slate-500">{t('verifyHint')}</p>
          </div>

          {open && (
            <form onSubmit={submit} className="space-y-3">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  placeholder={t('verifyPlaceholder')}
                  className="field !pr-4 sm:!pr-40"
                />
                <button type="submit" disabled={loading || (!text.trim() && !file)} className="btn-primary mt-3 w-full sm:absolute sm:inset-y-3 sm:right-3 sm:mt-0 sm:w-auto">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} {t('verify')}
                </button>
              </div>

              {file && (
                <span className="chip">
                  <Paperclip className="h-4 w-4" /> {file.name}
                  <button type="button" onClick={() => setFile(null)} aria-label="Retirer">
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
            </form>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> {t('private')}
              </span>
              <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1.5 font-bold text-brand-600">
                <Paperclip className="h-4 w-4" /> {t('addMedia')}
              </button>
              <input ref={fileRef} type="file" accept="image/*,video/*" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
            <button type="button" onClick={() => setOpen(!open)} className="font-bold text-brand-600">
              {open ? t('reduce') : t('expand')}
            </button>
          </div>

          {result && (
            <div className={`animate-pop mt-4 flex gap-3 rounded-2xl border p-4 ${result.ok ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20' : 'border-red-200 bg-red-50 dark:bg-red-900/20'}`}>
              {result.ok ? <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" /> : <AlertTriangle className="h-6 w-6 shrink-0 text-red-600" />}
              <div>
                <p className="font-bold">
                  {result.label} · Score IA {result.score}%
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{result.detail}</p>
                <p className="mt-1 text-xs text-slate-500">Analyse de démonstration.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
