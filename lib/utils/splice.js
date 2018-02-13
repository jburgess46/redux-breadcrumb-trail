export default function splice (state, payload) {
  let breadcrumbs = [...state.breadcrumbs]
  return breadcrumbs.splice(1,1)
}
