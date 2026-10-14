import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { FaqPage } from './pages/FaqPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { LocationPage } from './pages/LocationPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';

function RedirectToReviews() {
  window.location.replace('https://g.page/r/CWqBg4WCrbzlECE/review');
  return null;
}

export default function App() {
  const isFileProtocol = typeof window !== 'undefined' && (window.location.protocol === 'file:' || Boolean((window as unknown as { __STANDALONE_PREVIEW__?: boolean }).__STANDALONE_PREVIEW__));
  const Router = isFileProtocol ? HashRouter : BrowserRouter;

  return (
    <Router>
      <Routes>
        <Route path="omdome" element={<RedirectToReviews />} />
        <Route path="recension" element={<RedirectToReviews />} />
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tjanster" element={<ServicesPage />} />
          <Route path="projekt" element={<ProjectsPage />} />
          <Route path="projekt/:slug" element={<ProjectDetailPage />} />
          <Route path="galleri" element={<GalleryPage />} />
          <Route path="malare/:slug" element={<LocationPage />} />
          <Route path="om-oss" element={<AboutPage />} />
          <Route path="kontakt" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="integritet" element={<PrivacyPage />} />
          <Route path="tillganglighet" element={<AccessibilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
