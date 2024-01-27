import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@/assets/icons/add.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import DynamicDeckDisplay from '@/components/business/DynamicDeckDisplay/DynamicDeckDisplay';
import TopBar from '@/components/business/TopBar/TopBar';
// import styles from '@/pages/HomePage/homePage.module.scss';

const HomePage = () => {
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
          <Link to="/create-card">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
        }
      />
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicDeckDisplay />
      </Suspense>
    </>
  );
};

export default HomePage;
