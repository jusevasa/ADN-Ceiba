import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
//import { ProveedorGestionProductos } from '../hoc/ProveedorGestionProductos';
import { RouteComponentProps } from 'react-router-dom';
import { GestionOrdenes } from '../contains/GestionOrdenes/index';

const MainPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="Ordenes" description="Gestión de ordenes">
      <GestionOrdenes />
    </Layout>
  );
};

MainPage.displayName = 'OrdenesMainPage';

export default MainPage;
