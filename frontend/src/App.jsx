import { useStore } from './store.jsx';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import { Toast } from './components/ui.jsx';
import Actualites from './pages/Actualites.jsx';
import Statistiques from './pages/Statistiques.jsx';
import Contacts from './pages/Contacts.jsx';
import Rediger from './pages/Rediger.jsx';
import Signets from './pages/Signets.jsx';

const pages = {
  actualites: Actualites,
  statistiques: Statistiques,
  contacts: Contacts,
  rediger: Rediger,
  signets: Signets
};

export default function App() {
  const { route } = useStore();
  const Page = pages[route] || Actualites;
  return (
    <>
      <Header />
      <Page />
      <BottomNav />
      <Toast />
    </>
  );
}
