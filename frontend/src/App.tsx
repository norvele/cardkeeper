import { RouterProvider } from 'react-router-dom';
import Layout from '@/components/business/Layout/Layout';
import { router } from '@/router/Router';

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
