import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { dict } from './i18n.js';

const Ctx = createContext(null);

const load = (k, d) => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : d;
  } catch {
    return d;
  }
};
const save = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* stockage indisponible */
  }
};

const readRoute = () => {
  const r = window.location.hash.replace(/^#\/?/, '');
  return ['actualites', 'statistiques', 'contacts', 'rediger', 'signets'].includes(r) ? r : 'actualites';
};

export function StoreProvider({ children }) {
  const [lang, setLang] = useState(() => load('cheky.lang', 'fr'));
  const [dark, setDark] = useState(() => load('cheky.dark', false));
  const [bookmarks, setBookmarks] = useState(() => load('cheky.bookmarks', []));
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);
  const [toast, setToast] = useState(null);
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.lang = lang === 'mg' ? 'mg' : lang;
    save('cheky.dark', dark);
    save('cheky.lang', lang);
  }, [dark, lang]);

  useEffect(() => save('cheky.bookmarks', bookmarks), [bookmarks]);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    const hash = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    window.addEventListener('hashchange', hash);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
      window.removeEventListener('hashchange', hash);
    };
  }, []);

  const t = useCallback((k) => dict[lang]?.[k] ?? dict.fr[k] ?? k, [lang]);
  const navigate = useCallback((r) => {
    window.location.hash = '/' + r;
  }, []);

  const notify = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const toggleBookmark = useCallback(
    (id) => {
      setBookmarks((b) => {
        const has = b.includes(id);
        notify(has ? t('removed') : t('savedOk'));
        return has ? b.filter((x) => x !== id) : [...b, id];
      });
    },
    [notify, t]
  );

  const share = useCallback(
    async (item) => {
      const data = { title: item.title, text: item.title, url: window.location.href };
      try {
        if (navigator.share) await navigator.share(data);
        else {
          await navigator.clipboard.writeText(`${item.title} — ${window.location.href}`);
          notify(t('copied'));
        }
      } catch {
        /* partage annulé */
      }
    },
    [notify, t]
  );

  const value = useMemo(
    () => ({ lang, setLang, dark, setDark, bookmarks, toggleBookmark, online, toast, notify, route, navigate, t, share }),
    [lang, dark, bookmarks, toggleBookmark, online, toast, notify, route, navigate, t, share]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);
