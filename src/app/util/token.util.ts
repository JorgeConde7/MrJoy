import { TOKEN, TOKEN_EMPLEADO } from "../core/constants/constants"
import jwt_decode from "jwt-decode";
import { LoginResponse } from "../core/models/response/login.response";

export const setToken = (token: string) => {
  // const payload = JSON.stringify(object)
  localStorage.setItem(TOKEN, token)
}

export const getPayload = () => {
  const payload = localStorage.getItem(TOKEN)
  if (payload === null) return null

  return jwt_decode(payload) as LoginResponse
}

export const getToken = () => {
  const payload = localStorage.getItem(TOKEN)
  if (payload === null) return ""

  return payload
}

export const hasToken = () => {
  const payload = getPayload()
  return payload !== null
}

// ^menejo de token para empleado y admin
export const setTokenEmpleado = (token: string) => {
  localStorage.setItem(TOKEN_EMPLEADO, token)
}

export const getPayloadEmpleado  = () => {
  const payload = localStorage.getItem(TOKEN_EMPLEADO)
  if (payload === null) return null

  return jwt_decode(payload) as LoginResponse
}

export const getTokenEmpleado  = () => {
  const payload = localStorage.getItem(TOKEN_EMPLEADO)
  if (payload === null) return ""

  return payload
}

export const hasTokenEmpleado  = () => {
  const payload = getPayloadEmpleado()
  return payload !== null
}
