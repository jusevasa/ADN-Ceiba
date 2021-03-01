import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { ServicioEliminarOrden } from 'src/dominio/orden/servicio/servicio-eliminar-orden';

export function servicioEliminarOrdenProveedor(repositorioOrden: RepositorioOrden) {
  return new ServicioEliminarOrden(repositorioOrden);
}
