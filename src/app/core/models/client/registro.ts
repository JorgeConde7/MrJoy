export interface IRegistro {
    idCliente?: number|'';
    nombres: string;
    apePaterno: string;
    apeMaterno:string;
    telefono: string;
    correo: string;
    genero:string;
    direccion:string;
    dni:string;
    fechaNacimiento: string;
    usuario: string,
    contrasenia: string,
    tipouser: string,
    contraseniaConfirm:string
}
