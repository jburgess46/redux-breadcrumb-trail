import mapBreadcrumb from './mapBreadcrumb'

export default function ensureHasHome (breadcrumbs = [], routes, limit, exclude) {
  if (breadcrumbs && breadcrumbs.length) return breadcrumbs

  const first = routes && routes[2]
  return (first && [...breadcrumbs, mapBreadcrumb(first)]) || breadcrumbs
}
