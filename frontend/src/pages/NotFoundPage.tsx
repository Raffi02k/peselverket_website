import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';

export function NotFoundPage() {
  return (
    <>
      <PageMeta title="Sidan hittades inte | Penselverket" description="Sidan du försökte nå finns inte." />
      <section className="not-found">
        <div className="container not-found__inner">
          <span>404</span>
          <p className="eyebrow">Sidan hittades inte</p>
          <h1>Den här ytan behöver en ny väg.</h1>
          <p>Länken kan vara gammal eller felstavad. Gå tillbaka till startsidan för att fortsätta.</p>
          <Link className="button button--accent" to="/">Till startsidan <ArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
