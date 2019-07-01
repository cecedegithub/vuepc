const lca = window.localStorage
const userinfo = 'user_info'

export function getUser (data) {
  return JSON.parse(lca.getItem(userinfo))
}
export function saveUser (data) {
  lca.setItem(userinfo, JSON.stringify(data))
}

export function removeUser (data) {
  lca.removeItem(userinfo)
}
