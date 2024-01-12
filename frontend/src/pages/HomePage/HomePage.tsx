import { FC } from 'react';
import AddIcon from '@/assets/icons/add.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import Layout from '@/components/business/Layout/Layout';
import NoCards from '@/components/business/NoCards/NoCards';
import TopBar from '@/components/business/TopBar/TopBar';

const HomePage: FC = () => {
  return (
    <Layout>
      <TopBar
        leftSlot={
          <IconButton>
            <MenuIcon />
          </IconButton>
        }
        title="Card keeper"
        rightSlot={
          <IconButton>
            <AddIcon />
          </IconButton>
        }
      />
      <NoCards />
    </Layout>
  );
};

export default HomePage;
