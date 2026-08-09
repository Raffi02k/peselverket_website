import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CallToAction } from '../components/CallToAction';
import { ArrowUpRight } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { projects } from '../data/projects';

type Filter = 'Alla' | 'Invändigt' | 'Utvändigt' | 'Företag & BRF' | 'Pågående';
const filters: Filter[] = ['Alla', 'Invändigt', 'Utvändigt', 'Företag & BRF', 'Pågående'];

export function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('Alla');

  const filtered = useMemo(() => {
    if (filter === 'Alla') return projects;
    if (filter === 'Pågående') return projects.filter((project) => project.status === 'Pågående');
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <>
      <PageMeta
        title="Projekt | Penselverket AB"
        description="Se dokumenterade måleriprojekt och pågående arbeten från Penselverket i Uddevalla med omnejd."
      />

      <section className="page-hero page-hero--projects">
        <div className="container page-hero__grid">
          <Reveal>
            <p className="eyebrow">Projekt</p>
            <h1>Riktiga arbeten. Tydlig status.</h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="page-hero__lead">
              Här visas endast projekt som finns dokumenterade i Penselverkets eget material. Pågående arbeten märks tydligt och presenteras inte som färdiga resultat.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="project-index section-pad">
        <div className="container">
          <div className="filter-row" role="group" aria-label="Filtrera projekt">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                className={filter === item ? 'is-active' : ''}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="project-index__grid">
              {filtered.map((project) => <ProjectCard key={project.slug} project={project} featured />)}
            </div>
          ) : (
            <Reveal>
              <div className="empty-projects">
                <span>{filter}</span>
                <h2>Fler dokumenterade projekt publiceras här.</h2>
                <p>Det finns ännu inget uppladdat bildmaterial i den valda kategorin. Kontakta Penselverket för att prata om ett liknande uppdrag.</p>
                <Link className="button button--accent" to="/kontakt#offert">Beskriv ditt projekt <ArrowUpRight /></Link>
              </div>
            </Reveal>
          )}

          <div className="project-principles">
            <div><strong>Originalbilder</strong><span>Material från faktiska arbeten</span></div>
            <div><strong>Tydlig status</strong><span>Pågående är inte samma sak som färdigt</span></div>
            <div><strong>Ingen utfyllnad</strong><span>Inga externa stockbilder</span></div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
