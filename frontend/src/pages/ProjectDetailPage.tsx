import { Link, useParams } from 'react-router-dom';
import { CallToAction } from '../components/CallToAction';
import { ArrowRight, ArrowUpRight, Check } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { getProjectBySlug } from '../data/projects';
import { NotFoundPage } from './NotFoundPage';

export function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFoundPage />;

  return (
    <>
      <PageMeta
        title={`${project.title} | Penselverket AB`}
        description={project.summary}
      />

      <section className="project-detail-hero">
        <div className="container">
          <Reveal>
            <div className="project-detail-hero__meta">
              <Link to="/projekt">Projekt <ArrowRight /></Link>
              <span>{project.category}</span>
              <span>{project.location}</span>
              <span>{project.year}</span>
            </div>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="project-detail-hero__image">
              <img src={project.cover} alt="Översikt av pågående invändigt måleriprojekt" width="1206" height="640" fetchPriority="high" />
              <span className="status-badge status-badge--active">{project.status}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="project-story section-pad">
        <div className="container project-story__grid">
          <Reveal>
            <p className="eyebrow">Om arbetet</p>
            <h2>Förberedelse innan slutresultat.</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="project-story__copy">
              {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <h3>Projektets omfattning</h3>
              <ul className="check-list">
                {project.scope.map((item) => <li key={item}><Check />{item}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="project-gallery section-pad section--sand">
        <div className="container">
          <div className="project-gallery__heading">
            <p className="eyebrow">Bildgalleri</p>
            <p>Samtliga bilder visar projektet under pågående arbete.</p>
          </div>
          <div className="project-gallery__grid">
            {project.images.map((image, index) => (
              <Reveal key={image.src} delay={(index % 2) * 80}>
                <figure className={index === 0 ? 'is-wide' : ''}>
                  <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} />
                  <figcaption>Arbetsbild {String(index + 1).padStart(2, '0')} · {project.location}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="similar-project section-pad">
        <div className="container similar-project__inner">
          <div>
            <p className="eyebrow">Liknande projekt?</p>
            <h2>Berätta vad som ska målas.</h2>
          </div>
          <Link className="button button--accent" to="/kontakt#offert">Starta en förfrågan <ArrowUpRight /></Link>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
