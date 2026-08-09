import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { ArrowUpRight } from './Icons';

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <Link className="project-card__image" to={`/projekt/${project.slug}`} aria-label={`Läs mer om ${project.title}`}>
        <img src={project.cover} alt="" loading={featured ? 'eager' : 'lazy'} />
        <span className={`status-badge ${project.status === 'Pågående' ? 'status-badge--active' : ''}`}>
          {project.status}
        </span>
        <span className="project-card__arrow"><ArrowUpRight /></span>
      </Link>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.category}</span>
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
        <h3><Link to={`/projekt/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
      </div>
    </article>
  );
}
