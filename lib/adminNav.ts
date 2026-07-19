export type AdminNavLink = {
  href: string
  label: string
  /** Shown on dashboard when there is no numeric count */
  cta: string
  countKey?: 'heroSlides' | 'partners' | 'leaders' | 'coreValues' | 'programs' | 'news' | 'vacancies'
}

export type AdminSection = {
  id: string
  title: string
  description: string
  sitePath: string
  links: AdminNavLink[]
}

export const ADMIN_SECTIONS: AdminSection[] = [
  {
    id: 'homepage',
    title: 'Homepage',
    description: 'Edits content on the public homepage (/).',
    sitePath: '/',
    links: [
      { href: '/admin/home', label: 'Home content', cta: 'Edit hero & intro copy' },
      { href: '/admin/hero', label: 'Hero slides', cta: 'Manage slides', countKey: 'heroSlides' },
      { href: '/admin/partners', label: 'Partners', cta: 'Manage partners', countKey: 'partners' },
    ],
  },
  {
    id: 'about',
    title: 'About',
    description: 'Edits the About Us page (/about).',
    sitePath: '/about',
    links: [
      { href: '/admin/about', label: 'Mission & vision', cta: 'Edit mission & vision' },
      { href: '/admin/leaders', label: 'Leadership', cta: 'Manage leaders', countKey: 'leaders' },
      { href: '/admin/core-values', label: 'Core values', cta: 'Manage values', countKey: 'coreValues' },
    ],
  },
  {
    id: 'programs',
    title: 'Programs',
    description: 'Edits programs on the homepage and /programs.',
    sitePath: '/programs',
    links: [
      { href: '/admin/programs', label: 'Programs', cta: 'Manage programs', countKey: 'programs' },
    ],
  },
  {
    id: 'news',
    title: 'News',
    description: 'Edits news posts and vacancies on /news.',
    sitePath: '/news',
    links: [
      { href: '/admin/news', label: 'News posts', cta: 'Manage news', countKey: 'news' },
      { href: '/admin/vacancies', label: 'Vacancies', cta: 'Manage vacancies', countKey: 'vacancies' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Edits location and email on /contact.',
    sitePath: '/contact',
    links: [
      { href: '/admin/contact', label: 'Location & email', cta: 'Edit contact details' },
    ],
  },
]

export function findAdminSection(pathname: string | null): AdminSection | null {
  if (!pathname) return null
  for (const section of ADMIN_SECTIONS) {
    for (const link of section.links) {
      if (pathname === link.href || pathname.startsWith(`${link.href}/`)) {
        return section
      }
    }
  }
  return null
}

export function isAdminLinkActive(pathname: string | null, href: string, exact = false) {
  if (!pathname) return false
  if (exact) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}
