import { ordenPeticion } from 'app/feature/Orden/models/Orden';

export interface EstadoOrden {
  ordenes: ordenPeticion[];
  orden: ordenPeticion;
  updated: number;
}
