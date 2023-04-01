export class Reserva
{
    idPaquete: number | undefined;
    idReserva: number | undefined;
    fechaRegistro: Date | undefined;
    fechaReserva: Date | undefined;
    hora: string = '';
    cantPersonas: number | undefined;
    idLogin: number | undefined;
    correo:string|undefined;
    nombres: string | undefined;
    apellido: string | undefined;
    telefono: string | undefined;
    flagTipoReserva: number | undefined;
    acompaniante: number | undefined;
    totalPago: number | undefined;
};

export interface IReserva
{
    idReserva?: number | undefined;
    idPaquete: number ;
    fechaRegistro: string | null;
    fechaReserva: string;
    fechaModificacion?: string;
    hora: string;
    cantPersonas: number;
    idLogin: number;
    correo?: string;
    nombres: string;
    apellido: string;
    telefono: string;
    flagTipoReserva: number;
    acompaniante: number;
    totalPago: number;
    email?: string;
    dni?: string;
    estado?: string;
};
