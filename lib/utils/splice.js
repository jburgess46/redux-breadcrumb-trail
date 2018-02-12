export default function splice (state, payload) {
  let breadcrumbs = [...state.breadcrumbs]
  console.log(breadcrumbs)
  breadcrumbs = breadcrumbs.length >= payload.payload.limit ? breadcrumbs.splice(1,1) : breadcrumbs
  console.log(breadcrumbs)
  return breadcrumbs
}
