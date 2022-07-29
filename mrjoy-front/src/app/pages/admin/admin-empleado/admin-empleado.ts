export class Empleado {
    id_empleado?: number | undefined;
    nombres: string | undefined;
    apellidos: string | undefined;
    telefono: number | undefined;
    correo: string | undefined;
    fechaNacimiento: string | undefined;
    turno: string | undefined;
    dni:string|undefined;
    idLogin?: number | undefined;

}

export interface IEmpleado {
    id_empleado?: number|'';
    nombres: string;
    apellidos: string;
    telefono: string;
    correo: string;
    dni:string;
    fechaNacimiento: string;
    turno: string;
    login?: ILogin;
    //
    usuario: string,
    contrasenia: string,
    tipouser: string
}

export interface ILogin {
    idLogin?: number | undefined,
    usuario: string,
    contrasenia: string,
    tipouser: string
}