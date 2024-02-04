import { ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ConfirmModal from '@/components/business/ConfirmModal/ConfirmModal';
import Layout from '@/components/business/Layout/Layout';
import { router } from '@/router/Router';
import { modalState } from '@/store/modalStore';

function App() {
  const { name: nameModal } = useRecoilValue(modalState);

  let modal: ReactNode | null;

  switch (nameModal) {
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
      {modal}
    </Layout>
  );
}

export default App;
