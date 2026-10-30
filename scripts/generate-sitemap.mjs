import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const domain = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://YOUR-DOMAIN.example').replace(/\/$/, '')
const members = JSON.parse(fs.readFileSync(path.join(root, 'src/data/members.json'), 'utf8'))
const categories = [...new Set(members.flatMap(m => m.category || []))]
const designations = [...new Set(members.map(m => m.designation).filter(Boolean))]
const slugify = value => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const routes = ['/', '/about', '/members', '/categories', '/designations', '/executive-committee', '/studio-owners', '/photographers', '/videographers', '/photo-editors', '/gallery', '/events', '/contact']
for (const category of categories) routes.push(`/categories/${slugify(category)}`)
for (const designation of designations) routes.push(`/designation/${slugify(designation)}`)
for (const member of members) if (member?.id) routes.push(`/members/${member.id}`)
const urls = [...new Set(routes)].map(route => `  <url><loc>${domain}${route}</loc><changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${route === '/' ? '1.0' : route === '/members' ? '0.9' : route.startsWith('/members/') ? '0.7' : '0.6'}</priority></url>`).join('\n')
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml)
console.log(`Generated sitemap with ${routes.length} URLs for ${domain}`)
