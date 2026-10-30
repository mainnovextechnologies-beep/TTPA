import { useMemo, useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Camera, Users, Award, MapPin, ArrowRight, ArrowUpRight, ShieldCheck, ChevronLeft, ChevronRight, Phone, MessageCircle, Building2, SlidersHorizontal, Target, Eye, Handshake, Landmark, Sparkles, Compass } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Seo from './components/Seo'
import MemberCard from './components/MemberCard'
import ContactModal from './components/ContactModal'
import membersData from './data/members.json'
import { association } from './data/site'
import type { Member } from './types'

const members = membersData as Member[]
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const categories = [...new Set(members.flatMap(m => m.category || []))].sort()
const designations = [...new Set(members.map(m => m.designation || '').filter(x => x && x !== 'Association Member'))].sort()
const locations = [...new Set(members.map(m => m.studioAddress?.split(',').slice(-1)[0]?.trim() || '').filter(Boolean))].sort()

const categoryAssets: Record<string, string> = {
  'Digital Photo Studios': '/assets/categories/digital-photo-studios.webp',
  'Photo Editors': '/assets/categories/photo-editors.webp',
  'Photo Framing': '/assets/categories/photo-framing.webp',
  'Photo Labs & Printing': '/assets/categories/photo-labs-printing.webp',
  'Photographers': '/assets/categories/photographers.webp',
  'Studio Owners': '/assets/categories/studio-owners.webp',
  'Videographers': '/assets/categories/videographers.webp',
  'Wedding Photographers': '/assets/categories/wedding-photographers.webp',
}
const categoryDescriptions: Record<string, string> = {
  'Digital Photo Studios': 'Creative studios equipped to turn important moments into lasting photographs.',
  'Photo Editors': 'The creative finishing touch behind polished images, colour and visual storytelling.',
  'Photo Framing': 'Thoughtful presentation that helps treasured photographs live beautifully beyond the screen.',
  'Photo Labs & Printing': 'Print and imaging services that bring digital memories into the real world.',
  'Photographers': 'The people behind the lens, capturing portraits, celebrations and everyday stories.',
  'Studio Owners': 'Independent creative spaces and professionals serving the photography community.',
  'Videographers': 'Visual storytellers who preserve movement, atmosphere and meaningful moments.',
  'Wedding Photographers': 'Specialists documenting the emotion, traditions and details of wedding celebrations.',
}


