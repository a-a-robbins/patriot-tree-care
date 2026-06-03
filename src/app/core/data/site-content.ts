export const SITE = {
  name: 'Patriot Tree Care',
  tagline: 'Quality tree work. Honest service. Veteran owned.',
  serviceArea: 'Greater Metro Area',
  phone: '(555) 123-4567',
  phoneHref: 'tel:+15551234567',
  email: 'hello@patriottreecare.example',
  hours: 'Mon–Sat · 7am–6pm',
  veteranBadge: 'U.S. Veteran Owned & Operated',
} as const;

export const NAV_LINKS = [
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/safety', label: 'Safety' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
] as const;

export const SERVICES = [
  {
    id: 'removal',
    title: 'Tree Removal',
    summary: 'Safe, controlled takedowns with full cleanup — even in tight spaces.',
    icon: '🌳',
  },
  {
    id: 'trimming',
    title: 'Pruning & Trimming',
    summary: 'Health-focused cuts that shape your trees and protect your property.',
    icon: '✂️',
  },
  {
    id: 'storm',
    title: 'Storm Cleanup',
    summary: 'Fast response when limbs or trees threaten your home or driveway.',
    icon: '⛈️',
  },
  {
    id: 'stump',
    title: 'Stump Grinding',
    summary: 'Restore usable lawn and eliminate tripping hazards at the roots.',
    icon: '⚙️',
  },
  {
    id: 'health',
    title: 'Tree Health Assessments',
    summary: 'Clear recommendations — we never push work you do not need.',
    icon: '🩺',
  },
  {
    id: 'lot',
    title: 'Lot Clearing',
    summary: 'Selective clearing for builds, views, or fire-safety defensible space.',
    icon: '🏡',
  },
] as const;

export const TRUST_POINTS = [
  {
    title: 'Licensed & Insured',
    detail: 'Full liability coverage and workers’ comp for your peace of mind.',
  },
  {
    title: 'No Surprise Billing',
    detail: 'Written quotes before work begins — we honor what we quote.',
  },
  {
    title: 'Respect for Your Property',
    detail: 'Tarps, rigging, and thorough cleanup on every job.',
  },
  { title: 'Veteran-Led Crew', detail: 'Discipline, safety, and integrity on every site.' },
] as const;

export const FAQ_ITEMS = [
  {
    q: 'Do you provide free estimates?',
    a: 'Yes. We visit your property, assess the work, and send a clear written quote — no obligation.',
  },
  {
    q: 'How soon can you schedule work?',
    a: 'Routine jobs are often scheduled within 1–2 weeks. Emergency storm work is prioritized.',
  },
  {
    q: 'Are you insured?',
    a: 'Yes. We carry general liability and workers’ compensation. Certificates available on request.',
  },
  {
    q: 'What areas do you serve?',
    a: `We proudly serve the ${SITE.serviceArea} and surrounding communities.`,
  },
  {
    q: 'Do you haul away debris?',
    a: 'Absolutely. Cleanup and haul-off are included unless we agree otherwise in writing.',
  },
] as const;

export const GALLERY_ITEMS = [
  { title: 'Large oak removal', category: 'Removal' },
  { title: 'Crown reduction', category: 'Trimming' },
  { title: 'Storm-damaged maple', category: 'Storm' },
  { title: 'Stump grind & sod prep', category: 'Stump' },
  { title: 'Ornamental prune', category: 'Trimming' },
  { title: 'Backyard clear-out', category: 'Lot clearing' },
] as const;

export const QUOTE_SERVICE_OPTIONS = SERVICES.map((s) => ({
  value: s.id,
  label: s.title,
}));
