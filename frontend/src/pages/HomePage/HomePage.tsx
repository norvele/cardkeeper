import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';
import AddIcon from '@/assets/icons/add.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import DynamicDeckDisplay from '@/components/business/DynamicDeckDisplay/DynamicDeckDisplay';
import Resolver from '@/components/business/Resolver/Resolver';
import TopBar from '@/components/business/TopBar/TopBar';
import { $decks, fetchDecks } from '@/store/decksStore';

const HomePage = () => {
  const decks = useUnit($decks);

  const resolverCallbacks = [
    () => {
      if (decks === null) {
        fetchDecks();
      }
    },
  ];

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
        <Resolver callbacks={resolverCallbacks}>
          <DynamicDeckDisplay decks={decks && decks} />
        </Resolver>
      </main>
    </>
  );
};

export default HomePage;
