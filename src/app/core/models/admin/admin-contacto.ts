export interface Contacto {
  idContacto: number;
  nombres: string;
  correo: string;
  telefono: string;
  asunto?: string;
  descripcion: string;
  fechaRegistro: string;
  estado: string;
  respuestaAtencion?: string;
  idLogin: number;
}

export interface IContacto {
  id_Contacto: number | undefined;
  nombres: string | undefined;
  correo: string | undefined;
  telefono: string | undefined;
  asunto: string | undefined;
  descripcion: string | undefined;
  estado: string | undefined;
}
