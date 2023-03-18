
export interface DetalleBoleta {
  idTipoEntrada: number;
  cantidad: number;
  subTotal: number;
}

export interface Boleta {
  total: number;
  idLogin: number;
  detalleBoleta: DetalleBoleta[];
}
