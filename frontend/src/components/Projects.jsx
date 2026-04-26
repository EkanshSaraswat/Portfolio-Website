import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import './Projects.css';

const projects = [
  {
    id: '01',
    title: 'SampadaSuraksha',
    description:
      'A disaster relief coordination platform for floods, earthquakes, and cyclones. Victims report location and needs in real time. NGOs and government teams claim rescue tasks, track resources like food, medicine, and boats through a centralized dashboard.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'CSS'],
    github: 'https://github.com/EkanshSaraswat/SampadaSuraksha',
    live: '',
    emoji: '🚨',
    featured: true,
  },
  {
    id: '02',
    title: 'Adaptive Escrow System',
    description:
      'A risk-aware peer-to-peer escrow mechanism where lock duration and protections are dynamically calculated based on transaction value, seller reputation, and dispute history. Runs on blockchain with off-chain risk computation and on-chain validation.',
    tags: ['TypeScript', 'Node.js', 'Solidity', 'Blockchain', 'Smart Contracts', 'React.js'],
    github: 'https://github.com/suryaansh001/escrow',
    live: 'https://sea-escrow.vercel.app/',
    featured: true,
  },
  {
    id: '03',
    title: 'BlockLance',
    description:
      'A decentralized freelancing platform built on blockchain, enabling trustless contracts between clients and freelancers with transparent milestone-based payments and dispute resolution.',
    tags: ['Blockchain', 'Solidity', 'React.js', 'Node.js', 'Web3.js'],
    github: 'https://github.com/maulik-sharma/BlockLance',
    live: '',
    featured: false,
  },
  
];

const ALL_TAGS = ['All', ...new Set(projects.flatMap(p => p.tags))];

export default function Projects() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(active));

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          04 — Projects
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Things I've<br />
          <span className="accent">built</span>
        </motion.h2>

        {/* Filter chips */}
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`projects__filter-btn${active === tag ? ' active' : ''}`}
              onClick={() => setActive(tag)}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="projects__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                className={`project-card${project.featured ? ' project-card--featured' : ''}`}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="project-card__number mono">{project.id}</div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="badge">{tag}</span>
                  ))}
                </div>

                <div className="project-card__links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link project-card__link--live"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Live Demo
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
