export interface IReserva
{
    idReserva?: number | undefined;
    idPaquete: number ;
    fechaRegistro: string | null;
    fechaReserva: string;
    //fechaModificacion: string;
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
    diferenciaPagar?: number;
};
