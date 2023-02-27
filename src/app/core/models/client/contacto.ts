export class Contacto
{
    idContacto!: number;
    nombres!: string;
    correo!: string;
    telefono!: string;
    asunto!: string;
    estado!: string;
    descripcion!: string;
    fechaRegistro!: Date;

    constructor(nombres: string, correo: string, telefono: string,
        asunto: string, estado: string, descripcion: string, 
        fechaRegistro: Date) {
            this.nombres = nombres;
            this.correo = correo;
            this.telefono = telefono;
            this.asunto = asunto;
            this.estado = estado;
            this.descripcion = descripcion;
            fechaRegistro = fechaRegistro;
        }
}