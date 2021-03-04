import { axiosIntance } from '../config/AxiosConfig';
import { ordenInterface } from 'app/feature/Orden/models/Orden';

export const OrdenRepositorio = {
  consultarOrden: (id: number) => axiosIntance.get(`/orden/${id}`),
  consultarOrdenes: () => axiosIntance.get('/orden'),
  agregarOrden: (orden: ordenInterface) => axiosIntance.post('/orden', orden),
  actualizarOrden: (id: number, orden: ordenInterface) =>
    axiosIntance.put(`/orden/${id}`, { orden }),
  eliminarOrden: (id: number) => axiosIntance.delete(`/orden/${id}`),
};
