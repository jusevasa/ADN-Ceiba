import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorGestionOrdenes } from '../hoc/ProveedorGestionOrdenes';
import { RouteComponentProps } from 'react-router-dom';

const MainPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="Ordenes" description="Gestión de ordenes">
      <ProveedorGestionOrdenes />
    </Layout>
  );
};

MainPage.displayName = 'OrdenesMainPage';

export default MainPage;
