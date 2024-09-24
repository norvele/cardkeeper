import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBack from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TextInput from '@/components/UI/textInput/TextInput';
import Divider from '@/components/business/Divider/Divider';
import FullCardList from '@/components/business/FullCardList/FullCardList';
import Resolver from '@/components/business/Resolver/Resolver';
import TopBar from '@/components/business/TopBar/TopBar';
import styles from '@/pages/CustomDeckSettingsPage/customDeckSettingsPage.module.scss';
import {
  $cardList,
  $deck,
  $mode,
  $paginationOptions,
  $selectedCards,
  fetchCardsFx,
  fetchDeckFx,
  resetSelectedCardsEvent,
  selectCardEvent,
  setModeEvent,
  setNextPageEvent,
  unSelectCardEvent,
} from '@/store/deckSettingsStore';
import { showModal } from '@/store/modalStore';

const CustomDeckSettingsPage = () => {
  const [deck, cardList, paginationOptions, mode, selectedCards] = useUnit([
    $deck,
    $cardList,
    $paginationOptions,
    $mode,
    $selectedCards,
  ]);

  const [setNextPage, selectCard, unSelectCard, resetSelectedCards, setMode] =
    useUnit([
      setNextPageEvent,
      selectCardEvent,
      unSelectCardEvent,
      resetSelectedCardsEvent,
      setModeEvent,
    ]);

  const [fetchDeck, fetchCards, cardsIsLoading] = useUnit([
    fetchDeckFx,
    fetchCardsFx,
    fetchCardsFx.pending,
  ]);

  const navigate = useNavigate();

  const { id } = useParams() as { id: string };

  useEffect(() => {
    fetchCards({
      deckId: id,
      currentPage: paginationOptions.currentPage,
      limitCards: paginationOptions.limitCards,
    });
  }, [paginationOptions.currentPage]);

  useEffect(() => {
    if (selectedCards.length === 0) {
      setMode('normal');
    } else {
      setMode('selecting');
    }
  }, [selectedCards]);

  const isNormalMode = mode === 'normal';

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

  function onClickGoToBack() {
    navigate(-1);
  }

  function onClickCancel() {
    resetSelectedCards();
  }

  function onClickCard(text: string, id: string) {
    if (mode === 'normal') {
      showModal({
        name: 'cardListContext',
        params: {
          buttons: [
            {
              textButton: 'Select',
              callback: () => {
                selectCard(id);
              },
            },
            {
              textButton: 'Edit',
              callback: () => {},
            },
            {
              textButton: 'Remove from deck',
              callback: () => {},
              textColor: 'red',
            },
          ],
          format: 'full',
          cardText: text,
        },
      });
    }

    if (mode === 'selecting') {
      const cardIsSelected = selectedCards.includes(id);

      if (!cardIsSelected) {
        selectCard(id);
      } else {
        unSelectCard(id);
      }
    }
  }

  return (
    <>
      <TopBar
        leftSlot={
          <IconButton
            size="small"
            variant="primary"
            onClick={isNormalMode ? onClickGoToBack : onClickCancel}
          >
            {isNormalMode ? <ArrowBack /> : <CloseIcon />}
          </IconButton>
        }
        rightSlot={
          isNormalMode ? (
            <Button
              size="small"
              variant="primary"
              icon={<CheckIcon />}
              onClick={() => {}}
            >
              Save
            </Button>
          ) : (
            <IconButton size="small" variant="primary" color="red">
              <DeleteIcon />
            </IconButton>
          )
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
          <FullCardList
            cards={cardList}
            onClickCard={onClickCard}
            selectedCards={selectedCards}
          />
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
        <Divider />
        <div className={styles.deleteButton}>
          <Button
            size="regular"
            variant="default"
            onClick={() => {}}
            fontColor="red"
          >
            Delete deck
          </Button>
        </div>
      </Resolver>
    </>
  );
};

export default CustomDeckSettingsPage;
