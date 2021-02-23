import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { ServicioCrearOrden } from 'src/dominio/orden/servicio/servicio-crear-orden';

export function servicioCrearOrdenProveedor(repositorioOrden: RepositorioOrden) {
  return new ServicioCrearOrden(repositorioOrden);
}
