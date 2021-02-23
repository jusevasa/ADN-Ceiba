import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { RepositorioOrdenImp } from 'src/infraestructura/orden/adaptador/repositorio/repositorio-orden';

export const repositorioOrdenProvider = {
  provide: RepositorioOrden,
  useClass: RepositorioOrdenImp,
};
