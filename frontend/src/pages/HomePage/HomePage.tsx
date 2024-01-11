import { FC } from 'react';
import AddIcon from '@/assets/icons/add.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import NoCards from '@/components/business/NoCards/NoCards';
import TopBar from '@/components/business/TopBar/TopBar';

const HomePage: FC = () => {
  return (
    <>
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
    </>
  );
};

export default HomePage;
