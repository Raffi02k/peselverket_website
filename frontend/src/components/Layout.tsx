import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileContactBar } from './MobileContactBar';
import { ScrollToTop } from './ScrollToTop';

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main-content">Hoppa till innehållet</a>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
