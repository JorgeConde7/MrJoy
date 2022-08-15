export class Promociones{
    id_promociones:number|undefined;
    descripcion:string|undefined;
    promociones:string|undefined;
    foto: string|undefined;
    
}

export interface IPromociones{
    id_promociones:number;
    descripcion:string;
    promociones:string;
    foto: string;
}