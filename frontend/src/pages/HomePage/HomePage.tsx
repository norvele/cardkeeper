import AddIcon from '@/assets/icons/add.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import DeckList from '@/components/business/DeckList/DeckList';
import Layout from '@/components/business/Layout/Layout';
import NoCards from '@/components/business/NoCards/NoCards';
import TopBar from '@/components/business/TopBar/TopBar';
import styles from '@/pages/HomePage/homePage.module.scss';

const HomePage = () => {
  const cardsLength: number = 0;

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
      {cardsLength === 0 ? (
        <main className={styles.nocards}>
          <NoCards />
        </main>
      ) : (
        <main className={styles.decklist}>
          <DeckList cardsLength={cardsLength} />
        </main>
      )}
    </Layout>
  );
};

export default HomePage;
