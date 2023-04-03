export class Cliente{
    id_cliente:number|undefined;
    nombres:string|undefined;
    apePaterno:string|undefined;
    apeMaterno:string|undefined;
    telefono: string|undefined;
    
    correo:string|undefined;
    dni:string|undefined;
    genero:string|undefined;
    direccion:string|undefined;
    fechaNacimiento:string|undefined;
    rutaImg: string | undefined;
}
export interface ICliente{
    id_cliente:number|undefined;
    nombres:string|undefined;
    apePaterno:string|undefined;
    apeMaterno:string|undefined;
    dni:string|undefined;
    telefono: string|undefined;
    correo:string|undefined;
    direccion:string|undefined;
    genero:string|undefined;
    fechaNacimiento:string|undefined;
    idLogin: number;
    rutaImg: string | undefined;
}