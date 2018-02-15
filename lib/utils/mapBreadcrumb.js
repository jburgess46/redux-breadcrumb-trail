export default function mapBreadcrumb (route = {}, location = {}, params = {}, limit, exclude) {
  const { path, indexRoute, ignoreParams } = route
  const {
    breadcrumb = (indexRoute && indexRoute.breadcrumb) || 'Missing breadcrumb',
    breadcrumbKey = path || (indexRoute && (indexRoute.breadcrumbKey || indexRoute.path)) || '/',
    url = `${location.pathname || ''}${location.search || ''}` || '/'
  } = route

  console.log(exclude)
  if (breadcrumb === 'Home') {
    return {}
  }

  return {
    component: breadcrumb,
    breadcrumbKey,
    url,
    location,
    params: ignoreParams ? {} : params,
    current: true
  }
}