function PageIntro({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return <section className="page-intro"><div className="container"><span className="eyebrow">{kicker}</span><h1>{title}</h1><p>{text}</p></div></section>
}

function Home() {
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<'call'|'whatsapp'|null>(null)
  const [memberPage, setMemberPage] = useState(1)
  const navigate = useNavigate()
  const homePageSize = 15
  const homeTotalPages = Math.max(1, Math.ceil(members.length / homePageSize))
  const homeMembers = members.slice((memberPage - 1) * homePageSize, memberPage * homePageSize)
  return <>
    <Seo title="Home" description="Explore the Tirupati–Tirumala Photographer's Association and its 461-member static directory." />
    <section className="hero hero-photo">
      <div className="hero-grain"/>
      <div className="container hero-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <span className="hero-kicker"><span/> Tirupati · Tirumala · Chandragiri · Renigunta</span>
          <h1>Tirupati–Tirumala<br/><em>Photographer’s Association</em></h1>
          <p>Uniting photographers · Preserving moments · Serving the community. Discover association members, professional studios and photography services across the region.</p>
          <form className="hero-search" onSubmit={e => { e.preventDefault(); navigate(`/members?search=${encodeURIComponent(search)}`) }}>
            <Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members by name, studio, designation or location…"/>
            <button className="btn btn-gold" type="submit">Search <ArrowRight size={16}/></button>
          </form>
          <div className="hero-note"><ShieldCheck size={16}/> Regd. No. 719/1992 · Tirupati</div>
        </motion.div>
      </div>
    </section>
    <section className="stats-section"><div className="container stats-grid">
      <div><span className="stat-icon"><Users/></span><strong>{members.length}</strong><span>Association records</span></div>
      <div><span className="stat-icon"><Camera/></span><strong>{categories.length}</strong><span>Member categories</span></div>
      <div><span className="stat-icon"><Award/></span><strong>{designations.length}</strong><span>Recorded designations</span></div>
      <div><span className="stat-icon"><MapPin/></span><strong>{members.filter(m => m.studioAddress).length}</strong><span>Studio addresses</span></div>
    </div></section>
    <section className="section category-showcase-section"><div className="container">
      <div className="category-showcase-heading"><div><span className="eyebrow">Explore our creative community</span><h2>Where <em>imagination</em> finds its focus.</h2><p>Every frame begins with an idea. Discover the photographers, studios and creative specialists who turn imagination into photographs, films and memories.</p></div><Link to="/categories" className="text-link">Explore all categories <ArrowUpRight size={16}/></Link></div>
      <div className="category-grid category-image-grid">{categories.map(c => <Link key={c} to={`/categories/${slugify(c)}`} className="category-image-tile">
        {categoryAssets[c] ? <img src={categoryAssets[c]} alt={`${c} category`} loading="lazy"/> : <div className="category-image-fallback"><Camera size={30}/></div>}
        <span className="category-image-overlay"><b>{c}</b><small>{members.filter(m=>(m.category||[]).includes(c)).length} {members.filter(m=>(m.category||[]).includes(c)).length===1?'Member':'Members'}</small><em>{categoryDescriptions[c]}</em></span><ArrowUpRight className="category-image-arrow"/>
      </Link>)}</div>
      <div className="category-inspiration-line"><span>Imagine</span><i/> <span>Create</span><i/> <span>Capture</span><i/> <span>Preserve</span></div>
    </div></section>
    <section className="section section-muted"><div className="container split-section"><div><span className="eyebrow">Who we are</span><h2>A shared passion.<br/><em>A stronger profession.</em></h2></div><div><p className="lead">{association.introduction}</p><p>The association connects photographers, studio owners, videographers and imaging professionals across Tirupati, Tirumala, Chandragiri, Renigunta and Tiruchanoor. With registration reference 719/1992, its member directory creates a shared place to discover the people and studios behind the region’s photography community.</p><Link to="/about" className="text-link">About the association <ArrowUpRight size={16}/></Link></div></div></section>
    <section className="section home-members-section"><div className="container">
      <div className="home-members-heading">
        <div><span className="eyebrow">The people behind every frame</span><h2>Meet our <em>association members.</em></h2><p>Explore the complete association community — all {members.length} fixed member records, presented 15 at a time. Discover professional roles, studio details and location links, with clear demo contact actions on every available profile.</p></div>
        <Link to="/members" className="btn btn-primary">Explore full directory <ArrowRight size={16}/></Link>
      </div>
      <div className="member-directory-summary"><span><Users size={16}/> Showing members <b>{(memberPage-1)*homePageSize+1}–{Math.min(memberPage*homePageSize,members.length)}</b> of <b>{members.length}</b></span><span className="summary-page">Page {memberPage} of {homeTotalPages}</span></div>
      {homeMembers.length ? <div className="member-grid home-featured">{homeMembers.map(m => <MemberCard key={m.id} member={m} onContact={setModal}/>)}</div> : <div className="empty-panel">Member records are being prepared.</div>}
      <div className="home-member-pagination">
        <button disabled={memberPage===1} onClick={()=>{setMemberPage(p=>Math.max(1,p-1));document.querySelector('.home-members-section')?.scrollIntoView({behavior:'smooth',block:'start'})}}><ChevronLeft size={17}/> Previous</button>
        <span>Showing page <b>{memberPage}</b> / {homeTotalPages}</span>
        <button disabled={memberPage===homeTotalPages} onClick={()=>{setMemberPage(p=>Math.min(homeTotalPages,p+1));document.querySelector('.home-members-section')?.scrollIntoView({behavior:'smooth',block:'start'})}}>Next <ChevronRight size={17}/></button>
      </div>
    </div></section>
    <section className="cta-band"><div className="container cta-inner"><div><span className="eyebrow">A community since 1992</span><h2>Every frame tells a story.<br/><em>Every member is part of ours.</em></h2></div><Link to="/members" className="btn btn-gold">Explore members <ArrowRight size={17}/></Link></div></section>
    <ContactModal type={modal} onClose={() => setModal(null)}/>
  </>
}

function MembersPage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('search') || '')
  const [category, setCategory] = useState('all')
  const [designation, setDesignation] = useState('all')
  const [location, setLocation] = useState('all')
  const [sort, setSort] = useState('name')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<'call'|'whatsapp'|null>(null)
  const pageSize = 15
  const filtered = useMemo(() => members.filter(m => {
    const searchable = `${m.name} ${m.designation || ''} ${m.studioName || ''} ${m.studioAddress || ''} ${m.phone || ''}`.toLowerCase()
    return searchable.includes(query.toLowerCase()) &&
      (category === 'all' || (m.category || []).includes(category)) &&
      (designation === 'all' || m.designation === designation) &&
      (location === 'all' || (m.studioAddress || '').toLowerCase().includes(location.toLowerCase()))
  }).sort((a,b) => sort === 'designation' ? (a.designation || '').localeCompare(b.designation || '') : sort === 'newest' ? b.id.localeCompare(a.id) : a.name.localeCompare(b.name)), [query,category,designation,location,sort])
  const totalPages = Math.max(1, Math.ceil(filtered.length/pageSize))
  const visible = filtered.slice((page-1)*pageSize,page*pageSize)
  const updateQuery = (value: string) => { setQuery(value); setPage(1); setParams(value ? {search:value} : {}) }
  return <>
    <Seo title="Members Directory" description="Search all 461 static member records of the Tirupati–Tirumala Photographer's Association." path="/members"/>
    <PageIntro kicker="The people behind the lens" title="Members directory" text={`Explore all ${members.length} membership records. Search by name, designation, studio or location.`}/>
    <section className="section"><div className="container">
      <div className="directory-toolbar">
        <label className="search-box"><Search size={19}/><input value={query} onChange={e => updateQuery(e.target.value)} placeholder="Search by name, studio, designation or location…"/></label>
        <select value={category} onChange={e=>{setCategory(e.target.value);setPage(1)}}><option value="all">All categories</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select>
        <select value={designation} onChange={e=>{setDesignation(e.target.value);setPage(1)}}><option value="all">All designations</option>{designations.map(d=><option key={d} value={d}>{d}</option>)}</select>
        <select value={location} onChange={e=>{setLocation(e.target.value);setPage(1)}}><option value="all">All locations</option>{locations.map(l=><option key={l} value={l}>{l}</option>)}</select>
        <select value={sort} onChange={e=>setSort(e.target.value)}><option value="name">Sort: Name A–Z</option><option value="designation">Sort: Designation</option><option value="newest">Sort: Source order</option></select>
      </div>
      <div className="results-line"><span><SlidersHorizontal size={15}/> Showing {visible.length ? (page-1)*pageSize+1 : 0}–{Math.min(page*pageSize,filtered.length)} of {filtered.length} members · 15 per page</span><button className="clear-filters" onClick={()=>{setQuery('');setCategory('all');setDesignation('all');setLocation('all');setPage(1);setParams({})}}>Clear filters</button></div>
      {visible.length ? <div className="member-grid">{visible.map(m=><MemberCard key={m.id} member={m} onContact={setModal}/>)}</div> : <div className="empty-panel"><div className="empty-symbol"><Users size={27}/></div><h3>No matching members found</h3><p>Try another search or clear the selected filters.</p></div>}
      {filtered.length>pageSize && <div className="pagination"><button disabled={page===1} onClick={()=>{setPage(p=>p-1);window.scrollTo({top:0,behavior:'smooth'})}}><ChevronLeft size={17}/> Previous</button><span>Page <b>{page}</b> of {totalPages}</span><button disabled={page===totalPages} onClick={()=>{setPage(p=>p+1);window.scrollTo({top:0,behavior:'smooth'})}}>Next <ChevronRight size={17}/></button></div>}
    </div></section>
    <ContactModal type={modal} onClose={()=>setModal(null)}/>
  </>
}

