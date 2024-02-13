import { RouterProvider } from 'react-router-dom';
import Layout from '@/components/business/Layout/Layout';
import ModalManager from '@/components/business/ModalManager/ModalManager';
import { router } from '@/router/Router';

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
      <ModalManager />
    </Layout>
  );
}

export default App;
