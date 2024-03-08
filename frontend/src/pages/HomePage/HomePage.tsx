import { Link } from 'react-router-dom';
import AddIcon from '@/assets/icons/add.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import DynamicDeckDisplay from '@/components/business/DynamicDeckDisplay/DynamicDeckDisplay';
import TopBar from '@/components/business/TopBar/TopBar';

const HomePage = () => {
  return (
    <>
      <TopBar
        leftSlot={
          <IconButton size="small" variant="primary">
            <MenuIcon />
          </IconButton>
        }
        title="Card keeper"
        rightSlot={
          <Link to="/create-card">
            <IconButton size="small" variant="primary">
              <AddIcon />
            </IconButton>
          </Link>
        }
      />
      <main>
        <DynamicDeckDisplay />
      </main>
    </>
  );
};

export default HomePage;
