import { Link } from 'react-router-dom'
import { Camera, MapPin, ArrowUpRight } from 'lucide-react'
import { association, navigation } from '../data/site'
export default function Footer() { return <footer className="footer"><div className="container footer-grid">
  <div className="footer-brand"><div className="footer-logo"><img src="/assets/association-logo.png" alt="Association logo"/><div><strong>Tirupati–Tirumala</strong><span>Photographer's Association</span></div></div><p>{association.introduction}</p><span className="footer-reg">{association.registration}</span></div>
  <div><h4>Explore</h4><div className="footer-links">{navigation.slice(0, 7).map(n => <Link key={n.path} to={n.path}>{n.label}</Link>)}</div></div>
  <div><h4>Association Office</h4><p className="footer-address"><MapPin size={16}/>{association.officeAddress}</p><Link className="footer-map" to="/contact">Contact association <ArrowUpRight size={15}/></Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Tirupati–Tirumala Photographer's Association. All rights reserved.</span><span>Designed &amp; Developed by <a href="https://mainnovextechnologies.lovable.app/" target="_blank" rel="noreferrer">MA Innovex Technologies <ArrowUpRight size={13}/></a></span></div></footer> }
