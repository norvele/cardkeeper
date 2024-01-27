import { ReactNode } from 'react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ConfirmModal from '@/components/business/ConfirmModal/ConfirmModal';
import Layout from '@/components/business/Layout/Layout';
import { router } from '@/router/Router';
import { modalState } from '@/store/modalStore';

function App() {
  const typeModal = useRecoilValue(modalState);

  let modal: ReactNode | null;

  switch (typeModal) {
    case 'confirm':
      modal = <ConfirmModal />;
      break;
    default:
      modal = null;
      break;
  }

  return (
    <Layout>
      <RouterProvider router={router} />
      <BrowserRouter>{modal}</BrowserRouter>
    </Layout>
  );
}

export default App;
