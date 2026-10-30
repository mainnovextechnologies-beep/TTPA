import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Users } from 'lucide-react'
import { navigation } from '../data/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <div className="topline"><div className="container topline-inner"><span>Professional photography community · Tirupati, Andhra Pradesh</span><span>Regd. No. 719/1992</span></div></div>
    <div className="container nav-wrap">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <img src="/assets/association-logo.png" alt="Association emblem"/>
        <span><strong>Tirupati–Tirumala</strong><small>Photographer's Association</small></span>
      </Link>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {navigation.map(item => <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)}>{item.label}</NavLink>)}
        <NavLink className="nav-directory-cta" to="/members" onClick={() => setOpen(false)}><Users size={16}/> Member Directory</NavLink>
      </nav>
    </div>
  </header>
}
