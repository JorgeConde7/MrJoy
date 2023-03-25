export interface LoginResponse {
  id: number;
  profile: "empleado" | "cliente" | "admin";
  username: string;
  create_at: number;
  apellidos: string;
  nombres: string
  dni: string
  telefono: string
  correo: string
}
