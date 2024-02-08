import { ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import ConfirmModal from '@/components/business/ConfirmModal/ConfirmModal';
import Layout from '@/components/business/Layout/Layout';
import { useModal } from '@/hooks/useModal';
import { router } from '@/router/Router';

function App() {
  const { currentModal } = useModal();

  let modal: ReactNode | null;

  switch (currentModal) {
    case 'confirmation':
      modal = <ConfirmModal />;
      break;
    default:
      modal = null;
      break;
  }

  return (
    <Layout>
      <RouterProvider router={router} />
      {modal}
    </Layout>
  );
}

export default App;