function MemberProfile() {
  const { id } = useParams()
  const m = members.find(x => x.id === id)
  const [modal,setModal] = useState<'call'|'whatsapp'|null>(null)
  if (!m) return <><Seo title="Member profile" description="Association member profile."/><PageIntro kicker="Member directory" title="Profile not found" text="This member profile could not be found."/><div className="container section"><Link className="btn btn-primary" to="/members">Back to directory</Link></div></>
  const map = m.mapsUrl || (m.studioAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.studioAddress)}` : '')
  return <>
    <Seo title={m.name} description={`${m.name}, ${m.designation || 'Association Member'} — Tirupati Photographer Association member profile.`} path={`/members/${m.id}`}/>
    <section className="section"><div className="container profile-layout">
      <div className="profile-image">{m.photo ? <img src={m.photo} alt={`${m.name} portrait`} loading="lazy" decoding="async"/> : <Camera size={54}/>}</div>
      <div className="profile-details"><span className="eyebrow">Association member · {m.memberNumber}</span><h1>{m.name}</h1><p className="profile-role">{m.designation || 'Association Member'}</p>
        {m.studioName && <p className="profile-meta"><Building2 size={16}/>{m.studioName}</p>}
        {m.studioAddress && <p className="profile-meta"><MapPin size={16}/>{m.studioAddress}</p>}
        <div className="member-actions profile-actions"><button className="contact-call" onClick={()=>setModal('call')}><Phone size={18}/> Call (Demo)</button><button className="contact-whatsapp" onClick={()=>setModal('whatsapp')}><svg className="whatsapp-brand-glyph" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.2a12.1 12.1 0 0 0-10.4 18.3L4 28l6.7-1.7A12.1 12.1 0 1 0 16 3.2Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M11.2 9.8c-.4-.8-.8-.8-1.2-.8h-1c-.4 0-.9.2-1.2.7-.4.5-1.5 1.5-1.5 3.6s1.5 4.1 1.7 4.4c.2.3 2.9 4.6 7.1 6.2 3.5 1.4 4.2 1.1 5 .9.8-.2 2.6-1.1 3-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.9-.6s-2.6-1.3-3-1.4c-.4-.2-.7-.2-1 .3-.3.5-1.1 1.4-1.4 1.7-.3.3-.5.4-1 .1-.5-.2-1.9-.7-3.6-2.2-1.3-1.1-2.2-2.5-2.5-3-.3-.5 0-.7.2-1 .2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8-.1-.2-1-2.4-1.4-3.3Z" fill="currentColor" transform="translate(3 1) scale(.83)"/></svg> WhatsApp (Demo)</button>{map && <a className="contact-location" href={map} target="_blank" rel="noreferrer"><MapPin size={18}/> View Google Maps</a>}</div>
        <div className="profile-facts"><div><span>Member ID</span><b>{m.memberNumber}</b></div><div><span>Category</span><b>{(m.category || []).join(', ')}</b></div><div><span>Source record</span><b>{m.sourceFile} · Page {m.sourcePage}</b></div></div>
        <Link to="/members" className="text-link">← Back to all members</Link>
      </div>
    </div></section>
    <ContactModal type={modal} onClose={()=>setModal(null)}/>
  </>
}

function CategoriesPage() {
  return <><Seo title="Photography Categories" description="Explore the eight professional categories represented in the Tirupati–Tirumala Photographer’s Association directory." path="/categories"/>
    <PageIntro kicker="The creative community" title="A place for every perspective." text="From the first idea to the final print, discover the people and professional skills that bring photographs and films to life."/>
    <section className="section category-showcase-section category-page-showcase"><div className="container">
      <div className="category-showcase-heading"><div><span className="eyebrow">Eight recorded member categories</span><h2>Explore the <em>art of creating.</em></h2><p>Photography is imagination made visible — through a camera, a studio, a skilled edit or a beautifully finished print. Choose a category to meet the association members working in that field.</p></div><div className="category-total-stat"><strong>{categories.length}</strong><span>Recorded categories</span></div></div>
      <div className="category-grid category-image-grid">{categories.map(c=><Link key={c} to={`/categories/${slugify(c)}`} className="category-image-tile">
        <img src={categoryAssets[c]} alt={`${c} category`} loading="lazy"/>
        <span className="category-image-overlay"><b>{c}</b><small>{members.filter(m=>(m.category||[]).includes(c)).length} {members.filter(m=>(m.category||[]).includes(c)).length===1?'Member':'Members'}</small><em>{categoryDescriptions[c]}</em></span><ArrowUpRight className="category-image-arrow"/>
      </Link>)}</div>
      <div className="category-inspiration-line"><span>Imagine</span><i/><span>Create</span><i/><span>Capture</span><i/><span>Preserve</span></div>
    </div></section>
  </>
}
function DesignationsPage() {
  return <><Seo title="Designations" description="Browse the designations recorded in the association member directory." path="/designations"/><PageIntro kicker="Professional roles" title="Designations" text="Explore the designations transcribed from the association membership records."/><section className="section"><div className="container designation-list">{designations.map(d=><Link key={d} to={`/designation/${slugify(d)}`}><span>{d}</span><b>{members.filter(m=>slugify(m.designation||'')===slugify(d)).length} members</b><ArrowUpRight size={16}/></Link>)}</div></section></>
}
function CategoryPage() {
  const { slug } = useParams()
  const title = categories.find(c=>slugify(c)===slug) || (slug||'').split('-').map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(' ')
  return <MemberListing title={title} kind="category" predicate={m=>(m.category||[]).some(c=>slugify(c)===slug)}/>;
}
function DesignationPage() {
  const { slug } = useParams()
  const title = designations.find(d=>slugify(d)===slug) || (slug||'').split('-').map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(' ')
  return <MemberListing title={title} kind="designation" predicate={m=>slugify(m.designation||'')===slug}/>;
}
function MemberListing({title,kind,predicate}:{title:string;kind:string;predicate:(m:Member)=>boolean}) {
  const [modal,setModal]=useState<'call'|'whatsapp'|null>(null)
  const list=members.filter(predicate)
  return <><Seo title={title} description={`Association member listings for ${title}.`}/><PageIntro kicker={kind==='category'?'Member categories':'Member designations'} title={title} text={`${list.length} member records in this listing.`}/><section className="section"><div className="container">{list.length?<div className="member-grid">{list.map(m=><MemberCard key={m.id} member={m} onContact={setModal}/>)}</div>:<div className="empty-panel"><h3>No records in this group</h3><Link to="/members" className="text-link">Browse all members <ArrowRight size={15}/></Link></div>}</div></section><ContactModal type={modal} onClose={()=>setModal(null)}/></>
}
function ExecutiveCommittee() {
  const terms=['president','secretary','treasurer','committee','vice president']
  return <MemberListing title="Executive Committee" kind="designation" predicate={m=>terms.some(t=>(m.designation||'').toLowerCase().includes(t)) || (m.category||[]).includes('Executive Committee')}/>
}

function AboutPage() {
  const purposeCards = [
    { icon: <Target/>, title: 'Our purpose', text: 'To bring photography professionals together, encourage mutual support and strengthen the professional community across the Tirupati region.' },
    { icon: <Eye/>, title: 'Our vision', text: 'A connected and respected photography community where members can be discovered, collaborate and grow through shared knowledge and professional relationships.' },
    { icon: <Handshake/>, title: 'Our values', text: 'Professional respect, creative excellence, cooperation, responsible service and pride in the craft of preserving important moments.' },
  ]
  const focus = [
    ['A connected community', 'A shared directory that makes it easier to discover photographers, studios and imaging professionals across the association’s service region.'],
    ['Professional visibility', 'A clear member presence that helps people understand each member’s professional role and find available studio information.'],
    ['Knowledge and collaboration', 'A place to encourage peer learning, exchange experience and strengthen relationships among photography professionals.'],
    ['A stronger profession', 'Promoting quality, responsibility and respect for the work that goes into documenting people, places and occasions.'],
  ]
  return <>
    <Seo title="About the Association" description="Learn about the Tirupati–Tirumala Photographer’s Association, registration details, service region and shared professional purpose." path="/about"/>
    <PageIntro kicker="Our identity · Our community" title="Together behind the lens." text="A professional community connecting photographers, studio owners, videographers and imaging professionals across Tirupati and the surrounding region."/>
    <section className="about-identity-section">
      <div className="container about-identity-grid">
        <div className="about-identity-copy">
          <span className="eyebrow">Who we are</span>
          <h2>One association.<br/><em>Many creative perspectives.</em></h2>
          <p>The Tirupati–Tirumala Photographer’s Association represents a shared professional identity for the people behind the camera — photographers, studio professionals, videographers and others working in the imaging field.</p>
          <p>Photography is more than taking a picture. It is the craft of preserving milestones, telling stories and creating memories that families, communities and businesses can return to. This association directory brings the member community into one accessible place.</p>
          <Link to="/members" className="btn btn-primary">Explore the member directory <ArrowRight size={16}/></Link>
        </div>
        <div className="about-registration-card">
          <div className="about-seal"><Landmark size={30}/></div>
          <span className="eyebrow">Association registration</span>
          <strong>719 / 1992</strong>
          <p>Tirupati</p>
          <div className="about-card-rule"/>
          <span className="about-card-label">Official association name</span>
          <b>{association.name}</b>
          <span className="about-card-note">Registration reference reproduced from the association membership form header.</span>
        </div>
      </div>
    </section>
    <section className="section about-purpose-section">
      <div className="container">
        <div className="section-heading"><div><span className="eyebrow">What brings us together</span><h2>A shared <em>purpose.</em></h2></div><p className="heading-aside">A professional community built around craft, connection and service.</p></div>
        <div className="about-purpose-grid">{purposeCards.map(item=><article className="about-purpose-card" key={item.title}><span className="about-purpose-icon">{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div>
    </section>
    <section className="section section-muted">
      <div className="container">
        <div className="section-heading"><div><span className="eyebrow">How the community can make a difference</span><h2>Our areas of <em>focus.</em></h2></div></div>
        <div className="about-focus-grid">{focus.map(([title,text],i)=><article className="about-focus-item" key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div>
    </section>
    <section className="section about-region-section">
      <div className="container about-region-inner">
        <div><span className="eyebrow">Our service region</span><h2>Rooted in Tirupati.<br/><em>Connected across the region.</em></h2><p>The association form identifies the following areas in its regional description.</p></div>
        <div className="about-region-list">{association.regions.map((region,i)=><div key={region}><MapPin size={17}/><b>{region}</b><span>0{i+1}</span></div>)}</div>
      </div>
    </section>
    <section className="section about-contact-section">
      <div className="container about-contact-card">
        <div><span className="eyebrow">Association office</span><h2>Stay connected to the <em>community.</em></h2><p>{association.officeAddress}</p></div>
        <a className="btn btn-gold" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(association.officeAddress)}`} target="_blank" rel="noreferrer"><MapPin size={17}/> View office on Google Maps</a>
      </div>
    </section>
  </>
}

