import { TOKEN } from "../core/constants/constants"

export const setToken = (object: Object) => {
  const payload = JSON.stringify(object)
  localStorage.setItem(TOKEN, payload)
}

export const getToken = () => {

  const payload = localStorage.getItem(TOKEN)
  if (payload === null) return {}

  return JSON.parse(payload) as Object

}
