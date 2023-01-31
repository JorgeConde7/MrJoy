export class Contacto{
  idContacto: number | undefined;
  nombres:string | undefined;
  correo:string | undefined;
  telefono:string | undefined;
  asunto:string | undefined;
  descripcion:string | undefined;
  estado:string | undefined;

}

export interface IContacto{
    id_Contacto: number | undefined;
      nombres:string | undefined;
      correo:string | undefined;
      telefono:string | undefined;
      asunto:string | undefined;
      descripcion:string | undefined;
      estado: string | undefined;
      
    }