function StaticPage({kind}:{kind:string}) {
  const content:Record<string,{title:string;kicker:string;text:string;body:string[]}> = {
    about:{title:'About the association',kicker:'Our community',text:'A professional community for photographers and imaging professionals across the Tirupati region.',body:['The Tirupati–Tirumala Photographer’s Association brings together photographers, studio owners, videographers and allied imaging professionals.','The association registration details and service regions shown here are taken from the membership form header. Further history, mission statements and achievements can be added when official association content is supplied.']},
    gallery:{title:'Gallery',kicker:'Moments & memories',text:'A visual space for association activities, events and the art of photography.',body:['Association event photographs, workshops, meetings and photography activities can be added to the static gallery assets.']},
    events:{title:'Events & activities',kicker:'Community calendar',text:'Workshops, meetings, competitions and association activities.',body:['Event information can be maintained in local project files as the association shares official dates and details.']},
    contact:{title:'Contact the association',kicker:'Get in touch',text:'Connect with the Tirupati–Tirumala Photographer’s Association.',body:[association.officeAddress,'Open the association office location in Google Maps for directions.']}
  }
  const c=content[kind]||content.about
  return <><Seo title={c.title} description={c.text} path={`/${kind}`}/><PageIntro kicker={c.kicker} title={c.title} text={c.text}/><section className="section"><div className="container prose-panel">{c.body.map((p,i)=><p key={i}>{p}</p>)}{kind==='contact'&&<a className="btn btn-primary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(association.officeAddress)}`} target="_blank" rel="noreferrer"><MapPin size={16}/> Open association address in Google Maps</a>}</div></section></>
}

export default function App() {
  return <><Navbar/><main><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/members" element={<MembersPage/>}/>
    <Route path="/members/:id" element={<MemberProfile/>}/>
    <Route path="/categories" element={<CategoriesPage/>}/>
    <Route path="/categories/:slug" element={<CategoryPage/>}/>
    <Route path="/designations" element={<DesignationsPage/>}/>
    <Route path="/designation/:slug" element={<DesignationPage/>}/>
    <Route path="/executive-committee" element={<ExecutiveCommittee/>}/>
    <Route path="/studio-owners" element={<MemberListing title="Studio Owners" kind="category" predicate={m=>(m.category||[]).includes('Studio Owners')}/>}/>
    <Route path="/photographers" element={<MemberListing title="Photographers" kind="category" predicate={m=>(m.category||[]).includes('Photographers')}/>}/>
    <Route path="/videographers" element={<MemberListing title="Videographers" kind="category" predicate={m=>(m.category||[]).includes('Videographers')}/>}/>
    <Route path="/photo-editors" element={<MemberListing title="Photo Editors" kind="category" predicate={m=>(m.category||[]).includes('Photo Editors')}/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/gallery" element={<StaticPage kind="gallery"/>}/>
    <Route path="/events" element={<StaticPage kind="events"/>}/>
    <Route path="/contact" element={<StaticPage kind="contact"/>}/>
    <Route path="/senior-members" element={<MemberListing title="Senior Members" kind="category" predicate={m=>/senior|years|experience/i.test(m.designation||'')}/>}/>
    <Route path="*" element={<StaticPage kind="about"/>}/>
  </Routes></main><Footer/></>
}
