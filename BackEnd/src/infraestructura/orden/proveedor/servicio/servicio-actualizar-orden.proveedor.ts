import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { ServicioActualizarOrden } from 'src/dominio/orden/servicio/servicio-actualizar-orden';

export function servicioActualizarOrdenProveedor(repositorioOrden: RepositorioOrden) {
  return new ServicioActualizarOrden(repositorioOrden);
}
