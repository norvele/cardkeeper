import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArrowBack from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TextInput from '@/components/UI/textInput/TextInput';
import FullCardList from '@/components/business/FullCardList/FullCardList';
import Resolver from '@/components/business/Resolver/Resolver';
import TopBar from '@/components/business/TopBar/TopBar';
import styles from '@/pages/CustomDeckSettingsPage/customDeckSettingsPage.module.scss';
import {
  $cardList,
  $deck,
  $paginationOptions,
  fetchCardsFx,
  fetchDeckFx,
  setNextPageEvent,
} from '@/store/deckSettingsStore';

const CustomDeckSettingsPage = () => {
  const [deck, cardList, paginationOptions] = useUnit([
    $deck,
    $cardList,
    $paginationOptions,
  ]);
  const setNextPage = useUnit(setNextPageEvent);
  const [fetchDeck, fetchCards, cardsIsLoading] = useUnit([
    fetchDeckFx,
    fetchCardsFx,
    fetchCardsFx.pending,
  ]);

  const { id } = useParams() as { id: string };

  const resolverCallbacks = [
    () => fetchDeck(id),
    () =>
      fetchCards({
        deckId: id,
        currentPage: paginationOptions.currentPage,
        limitCards: paginationOptions.limitCards,
      }),
  ];

  function onClickShowMore() {
    setNextPage();
  }

  useEffect(() => {
    fetchCards({
      deckId: id,
      currentPage: paginationOptions.currentPage,
      limitCards: paginationOptions.limitCards,
    });
  }, [paginationOptions.currentPage]);

  return (
    <>
      <TopBar
        leftSlot={
          <IconButton size="small" variant="primary" onClick={() => {}}>
            <ArrowBack />
          </IconButton>
        }
        rightSlot={
          <Button
            size="small"
            variant="primary"
            icon={<CheckIcon />}
            onClick={() => {}}
          >
            Save
          </Button>
        }
        title={deck ? deck.name : ''}
      />
      <Resolver callbacks={resolverCallbacks}>
        <p className={styles.inputName}>Deck Name</p>
        <TextInput
          textSize="normal"
          onChange={() => {}}
          value={deck ? deck.name : ''}
        />
        <p className={styles.includes}>Includes {deck?.numberOfCard} cards</p>
        <div className={styles.list}>
          {cardList ? <FullCardList cards={cardList} /> : <></>}
        </div>
        <div className={styles.button}>
          {cardsIsLoading ? (
            <>Loading...</>
          ) : (
            <Button
              size="regular"
              variant="default"
              onClick={onClickShowMore}
              disabled={cardsIsLoading}
            >
              Show {paginationOptions.limitCards} more
            </Button>
          )}
        </div>
      </Resolver>
    </>
  );
};

export default CustomDeckSettingsPage;
