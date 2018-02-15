import isEqual from 'lodash/isEqual'
import last from 'lodash/last'
import some from 'lodash/some'
import ensureHasHome from './ensureHasHome'
import mapBreadcrumb from './mapBreadcrumb'

export default function push (state, {payload}) {
  if (!payload) {
    throw new Error('payload is required')
  }

  const { location = {}, params = {}, routes } = payload
  if (!routes || !routes.length) {
    throw new Error('routes must contain at least one route')
  }

  const action = location.state && location.state.breadcrumb
  let breadcrumbs = action === 'reset' ? [] : [...state.breadcrumbs]

  const current = routes.reduce((memo, route) => route.useParentBreadcrumb ? memo : route)
  const breadcrumb = mapBreadcrumb(current, location, { ...params })

  const matchBreadcrumb = other => {
    if (breadcrumb.breadcrumbKey !== other.breadcrumbKey) {
      return false
    }

    return isEqual(breadcrumb.params, other.params)
  }

  if (breadcrumbs.length > 1 && location.action === 'REPLACE') {
    breadcrumbs.pop()
  }
  if (breadcrumbs.length > 3 && location.action === 'PUSH') {
    breadcrumbs.splice(1,1)
  }

  while (some(breadcrumbs, matchBreadcrumb)) {
    breadcrumbs.pop()
  }

  if (breadcrumbs.length > 0) {
    last(breadcrumbs).current = false
  }
  if (breadcrumb) {
    breadcrumbs.push(breadcrumb)
  }
  return breadcrumbs
}
