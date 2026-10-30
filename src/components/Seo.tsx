import { Helmet } from 'react-helmet-async'
import { association } from '../data/site'
export default function Seo({ title, description, path = '' }: { title: string; description: string; path?: string }) {
  const fullTitle = `${title} | ${association.name}`
  const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://YOUR-DOMAIN.example').replace(/\/$/, '')
  const canonical = `${siteUrl}${path || '/'}`
  return <Helmet>
    <title>{fullTitle}</title><meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="website" /><meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} /><meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
}
