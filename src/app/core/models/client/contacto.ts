export class Contacto
{
    idContacto!: number;
    nombres!: string;
    correo!: string;
    telefono!: string;
    asunto!: string;
    descripcion!: string;
    fechaRegistro!: Date;
    estado!: string;
    usuarioAtencion!: string;
    fechaAtencion!: Date;
    respuestaAtencion!: string;
    idLogin!: number;

    

    constructor(nombres: string, correo: string, telefono: string,
        asunto: string, estado: string, descripcion: string, 
        fechaRegistro: Date, idLogin: number) {
            this.nombres = nombres;
            this.correo = correo;
            this.telefono = telefono;
            this.asunto = asunto;
            this.estado = estado;
            this.descripcion = descripcion;
            this.fechaRegistro = fechaRegistro;
            //this.respuestaAtencion = respuestaAtencion;
            this.idLogin = idLogin;
        }
}