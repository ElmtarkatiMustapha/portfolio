import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, Menu, X, Code2, Database, Layers3, Box, MapPin, Phone, ChevronUp, ExternalLink, Braces } from 'lucide-react'
import { copy, profile, projects, skillGroups, experience, education } from './content'
import type { Language } from './content'

function initialLanguage(): Language {
  try { return localStorage.getItem('portfolio-language') === 'fr' ? 'fr' : 'en' } catch { return 'en' }
}
const sectionIds = ['work', 'about', 'experience', 'contact']
const icons = [Code2, Database, Layers3, Box]

export default function App() {
  const [lang, setLang] = useState<Language>(initialLanguage)
  const [menu, setMenu] = useState(false)
  const [filter, setFilter] = useState('all')
  const t = copy[lang]
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `Mustapha El Mtarkati | ${lang === 'en' ? 'Full-stack developer' : 'Développeur full-stack'}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', `${profile.name} — ${lang === 'en' ? 'Full-stack developer and JavaScript trainer at Simplon in Casablanca. Projects, skills, and experience.' : 'Développeur full-stack et formateur JavaScript chez Simplon à Casablanca. Projets, compétences et parcours.'}`)
    try { localStorage.setItem('portfolio-language', lang) } catch { /* Storage may be unavailable in private browsing. */ }
  }, [lang])
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  return <>
    <a className="skip" href="#main">{t.skip}</a>
    <header className="header">
      <a href="#" className="brand" aria-label="Mustapha El Mtarkati"><span className="brand-mark">m<span>.</span></span><span className="brand-name">mustapha<span>el mtarkati</span></span></a>
      <nav id="mobile-nav" className={menu ? 'nav open' : 'nav'} aria-label={lang === 'en' ? 'Main navigation' : 'Navigation principale'}>{t.nav.map((label, i) => <a key={label} href={`#${sectionIds[i]}`} onClick={() => setMenu(false)}>{label}</a>)}</nav>
      <div className="header-actions"><div className="languages" role="group" aria-label={t.language}>{(['en', 'fr'] as const).map(l => <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)} lang={l}>{l.toUpperCase()}</button>)}</div><a className="header-contact" href="#contact">{t.connect}<span className="contact-dot" /></a><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-nav" aria-label={lang === 'en' ? 'Toggle navigation' : 'Ouvrir ou fermer le menu'}>{menu ? <X /> : <Menu />}</button></div>
    </header>
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true"><img src="/images/hero.png" alt="" fetchPriority="high" /><div className="art-caption"><span>&lt;/&gt;</span> IDEAS INTO EXPERIENCES</div></div>
        <div className="hero-copy"><p className="eyebrow"><span className="small-line" />{t.eyebrow}</p><h1 id="hero-title">{t.hero[0]}<br /><span>{t.hero[1]}</span></h1><p className="hero-description">{t.intro}</p><div className="hero-buttons"><a className="button primary" href="#work">{t.workCta}<Braces size={18} /></a><a className="button secondary" href="#contact">{t.contactCta}</a></div><div className="socials"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={19} /></a><span className="social-divider" /><span>REACT / NODE.JS / LARAVEL</span></div></div>
        <div className="hero-bottom"><span>{t.scroll}</span><span className="scroll-line" /><span>DESIGN · DEVELOP · DELIVER</span></div>
      </section>
      <div className="tech-strip" aria-hidden="true"><div className="container"><span>React</span><i>✳</i><span>TypeScript</span><i>✳</i><span>Node.js</span><i>✳</i><span>Laravel</span><i>✳</i><span>Docker</span><i>✳</i><span>Web3</span></div></div>
      <section id="work" className="section container" aria-labelledby="work-title"><div className="section-heading"><div><p className="eyebrow">{t.workLabel}</p><h2 id="work-title">{t.workTitle}</h2></div><p className="section-intro">{t.workIntro}</p></div><div className="filters" role="group" aria-label={lang === 'en' ? 'Filter projects' : 'Filtrer les projets'}>{[['all', t.all], ['apps', t.apps], ['web3', t.web3]].map(([id, label]) => <button key={id} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}</div><div className="project-grid">{projects.filter(p => filter === 'all' || p.category === filter).map(p => <article className={`project-card ${p.image}`} key={p.id}><a className="project-image" href={`${profile.github}/${p.id}`} target="_blank" rel="noreferrer" aria-label={`${p.name} — ${t.code}`}><img src={`/images/${p.image}.svg`} alt={`${p.name} — ${t.concept}`} loading="lazy" width="800" height="500" /><span className="image-note">{t.concept}</span><span className="image-link"><ExternalLink size={20} /></span></a><div className="project-info"><p className="project-kind">{p[lang].kind}</p><h3><a href={`${profile.github}/${p.id}`} target="_blank" rel="noreferrer">{p.name}</a><Github size={19} aria-hidden="true" /></h3><p>{p[lang].description}</p><ul className="tags">{p.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div></article>)}</div><a className="text-link" href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer"><Github size={18} />{lang === 'en' ? 'More on GitHub' : 'Plus sur GitHub'}</a></section>
      <section id="about" className="section about-section"><div className="container about-layout"><div><p className="eyebrow">{t.aboutLabel}</p><h2 className="multiline">{t.aboutTitle}</h2><div className="about-monogram" aria-hidden="true"><span>&lt;</span>me<span>/&gt;</span><div className="monogram-caption">FULL-STACK MINDSET</div></div></div><div className="about-text"><p>{t.about}</p><p>{t.about2}</p><div className="about-details"><span><MapPin size={17} />Casablanca, {lang === 'en' ? 'Morocco' : 'Maroc'}</span><span><Code2 size={17} />{lang === 'en' ? 'JavaScript Trainer @ Simplon' : 'Formateur JavaScript @ Simplon'}</span></div><div className="spoken"><span>{lang === 'en' ? 'Languages I speak' : 'Les langues que je parle'}</span><p>{lang === 'en' ? 'Arabic · French · English' : 'Arabe · Français · Anglais'}</p></div></div></div></section>
      <section className="section container" aria-labelledby="skills-title"><p className="eyebrow">{t.skillsLabel}</p><h2 id="skills-title">{t.skillsTitle}</h2><div className="skills-grid">{skillGroups.map((group, i) => { const Icon = icons[i]; return <article className="skill-group" key={group.en}><Icon size={24} /><h3>{group[lang]}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article> })}</div></section>
      <section id="experience" className="section container experience" aria-labelledby="experience-title"><p className="eyebrow">{t.expLabel}</p><h2 id="experience-title">{t.expTitle}</h2><div className="timeline">{experience.map((job, i) => <article className={i === 0 ? 'job current' : 'job'} key={job.company}><div className="job-date">{job.date} — {job.end ?? t.present}{i === 0 && <span className="current-label">{lang === 'en' ? 'CURRENT ROLE' : 'POSTE ACTUEL'}</span>}</div><div className="job-body"><span className="timeline-dot" /><h3>{job[lang][0]}</h3><p className="company">{job.company}</p><p>{job[lang][1]}</p></div></article>)}</div><details className="education"><summary>{t.education}<span>+</span></summary><div className="education-grid">{education.map(item => <article key={item.school}><span>{item.date}</span><h3>{item[lang]}</h3><p>{item.school}</p></article>)}</div></details></section>
      <section id="contact" className="contact-section"><div className="container contact-layout"><div><p className="eyebrow">{t.contactLabel}</p><h2 className="multiline">{t.contactTitle}</h2><p>{t.contactText}</p><a className="button primary" href={`mailto:${profile.email}`}>{t.email}<Mail size={18} /></a></div><div className="contact-links"><a href={`mailto:${profile.email}`}><Mail /><span><small>EMAIL</small>{profile.email}</span></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /><span><small>LINKEDIN</small>Mustapha El Mtarkati</span><ExternalLink size={17} /></a><a href={profile.github} target="_blank" rel="noreferrer"><Github /><span><small>GITHUB</small>ElmtarkatiMustapha</span><ExternalLink size={17} /></a><a href="tel:+212653707131"><Phone /><span><small>{t.phone.toUpperCase()}</small>{profile.phone}</span></a><p className="location"><MapPin size={16} />{t.location}</p></div></div></section>
    </main>
    <footer className="container footer"><a href="#" className="footer-brand">m<span>.</span></a><p>© {new Date().getFullYear()} {profile.name}<span>{t.footer}</span></p><a href="#" className="back-top">{t.back}<ChevronUp size={18} /></a></footer>
  </>
}
