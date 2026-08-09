import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';

export default function App() {
  const isFileProtocol = typeof window !== 'undefined' && (window.location.protocol === 'file:' || Boolean((window as unknown as { __STANDALONE_PREVIEW__?: boolean }).__STANDALONE_PREVIEW__));
  const Router = isFileProtocol ? HashRouter : BrowserRouter;

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tjanster" element={<ServicesPage />} />
          <Route path="projekt" element={<ProjectsPage />} />
          <Route path="projekt/:slug" element={<ProjectDetailPage />} />
          <Route path="om-oss" element={<AboutPage />} />
          <Route path="kontakt" element={<ContactPage />} />
          <Route path="integritet" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
