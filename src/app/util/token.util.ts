import { TOKEN } from "../core/constants/constants"
import jwt_decode from "jwt-decode";
import { LoginResponse } from "../core/models/response/login.response";

export const setToken = (token: string) => {
  // const payload = JSON.stringify(object)
  localStorage.setItem(TOKEN, token)
}

export const getToken = () => {
  const payload = localStorage.getItem(TOKEN)
  if (payload === null) return null

  return jwt_decode(payload) as LoginResponse

}
