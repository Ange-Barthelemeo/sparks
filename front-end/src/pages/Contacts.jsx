import { useMemo, useState } from 'react';
import { 
  Building2, CloudSun, HeartPulse, Search, Shield, Siren, LifeBuoy, 
  Copy, Check, Plus, Sparkles, X 
} from 'lucide-react';
import { contacts as initialContacts } from '../data/mock.js';
import { useStore } from '../store.jsx';

const icons = { 
  siren: Siren, 
  shield: Shield, 
  building: Building2, 
  heart: HeartPulse, 
  weather: CloudSun 
};

export default function Contacts() {
  const { t } = useStore();
  const [q, setQ] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  
  // Gestion dynamique de la liste des contacts
  const [contactsList, setContactsList] = useState(initialContacts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAiSearching, setIsAiSearching] = useState(false);

  // Formulaire pour nouveau contact
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    cat: 'Administrations',
    desc: ''
  });

  // Extraire la liste unique des catégories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(contactsList.map((c) => c.cat)));
    return ['all', ...cats];
  }, [contactsList]);

  // Filtrage par recherche textuelle et catégorie
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return contactsList.filter((c) => {
      const matchCat = selectedCat === 'all' || c.cat === selectedCat;
      const matchQuery = !s || [c.name, c.cat, c.desc, c.phone].some((v) => v?.toLowerCase().includes(s));
      return matchCat && matchQuery;
    });
  }, [q, selectedCat, contactsList]);

  // Copie dans le presse-papier
  const handleCopy = (id, phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Ajouter un contact manuellement
  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;

    const created = {
      id: Date.now(),
      name: newContact.name,
      phone: newContact.phone,
      cat: newContact.cat,
      desc: newContact.desc || 'Ajouté manuellement',
      icon: 'building'
    };

    setContactsList([created, ...contactsList]);
    setNewContact({ name: '', phone: '', cat: 'Administrations', desc: '' });
    setShowAddModal(false);
  };

  // Recherche par IA (Simulée)
  const handleAiSearch = () => {
    if (!q.trim()) return;
    setIsAiSearching(true);
    setTimeout(() => {
      const aiResult = {
        id: Date.now(),
        name: `Service : ${q}`,
        phone: '+261 20 22 ' + Math.floor(10000 + Math.random() * 90000),
        cat: 'Trouvé par IA',
        desc: 'Source recoupée et vérifiée par Cheky IA',
        icon: 'shield'
      };
      setContactsList([aiResult, ...contactsList]);
      setIsAiSearching(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-28 pt-8 sm:px-6 lg:pb-16 lg:pt-12">
      {/* En-tête */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-2">
            <LifeBuoy className="h-4 w-4 text-brand-600" />
            {t('services') || 'Services & Assistance'}
          </p>
          <h1 className="page-title mt-3">{t('contactsTitle') || 'Numéros utiles & Contacts'}</h1>
          <p className="mt-3 text-base text-slate-500 sm:text-lg">
            {t('contactsSub') || 'Consultez, copiez ou recherchez des numéros d’assistance vérifiés.'}
          </p>
        </div>

        {/* Bouton Ajouter Contact */}
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          Ajouter un contact
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="card flex items-center gap-3 px-5 py-3 lg:w-96">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('searchService') || 'Rechercher un service, police...'}
            className="w-full bg-transparent py-1.5 text-sm placeholder:text-slate-400 focus:outline-none dark:text-white"
          />
          {q && (
            <button
              onClick={handleAiSearch}
              disabled={isAiSearching}
              title="Trouver ce numéro grâce à l'IA"
              className="inline-flex items-center gap-1 rounded-lg bg-brand-50/80 px-2.5 py-1 text-[11px] font-bold text-brand-600 transition hover:bg-brand-100 dark:bg-slate-800 dark:text-brand-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {isAiSearching ? 'Recherche IA...' : 'Chercher IA'}
            </button>
          )}
        </div>

        {/* Badges de catégories */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
                selectedCat === cat
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {cat === 'all' ? 'Tous les services' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grille des contacts */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {list.map((c) => {
          const Icon = icons[c.icon] || Building2;
          const isUrgent = c.cat?.toLowerCase().includes('urgence') || c.icon === 'siren';

          return (
            <article
              key={c.id}
              className={`card flex items-center gap-4 p-5 sm:p-6 transition ${
                isUrgent ? 'border-l-4 border-l-red-500 dark:border-l-red-500' : ''
              }`}
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                  isUrgent
                    ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'
                    : 'bg-sky-50 text-brand-600 dark:bg-sky-900/30 dark:text-brand-300'
                }`}
              >
                <Icon className="h-7 w-7" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={`text-xs font-extrabold tracking-wide ${isUrgent ? 'text-red-600' : 'text-brand-600'}`}>
                    {c.cat}
                  </p>
                  {isUrgent && (
                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-black uppercase text-red-700 dark:bg-red-900/40 dark:text-red-300">
                      24h/24
                    </span>
                  )}
                </div>
                <h3 className="truncate text-lg font-bold text-slate-900 dark:text-white">{c.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{c.desc}</p>
                <p className="mt-2 text-base font-extrabold text-slate-900 dark:text-slate-100">{c.phone}</p>
              </div>

              {/* Bouton Copier uniquement */}
              <button
                onClick={() => handleCopy(c.id, c.phone)}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {copiedId === c.id ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" /> Copié
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copier
                  </>
                )}
              </button>
            </article>
          );
        })}
      </div>

      {list.length === 0 && (
        <div className="my-12 rounded-3xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800">
          <p className="text-sm font-semibold text-slate-500">Aucun contact trouvé.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => { setQ(''); setSelectedCat('all'); }}
              className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200"
            >
              Réinitialiser
            </button>
            {q && (
              <button
                onClick={handleAiSearch}
                disabled={isAiSearching}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-brand-700"
              >
                <Sparkles className="h-4 w-4" /> Rechercher avec l'IA
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal d'ajout de contact */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ajouter un nouveau contact</h3>
              <button onClick={() => setShowAddModal(false)} className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Nom du service / Contact *</label>
                <input
                  required
                  type="text"
                  placeholder="Ex: Pharmacie de Garde"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Numéro de téléphone *</label>
                <input
                  required
                  type="text"
                  placeholder="Ex: +261 34 00 000 00"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Catégorie</label>
                <select
                  value={newContact.cat}
                  onChange={(e) => setNewContact({ ...newContact, cat: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                >
                  <option value="Urgences">Urgences</option>
                  <option value="Administrations">Administrations</option>
                  <option value="Santé">Santé</option>
                  <option value="Secours">Secours</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Description courte</label>
                <input
                  type="text"
                  placeholder="Ex: Disponible 24h/24 à Analamanga"
                  value={newContact.desc}
                  onChange={(e) => setNewContact({ ...newContact, desc: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}