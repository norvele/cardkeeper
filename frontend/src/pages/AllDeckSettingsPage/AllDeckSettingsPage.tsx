import { useUnit } from 'effector-react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@/assets/icons/add.svg?react';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TextInput from '@/components/UI/textInput/TextInput';
import DeckSettingsLayout from '@/components/business/DeckSettingsLayout/DeckSettingsLayout';
import MiniCardList from '@/components/business/MiniCardList/MiniCardList';
import MiniCardSkeleton from '@/components/business/MiniCardSkeleton/MiniCardSkeleton';
import TopBar from '@/components/business/TopBar/TopBar';
import { useDebounce } from '@/hooks/useDebounce';
import styles from '@/pages/AllDeckSettingsPage/allDeckSettingsPage.module.scss';
import {
  $cardList,
  $mode,
  $paginationOptions,
  $selectedCards,
  $textInputValue,
  changeTextInput,
  fetchSearchedCardsFx,
  resetCardList,
  resetInput,
  resetSelectedCards,
  selectCard,
  setMode,
  setNextPage,
  unSelectCard,
} from '@/store/allDeckSettingsStore';
import { showModal } from '@/store/modalStore';
import { ICard } from '@/types';

const AllDeckSettingsPage = () => {
  const debounce = useDebounce();

  const { currentPage, limitCards, totalPageCount } =
    useUnit($paginationOptions);
  const [cardList, cardsIsLoading, fetchSearchedCards] = useUnit([
    $cardList,
    fetchSearchedCardsFx.pending,
    fetchSearchedCardsFx,
  ]);
  const mode = useUnit($mode);
  const selectedCards = useUnit($selectedCards);
  const textInputValue = useUnit($textInputValue);

  const navigate = useNavigate();

  const fetch = (
    page: number = currentPage,
    value: string = textInputValue,
  ) => {
    fetchSearchedCards({
      deckId: 'all',
      limitCards,
      currentPage: page,
      value,
    });
  };

  useEffect(() => {
    fetch();

    return () => {
      resetCardList();
      resetInput();
    };
  }, []);

  useEffect(() => {
    if (mode === 'normal') {
      resetSelectedCards();
    }
  }, [mode]);

  useEffect(() => {
    if (cardList.length >= limitCards) fetch();
  }, [currentPage]);

  function onClickGoToBack() {
    navigate(-1);
  }

  function onClickCancel() {
    setMode('normal');
  }

  const cachedOnClickMore = useCallback(function onClickMore(card: ICard) {
    showModal({
      name: 'cardListContext',
      params: {
        cardText: card.frontText,
        buttons: [
          {
            textButton: 'Select',
            callback: () => {
              selectCard(card.id);
              setMode('selecting');
            },
          },
          {
            textButton: 'Edit',
            callback: () => {
              navigate(`/edit-card/${card.id}`);
            },
          },
          {
            textButton: 'Delete',
            textColor: 'red',
            callback: () => {
              showModal({
                name: 'confirmation',
                params: {
                  notification: 'Are you sure you want to delete this card?',
                  textButton: 'Delete',
                  callback: () => setMode('normal'),
                },
              });
            },
          },
        ],
      },
    });
  }, []);

  function onClickDeleteFewCards() {
    showModal({
      name: 'confirmation',
      params: {
        notification: `Are you sure you want to delete ${selectedCards.length} cards from all decks?`,
        callback: () => setMode('normal'),
        textButton: 'Delete',
      },
    });
  }

  function onChangeTextInput(value: string) {
    changeTextInput(value);
    window.scrollTo(0, 0);

    debounce(() => {
      resetCardList();
      fetch(1, value);
    }, 550);
  }

  const cachedToggleCardSelection = useCallback(function toggleCardSelection(
    id: string,
    isChecked: boolean,
  ) {
    if (isChecked) {
      selectCard(id);
    } else {
      unSelectCard(id);
    }
  }, []);

  const isNormalMode = mode === 'normal';

  return (
    <>
      <DeckSettingsLayout
        TopBar={
          <TopBar
            leftSlot={
              <IconButton
                variant="primary"
                size="small"
                onClick={isNormalMode ? onClickGoToBack : onClickCancel}
              >
                {isNormalMode ? (
                  <ArrowBackIcon />
                ) : (
                  <>
                    <CloseIcon />
                    <p>{selectedCards.length}</p>
                  </>
                )}
              </IconButton>
            }
            title={isNormalMode ? 'All Cards' : ''}
            rightSlot={
              isNormalMode ? (
                <IconButton variant="primary" size="small">
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton
                  variant="primary"
                  size="small"
                  color="red"
                  onClick={onClickDeleteFewCards}
                >
                  <DeleteIcon />
                </IconButton>
              )
            }
          />
        }
      >
        <TextInput
          textSize="normal"
          placeholder="Search"
          icon={<SearchIcon />}
          onChange={onChangeTextInput}
          value={textInputValue}
        />
        <main className={styles.main}>
          <MiniCardList
            cardList={cardList}
            cardsIsLoading={cardsIsLoading}
            currentPage={currentPage}
            totalPageCount={totalPageCount}
            onClickMore={cachedOnClickMore}
            onNextPage={setNextPage}
            selectedCards={selectedCards}
            onChangeCheckbox={
              isNormalMode ? undefined : cachedToggleCardSelection
            }
          />
        </main>
        {cardsIsLoading && <MiniCardSkeleton count={20} />}
      </DeckSettingsLayout>
    </>
  );
};

export default AllDeckSettingsPage;
