import { Link } from 'react-router-dom'
import { MapPin, Phone, MessageCircle, ArrowUpRight, Camera, BadgeCheck } from 'lucide-react'
import type { Member } from '../types'

export default function MemberCard({ member, onContact }: { member: Member; onContact: (type: 'call'|'whatsapp') => void }) {
  const map = member.mapsUrl || (member.studioAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(member.studioAddress)}` : '')
  return <article className="member-card member-card-premium">
    <Link to={`/members/${member.id}`} className="member-photo member-photo-premium" aria-label={`View ${member.name} profile`}>
      {member.photo ? <>
        <img className="member-photo-backdrop" src={member.photo} alt="" aria-hidden="true" loading="lazy" decoding="async"/>
        <img className="member-portrait" src={member.photo} alt={`${member.name} portrait`} loading="lazy" decoding="async"/>
      </> : <div className="photo-placeholder"><Camera size={34}/></div>}
      <span className="member-photo-id"><BadgeCheck size={12}/> {member.memberNumber || 'Member'}</span>
      <span className="member-view">View profile <ArrowUpRight size={14}/></span>
    </Link>
    <div className="member-content member-content-premium">
      <span className="member-tag member-tag-premium">{member.designation || 'Association Member'}</span>
      <h3 className="member-name-premium"><Link to={`/members/${member.id}`}>{member.name || 'Association Member'}</Link></h3>
      <div className="member-studio-slot">
        {member.studioName ? <p className="studio-name" title={member.studioName}>{member.studioName}</p> : <span className="member-field-empty">Professional member</span>}
      </div>
      <div className="member-address-slot">
        {member.studioAddress ? <p className="member-address" title={member.studioAddress}><MapPin size={14}/><span>{member.studioAddress}</span></p> : <span className="member-field-empty">Studio address not listed</span>}
      </div>
      <div className="member-actions member-actions-icons" aria-label="Member contact options">
        <button type="button" className="contact-call icon-contact" title="Call (demo)" aria-label="Call member — demo" onClick={() => onContact('call')}><Phone size={19}/></button>
        <button type="button" className="contact-whatsapp icon-contact" title="WhatsApp (demo)" aria-label="WhatsApp member — demo" onClick={() => onContact('whatsapp')}><svg className="whatsapp-brand-glyph" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.2a12.1 12.1 0 0 0-10.4 18.3L4 28l6.7-1.7A12.1 12.1 0 1 0 16 3.2Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M11.2 9.8c-.4-.8-.8-.8-1.2-.8h-1c-.4 0-.9.2-1.2.7-.4.5-1.5 1.5-1.5 3.6s1.5 4.1 1.7 4.4c.2.3 2.9 4.6 7.1 6.2 3.5 1.4 4.2 1.1 5 .9.8-.2 2.6-1.1 3-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.9-.6s-2.6-1.3-3-1.4c-.4-.2-.7-.2-1 .3-.3.5-1.1 1.4-1.4 1.7-.3.3-.5.4-1 .1-.5-.2-1.9-.7-3.6-2.2-1.3-1.1-2.2-2.5-2.5-3-.3-.5 0-.7.2-1 .2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8-.1-.2-1-2.4-1.4-3.3Z" fill="currentColor" transform="translate(3 1) scale(.83)"/></svg></button>
        {map ? <a className="contact-location icon-contact" href={map} target="_blank" rel="noopener noreferrer" title="Open Google Maps" aria-label="Open member location in Google Maps"><MapPin size={20}/></a> : <button type="button" className="contact-location icon-contact is-unavailable" title="Location not available" aria-label="Location not available" disabled><MapPin size={20}/></button>}
      </div>
    </div>
  </article>
}
