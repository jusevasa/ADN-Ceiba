import { DaoOrden } from 'src/dominio/orden/puerto/dao/dao-orden';
import { DaoOrdenMysql } from 'src/infraestructura/orden/adaptador/dao/dao-orden-mysql';

export const daoOrdenProvider = {
  provide: DaoOrden,
  useClass: DaoOrdenMysql,
};
