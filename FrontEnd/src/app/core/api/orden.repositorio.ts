import { axiosIntance } from '../config/AxiosConfig';

export const OrdenRepositorio = {
  consultarOrden: (id: number) => axiosIntance.get(`/orden/${id}`),
  consultarOrdenes: () => axiosIntance.get(`/orden`),
  agregarOrden: () => axiosIntance.post(`/orden`),
  actualizarOrden: (id: number) => axiosIntance.put(`/orden/${id}`),
  eliminarOrden: (id: number) => axiosIntance.delete(`/orden/${id}`),
};
