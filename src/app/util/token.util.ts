import { TOKEN } from "../core/constants/constants"

export const setToken = (token: string) => {
  // const payload = JSON.stringify(object)
  localStorage.setItem(TOKEN, token)
}

export const getToken = () => {

  const payload = localStorage.getItem(TOKEN)
  if (payload === null) return ""

  return payload

}
