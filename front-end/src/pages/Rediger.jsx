import { useEffect, useRef, useState } from 'react';
import { FilePenLine, FileText, Folder, History, MessageSquare, MoreHorizontal, PenLine, Paperclip, Plus, Send, ShieldCheck, Sparkles, Trash2, Loader2, X, Menu, Download, BookOpen, Copy, Check } from 'lucide-react';
import { initialDrafts, initialFolders, initialHistory, kindMeta, news } from '../data/mock.js';
import { useStore } from '../store.jsx';
import { Scene } from '../components/ui.jsx';

function Sidebar({ view, setView, drafts, folders, setFolders, activeFolder, setActiveFolder, onNew, isOpen, setIsOpen }) {
  const { t } = useStore();
  const [menu, setMenu] = useState(null);

  const item = (id, Icon, label, badge) => (
    <button
      key={id}
      onClick={() => {
        setView(id);
        setActiveFolder(null);
        setIsOpen(false);
      }}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
        view === id && !activeFolder ? 'bg-sky-100 text-brand-700 dark:bg-brand-700/25 dark:text-brand-200' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
      }`}
    >
      <Icon className="h-5 w-5" /> <span className="flex-1 text-left">{label}</span>
      {badge ? <span className="rounded-full bg-slate-200 px-2 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-200">{badge}</span> : null}
    </button>
  );

  return (
    <>
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[270px] shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-4 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between lg:hidden mb-2">
          <span className="font-bold text-sm">Menu</span>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <button className="btn-primary w-full !py-3.5" onClick={() => { onNew(); setIsOpen(false); }}>
          <Plus className="h-5 w-5" /> {t('newChat')}
        </button>
        <div className="mt-5 space-y-1">
          {item('create', MessageSquare, t('createAI'))}
          {item('edit', FilePenLine, t('toEdit'), drafts.length)}
          {item('history', History, t('history'))}
        </div>

        <p className="mb-2 mt-7 px-4 text-xs font-extrabold tracking-wider text-slate-400">{t('folders')}</p>
        <div className="flex-1 space-y-1 overflow-y-auto">
          {folders.map((f) => (
            <div key={f.id} className="relative">
              <button
                onClick={() => {
                  setActiveFolder(f.id);
                  setView('history');
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ${
                  activeFolder === f.id ? 'bg-sky-100 text-brand-700 dark:bg-brand-700/25' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <Folder className="h-5 w-5" /> <span className="flex-1 truncate text-left">{f.name}</span>
              </button>
              <button onClick={() => setMenu(menu === f.id ? null : f.id)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Options">
                <MoreHorizontal className="h-5 w-5" />
              </button>
              {menu === f.id && (
                <div className="animate-pop absolute right-2 top-11 z-20 w-40 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  <button
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => {
                      const n = window.prompt('Nouveau nom du dossier', f.name);
                      if (n?.trim()) setFolders(folders.map((x) => (x.id === f.id ? { ...x, name: n.trim() } : x)));
                      setMenu(null);
                    }}
                  >
                    <PenLine className="h-4 w-4" /> Renommer
                  </button>
                  <button
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => {
                      setFolders(folders.filter((x) => x.id !== f.id));
                      setMenu(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4" /> Supprimer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

function PageHead({ title, onOpenSidebar }) {
  const { t } = useStore();
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-b from-sky-50/60 to-transparent px-4 py-4 sm:px-8 dark:border-slate-800 dark:from-slate-900/50">
      <div className="flex items-center gap-3">
        <button onClick={onOpenSidebar} className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="eyebrow !text-xs">Cheky IA · Rédaction</p>
          <h1 className="mt-1 text-xl font-bold sm:text-3xl">{title}</h1>
        </div>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
        <span className="h-2 w-2 rounded-full bg-emerald-500" /> {t('aiAvailable')}
      </span>
    </div>
  );
}

function Create({ messages, setMessages, addDraft }) {
  const { t, notify } = useStore();
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, busy]);

  const reply = (topic) => {
    setBusy(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: 'ai',
          text: `Voici un premier brouillon sur « ${topic} », basé sur des sources vérifiées. Vous pouvez l’ouvrir dans l’éditeur pour le relire et le modifier.`,
          draft: { title: topic.length > 80 ? topic.slice(0, 77) + '…' : topic, lead: 'Brouillon généré par Cheky IA à relire avant publication.', body: 'Les faits ci-dessous ont été recoupés avec les sources officielles disponibles.\n\n(Contenu de démonstration.)' }
        }
      ]);
      setBusy(false);
    }, 1200);
  };

  const send = () => {
    if (!text.trim() && !file) return;
    const topic = text.trim() || file.name;
    setMessages((m) => [...m, { from: 'me', text: topic }]);
    setText('');
    setFile(null);
    reply(topic);
  };

  const pick = (n) => {
    setMessages((m) => [...m, { from: 'me', text: `Créer un article à partir de : ${n.title}` }]);
    reply(n.title);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <section className="card mx-auto max-w-3xl rounded-[1.75rem] border-brand-100 p-4 sm:p-5">
          <h2 className="text-sm font-bold">{t('fromVerified')}</h2>
          <p className="text-xs text-slate-500">{t('fromVerifiedSub')}</p>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible">
            {[news[3], news[0], news[1]].map((n) => (
              <button key={n.id} onClick={() => pick(n)} className="flex min-w-[240px] items-center gap-3 rounded-2xl border border-slate-200 p-2 text-left transition hover:border-brand-300 hover:bg-sky-50 dark:border-slate-700 dark:hover:bg-slate-800 md:min-w-0">
                <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Scene variant={n.scene} className="h-full w-full" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-extrabold text-brand-600">{kindMeta[n.kind].label}</span>
                  <span className="line-clamp-2 text-xs font-semibold">{n.title}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="mx-auto mt-6 max-w-3xl space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.from === 'me' ? 'flex-row-reverse' : ''}`}>
              {m.from === 'ai' && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
              )}
              <div className={`max-w-[85%] rounded-2xl border px-4 py-3 text-sm ${m.from === 'me' ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'}`}>
                {m.from === 'ai' && <p className="mb-1 text-xs font-bold text-slate-400">Cheky IA</p>}
                <p>{m.text}</p>
                {m.draft && (
                  <button
                    onClick={() => {
                      addDraft(m.draft);
                      notify('Brouillon ajouté à « Articles à modifier »');
                    }}
                    className="btn-ghost mt-3"
                  >
                    <FilePenLine className="h-4 w-4" /> Ouvrir dans l’éditeur
                  </button>
                )}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Cheky IA rédige…
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div className="px-4 pb-4 sm:px-8">
        <div className="card mx-auto max-w-3xl rounded-[1.75rem] p-3">
          {file && (
            <span className="chip mb-2">
              <Paperclip className="h-4 w-4" /> {file.name}
              <button onClick={() => setFile(null)} aria-label="Retirer">
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={2}
            placeholder={t('askAI')}
            className="w-full resize-none bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => fileRef.current?.click()} className="icon-btn" aria-label="Joindre">
                <Paperclip className="h-5 w-5" />
              </button>
              <input ref={fileRef} type="file" hidden accept="image/*,video/*,.pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <span className="hidden text-xs text-slate-400 sm:inline">{t('accepted')}</span>
            </div>
            <button onClick={send} className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow" aria-label="Envoyer">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Edit({ drafts, setDrafts }) {
  const { t, notify } = useStore();
  const [idx, setIdx] = useState(0);
  const [checking, setChecking] = useState(false);
  const d = drafts[Math.min(idx, drafts.length - 1)];

  if (!d) return <p className="p-10 text-center text-slate-500">Aucun article à modifier.</p>;
  const patch = (p) => setDrafts(drafts.map((x) => (x.id === d.id ? { ...x, ...p } : x)));
  const recheck = () => {
    setChecking(true);
    setTimeout(() => {
      patch({ score: Math.min(99, d.score + 1), sources: d.sources });
      setChecking(false);
      notify('Revérification terminée');
    }, 1000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="no-scrollbar flex gap-2 overflow-x-auto lg:hidden">
          {drafts.map((x, i) => (
            <button key={x.id} onClick={() => setIdx(i)} className={`chip whitespace-nowrap ${i === idx ? '!border-brand-500 !text-brand-600' : ''}`}>
              {x.title.slice(0, 24)}…
            </button>
          ))}
        </div>
        <div className="hidden flex-wrap gap-2 lg:flex">
          {drafts.map((x, i) => (
            <button key={x.id} onClick={() => setIdx(i)} className={`chip ${i === idx ? '!border-brand-500 !text-brand-600' : ''}`}>
              Brouillon {i + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800 dark:bg-emerald-900/20">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-emerald-600" />
            <div>
              <p className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300">Score IA : {d.score}%</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">{d.sources} sources officielles concordantes</p>
            </div>
          </div>
          <button onClick={recheck} disabled={checking} className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
            {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} {t('recheck')}
          </button>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-slate-500">{t('title')}</span>
          <input className="field" value={d.title} onChange={(e) => patch({ title: e.target.value })} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-slate-500">{t('lead')}</span>
          <textarea rows={3} className="field resize-y" value={d.lead} onChange={(e) => patch({ lead: e.target.value })} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-slate-500">{t('content')}</span>
          <textarea rows={9} className="field resize-y" value={d.body} onChange={(e) => patch({ body: e.target.value })} />
        </label>

        <div className="flex justify-between items-center pb-6">
          <button className="btn-ghost flex items-center gap-2 !px-4 !py-3 !text-sm" onClick={() => notify('Export PDF en cours...')}>
            <Download className="h-4 w-4" /> Exporter en PDF
          </button>
          <div className="flex gap-3">
            <button className="btn-ghost !px-5 !py-3 !text-sm" onClick={() => notify('Brouillon enregistré')}>
              {t('save')}
            </button>
            <button className="btn-primary" onClick={() => notify('Article envoyé pour publication')}>
              {t('publish')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadView({ article, onEdit, onBack }) {
  const { notify } = useStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${article.title}\n\n${article.lead || ''}\n\n${article.body || 'Contenu certifié par Cheky IA.'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    notify('Article copié dans le presse-papier !');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 bg-amber-50/40 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Barre d'action en haut du document */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <button onClick={onBack} className="btn-ghost text-xs font-bold">
            ← Retour à l'historique
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="btn-ghost flex items-center gap-1.5 text-xs font-semibold !px-3 !py-2">
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copié !' : 'Copier'}
            </button>
            <button onClick={onEdit} className="btn-primary flex items-center gap-1.5 text-xs !px-4 !py-2">
              <PenLine className="h-4 w-4" /> Modifier
            </button>
            <button onClick={() => notify('Export PDF de l\'article en cours...')} className="btn-ghost flex items-center gap-1.5 text-xs !px-3 !py-2">
              <Download className="h-4 w-4" /> PDF
            </button>
          </div>
        </div>

        {/* Style "Feuille de papier" attirante, typographie et couleurs soignées */}
        <article className="bg-[#fffdf9] dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg text-slate-800 dark:text-slate-100 font-serif leading-relaxed">
          <div className="mb-6 border-b border-amber-100 dark:border-slate-800 pb-4">
            <span className="text-xs font-sans font-extrabold uppercase tracking-widest text-brand-600 bg-brand-50 dark:bg-brand-900/30 px-3 py-1 rounded-full">
              {article.themeLabel || 'Article Vérifié'}
            </span>
            <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
              {article.title}
            </h1>
            <p className="mt-2 text-xs font-sans text-slate-400">
              Publié / Validé le {article.when || 'Récemment'} · Certifié par l'IA Cheky
            </p>
          </div>

          <div className="space-y-4 text-base sm:text-lg font-normal opacity-95">
            <p className="font-semibold text-slate-700 dark:text-slate-300 italic">
              {article.lead || "Résumé et faits principaux recoupés avec les sources officielles."}
            </p>
            <p className="whitespace-pre-line text-slate-600 dark:text-slate-300">
              {article.body || "Les informations présentées dans cet article ont fait l'objet d'un contrôle rigoureux auprès des bases de données officielles. Aucune anomalie ni tentative de désinformation n'a été détectée lors de l'analyse croisée.\n\nContenu détaillé généré et mis en forme pour assurer une lecture fluide, agréable et rigoureuse."}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

function HistoryView({ history, folders, activeFolder, onRead }) {
  const folder = folders.find((f) => f.id === activeFolder);
  const list = activeFolder ? history.filter((h) => h.theme === activeFolder) : history;
  
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-3xl space-y-4">
        {folder && <p className="text-sm font-bold text-brand-600">Dossier : {folder.name}</p>}
        {list.map((h) => (
          <article key={h.id} className="card flex items-center gap-4 !rounded-3xl p-4 hover:border-brand-300 transition">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-brand-600 dark:bg-sky-900/30">
              <FileText className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-extrabold text-brand-600">{h.themeLabel}</p>
              <h3 className="truncate text-base font-semibold sm:text-lg">{h.title}</h3>
              <p className="text-xs text-slate-400">
                {h.when} · Certifié par l'IA
              </p>
            </div>
            <div>
              <button className="btn-primary !px-4 !py-2.5 flex items-center gap-1.5 text-xs shadow-sm" onClick={() => onRead(h)}>
                <BookOpen className="h-4 w-4" /> <span>Lire</span>
              </button>
            </div>
          </article>
        ))}
        {list.length === 0 && <p className="py-10 text-center text-slate-500">Aucun article dans ce dossier.</p>}
      </div>
    </div>
  );
}

export default function Rediger() {
  const { t } = useStore();
  const [view, setView] = useState('create');
  const [drafts, setDrafts] = useState(initialDrafts);
  const [folders, setFolders] = useState(initialFolders);
  const [activeFolder, setActiveFolder] = useState(null);
  const [messages, setMessages] = useState([{ from: 'ai', text: t('aiHello') }]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const addDraft = (d) => {
    setDrafts((x) => [...x, { id: 'd' + Date.now(), score: 85, sources: 2, ...d }]);
    setView('edit');
  };
  const reset = () => {
    setMessages([{ from: 'ai', text: t('aiHello') }]);
    setView('create');
    setActiveFolder(null);
    setSelectedArticle(null);
  };

  const titles = { 
    create: t('articleCreation'), 
    edit: t('toEdit'), 
    history: t('historyTitle'),
    read: 'Lecture de l\'article'
  };

  const sideProps = { view, setView, drafts, folders, setFolders, activeFolder, setActiveFolder, onNew: reset, isOpen: isSidebarOpen, setIsOpen: setIsSidebarOpen };

  return (
    <div className="mx-auto flex h-[calc(100dvh-72px)] max-w-[1280px] overflow-hidden pb-[68px] lg:pb-0">
      <Sidebar {...sideProps} />
      <main className="flex min-w-0 flex-1 flex-col">
        <PageHead title={titles[view]} onOpenSidebar={() => setIsSidebarOpen(true)} />

        {view === 'create' && <Create messages={messages} setMessages={setMessages} addDraft={addDraft} />}
        {view === 'edit' && <Edit drafts={drafts} setDrafts={setDrafts} />}
        {view === 'history' && (
          <HistoryView 
            history={initialHistory} 
            folders={folders} 
            activeFolder={activeFolder} 
            onRead={(article) => {
              setSelectedArticle(article);
              setView('read');
            }} 
          />
        )}
        {view === 'read' && selectedArticle && (
          <ReadView 
            article={selectedArticle} 
            onEdit={() => setView('edit')} 
            onBack={() => setView('history')} 
          />
        )}
      </main>
    </div>
  );
}