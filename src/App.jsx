import { useState, useEffect } from 'react'
import * as d from './data'

const { company: c } = d
const levels = [['top', 'Site'], ['about', 'Foundation'], ['services', 'Structure'], ['process', 'Method'], ['projects', 'Projects'], ['contact', 'Handover']]

function Rail() {
  const [p, setP] = useState(0), [a, setA] = useState(0)
  useEffect(() => {
    const f = () => {
      const h = document.documentElement
      setP(scrollY / Math.max(1, h.scrollHeight - innerHeight))
      let k = 0
      levels.forEach(([id], i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < innerHeight * 0.4) k = i
      })
      setA(k)
    }
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return (
    <nav className="rail" aria-label="Page levels">
      <i style={{ height: p * 100 + '%' }} />
      {levels.map(([id, l], i) => (
        <a key={id} href={'#' + id} className={i === a ? 'on' : ''}><span>{l}</span></a>
      ))}
    </nav>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header>
      <div className="wrap bar">
        <a className="brand" href="#top" aria-label="SRJ Enterprises home">
          <img src="/images/logo.png" alt="SRJ Enterprises" />
        </a>
        <button className="menu" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
        <nav className={'main' + (open ? ' open' : '')} aria-label="Main" onClick={() => setOpen(false)}>
          <ul>
            {d.nav.map(([l, h]) => <li key={h}><a href={h}>{l}</a></li>)}
            <li><a className="btn sm" href="#contact">Get in touch</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Frame() {
  const cols = [70, 150, 230, 310], floors = 5, h = 62, base = 410
  const t = (f) => 0.5 + f * 0.45
  const dl = (s) => ({ '--d': s + 's' })
  return (
    <svg className="frame" viewBox="0 0 420 460" role="img" aria-label="Building frame being constructed floor by floor">
      <line className="draw g" pathLength="1" x1="20" y1={base} x2="400" y2={base} style={dl(0.1)} />
      {Array.from({ length: floors }, (_, f) => (
        <g key={f}>
          {cols.map((x) => (
            <line key={x} className="draw" pathLength="1" x1={x} y1={base - f * h} x2={x} y2={base - (f + 1) * h} style={dl(t(f))} />
          ))}
          <line className={'draw' + (f === floors - 1 ? ' g' : '')} pathLength="1" x1="55" y1={base - (f + 1) * h} x2="325" y2={base - (f + 1) * h} style={dl(t(f) + 0.25)} />
          <text className="lvl" x="2" y={base - (f + 1) * h + 4} style={dl(t(f) + 0.5)}>+{((f + 1) * 3).toFixed(2)}</text>
        </g>
      ))}
      <text className="lvl" x="2" y={base + 4} style={dl(0.2)}>±0.00</text>
      <g className="crane">
        <line className="draw g" pathLength="1" x1="372" y1={base} x2="372" y2="24" style={dl(2.9)} />
        <line className="draw g" pathLength="1" x1="392" y1={base} x2="392" y2="24" style={dl(2.9)} />
        <path className="draw g" pathLength="1" d={'M372 ' + base + ' L392 ' + (base - 55) + ' L372 ' + (base - 110) + ' L392 ' + (base - 165) + ' L372 ' + (base - 220) + ' L392 ' + (base - 275) + ' L372 ' + (base - 330) + ' L392 24'} style={dl(3.1)} />
        <line className="draw" pathLength="1" x1="190" y1="24" x2="415" y2="24" style={dl(3.4)} />
        <line className="draw" pathLength="1" x1="215" y1="24" x2="215" y2="140" style={dl(3.7)} />
        <rect className="hook" x="209" y="140" width="12" height="10" />
      </g>
    </svg>
  )
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>Building with purpose. Delivering with discipline.</h1>
          <p>Civil construction and industrial contracting in Pune, built on planning, site coordination and honest communication.</p>
          <div className="actions">
            <a className="btn" href="#contact">Discuss your project</a>
            <a className="btn ghost" href="#projects">See our work</a>
          </div>
        </div>
        <Frame />
      </div>
      <div className="wrap strip">
        <span>Civil construction</span><span>Industrial contracting</span><span>Residential & bungalow</span>
      </div>
    </section>
  )
}

function About() {
  const words = [
    ['Quality', 'Work follows approved drawings, specifications and inspections, and defects are tracked until they are closed.'],
    ['Trust', 'Clear scope, transparent communication and ownership of every commitment we make on site.'],
    ['Commitment', 'Planning-led execution with schedule discipline, from mobilisation to handover.'],
  ]
  return (
    <section id="about">
      <div className="wrap">
        <h2>A practical, execution-focused construction partner</h2>
        <p className="lead">SRJ Enterprises is a civil construction and industrial contracting firm focused on disciplined site execution, coordination and dependable delivery.</p>
        <div className="tri">
          {words.map(([w, p]) => <div className="row" key={w}><b>{w}</b><p>{p}</p></div>)}
        </div>
        <dl className="details">
          <dt>Proprietor</dt><dd>{c.proprietor}</dd>
          <dt>Constitution</dt><dd>Proprietorship</dd>
          <dt>Address</dt><dd>{c.address}</dd>
        </dl>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="tint" id="services">
      <div className="wrap">
        <h2>What we build and coordinate</h2>
        <div className="grid">
          {d.services.map(([t, p, icon]) => (
            <div className="card" key={t}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon} /></svg>
              <h3>{t}</h3><p>{p}</p>
            </div>
          ))}
        </div>
        <p className="note">Scope boundaries, statutory approvals, design responsibility, specialist systems and testing or commissioning are defined contractually for each project.</p>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section className="dark" id="principles">
      <div className="wrap">
        <h2>Built on accountability and collaboration</h2>
        <div className="vm">
          <div><h3>Vision</h3><p>{d.vision}</p></div>
          <div><h3>Mission</h3><p>{d.mission}</p></div>
        </div>
        <div className="pr">
          {d.principles.map(([t, p]) => <div key={t}><h3>{t}</h3><p>{p}</p></div>)}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <h2>From scope clarity to site handover</h2>
        <p className="lead">Each stage builds on the last. Dependencies and risks are managed early, not at the end.</p>
        <div className="stairs">
          {d.steps.map(([t, p], i) => (
            <div className="stair" key={t} style={{ '--i': i }}>
              <small>Step {i + 1}</small><h3>{t}</h3><p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [big, setBig] = useState(null)
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setBig(null)
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [])
  return (
    <section className="tint" id="projects">
      <div className="wrap">
        <h2>Residential work we have delivered</h2>
        <p className="lead">Tap any photo to enlarge it.</p>
        <div className="gal">
          {d.gallery.map(([src, alt, cap]) => (
            <figure key={src} onClick={() => setBig({ src, alt })}>
              <img src={src} alt={alt} loading="lazy" />
              <figcaption>{cap}</figcaption>
            </figure>
          ))}
        </div>
        <div className="exp">
          {d.experience.map(([t, p]) => <div key={t}><b>{t}</b><br />{p}</div>)}
        </div>
        <p className="note">Project references are indicative. Industrial project-management experience at Hirotech India (Mehsana, Gujarat), MESL (Talawade MIDC; Jhajjar, Haryana) and with Arya Projects comes from the proprietor’s earlier professional roles and is not presented as an SRJ Enterprises contract. Exact scope, role and dates are shared on request. Images may be illustrative.</p>
      </div>
      {big && <div id="lightbox" role="dialog" aria-label="Enlarged photo" onClick={() => setBig(null)}><img src={big.src} alt={big.alt} /></div>}
    </section>
  )
}

function Quality() {
  return (
    <section>
      <div className="wrap">
        <h2>Responsible execution at every work front</h2>
        <div className="two">
          <div><h3>Quality approach</h3><ul>{d.quality.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><h3>Health, safety and environment</h3><ul>{d.safety.map((x) => <li key={x}>{x}</li>)}</ul></div>
        </div>
        <p className="note">This site does not claim any certification or accreditation. Certifications, licences, insurance and statutory registrations will be shared once verified.</p>
      </div>
    </section>
  )
}

function Contact() {
  const [f, setF] = useState({ name: '', phone: '', type: 'Civil construction', details: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const msg = `Hello SRJ Enterprises,\nName: ${f.name}\nPhone: ${f.phone}\nProject type: ${f.type}\nDetails: ${f.details || '-'}`
    window.open(`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }
  return (
    <section className="dark contact" id="contact">
      <div className="wrap split">
        <div>
          <h2>Ready to break ground? Tell us about your project.</h2>
          <address>
            <div><b>{c.proprietor}, Proprietor</b></div>
            <div>{c.phones.map((p, i) => <span key={p}>{i > 0 && ' / '}<a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a></span>)}</div>
            <div><a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a></div>
            <div><a href={`mailto:${c.email}`}>{c.email}</a></div>
            <div>{c.address}</div>
          </address>
        </div>
        <form onSubmit={submit}>
          <label>Full name<input required autoComplete="name" value={f.name} onChange={set('name')} /></label>
          <label>Phone<input required type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} /></label>
          <label>Project type
            <select value={f.type} onChange={set('type')}>
              <option>Civil construction</option><option>Industrial civil works</option>
              <option>Residential / bungalow</option><option>Site execution or subcontract package</option><option>Other</option>
            </select>
          </label>
          <label>Project details<textarea placeholder="Location, scope, timeline" value={f.details} onChange={set('details')} /></label>
          <button className="btn" type="submit">Send on WhatsApp</button>
          <p className="fnote">Opens WhatsApp with your message filled in.</p>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <p>Civil Construction & Industrial Contracting.<br />Building with strength. Delivering with trust.</p>
          <ul>{d.nav.map(([l, h]) => <li key={h}><a href={h}>{l}</a></li>)}
            <li><a href="/SRJ_Enterprises_Company_Profile.pdf" download>Company profile (PDF)</a></li></ul>
        </div>
        <div className="mark" aria-hidden="true">SRJ</div>
        <p className="copy">© {new Date().getFullYear()} SRJ Enterprises. Quality • Trust • Commitment</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header /><Rail />
      <main id="top">
        <Hero /><About /><Services /><Principles /><Process /><Projects /><Quality /><Contact />
      </main>
      <Footer />
    </>
  )
}