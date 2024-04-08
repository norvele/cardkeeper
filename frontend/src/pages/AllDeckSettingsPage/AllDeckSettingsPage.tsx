import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@/assets/icons/add.svg?react';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TextInput from '@/components/UI/textInput/TextInput';
import MiniCardList from '@/components/business/MiniCardList/MiniCardList';
import MiniCardSkeleton from '@/components/business/MiniCardSkeleton/MiniCardSkeleton';
import Resolver from '@/components/business/Resolver/Resolver';
import TopBar from '@/components/business/TopBar/TopBar';
import { useDebounce } from '@/hooks/useDebounce';
import styles from '@/pages/AllDeckSettingsPage/allDeckSettingsPage.module.scss';
import {
  $cardList,
  $editingDeck,
  $mode,
  $paginationOptions,
  $selectedCards,
  $textInputValue,
  changeTextInput,
  fetchCards,
  fetchCardsFx,
  fetchEditingDeckFx,
  fetchFilteredCards,
  selectCard,
  setMode,
  setNextPage,
  setPage,
} from '@/store/allDeckSettingsStore';
import { showModal } from '@/store/modalStore';
import { ICard } from '@/types';

const AllDeckSettingsPage = () => {
  const { ref, inView, entry } = useInView({ threshold: 0 });

  const [shadowIsVisible, setShadowIsVisible] = useState(false);

  const { currentPage, limitCards, totalPageCount } =
    useUnit($paginationOptions);
  const [editingDeck, fetchEditingDeck] = useUnit([
    $editingDeck,
    fetchEditingDeckFx,
  ]);
  const [cardList, cardsIsLoading] = useUnit([$cardList, fetchCardsFx.pending]);
  const mode = useUnit($mode);
  const selectedCards = useUnit($selectedCards);
  const textInputValue = useUnit($textInputValue);

  const navigate = useNavigate();

  const { id: deckId } = useParams() as { id: string };

  const resolverCallbacks = [
    () => fetchEditingDeck(deckId),
    () => {
      fetchCards({ deckId, limitCards, currentPage });
    },
  ];

  useEffect(() => {
    const canLoad = currentPage < totalPageCount;
    const isLoading = cardsIsLoading || !cardList?.length;

    if (entry?.isIntersecting && canLoad && !isLoading) {
      setNextPage();
    }
  }, [inView]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShadowIsVisible(true);
      } else {
        setShadowIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    setMode('normal');

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (textInputValue) {
      fetchFilteredCards({
        deckId,
        limitCards,
        currentPage,
        search: textInputValue,
      });
    } else {
      fetchCards({ deckId, limitCards, currentPage });
    }
  }, [currentPage]);

  const debounce = useDebounce();

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
    changeTextInput({ deckId, search: value, currentPage, limitCards });
    debounce(() => {
      setPage(1);
      fetchFilteredCards({ deckId, search: value, currentPage, limitCards });
    }, 550);
  }

  return (
    <>
      <Resolver callbacks={resolverCallbacks}>
        {mode === 'normal' && (
          <div>
            <div
              className={clsx(styles.topContent, {
                [styles.shadow]: shadowIsVisible,
              })}
            >
              <TopBar
                leftSlot={
                  <IconButton
                    variant="primary"
                    size="small"
                    onClick={onClickGoToBack}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                }
                title={editingDeck?.name}
                rightSlot={
                  <IconButton variant="primary" size="small">
                    <AddIcon />
                  </IconButton>
                }
              />
              <TextInput
                placeholder="Search"
                icon={<SearchIcon />}
                onChange={onChangeTextInput}
                value={textInputValue}
              />
            </div>
            <main className={styles.main}>
              <MiniCardList
                mode="normal"
                cardList={cardList}
                onClickMore={cachedOnClickMore}
              />
            </main>
            {cardsIsLoading && <MiniCardSkeleton count={20} />}
          </div>
        )}

        {mode === 'selecting' && (
          <div>
            <div
              className={clsx(styles.topContent, {
                [styles.shadow]: shadowIsVisible,
              })}
            >
              <TopBar
                leftSlot={
                  <IconButton
                    variant="primary"
                    size="small"
                    onClick={onClickCancel}
                  >
                    <CloseIcon />
                    <p>{selectedCards.length}</p>
                  </IconButton>
                }
                rightSlot={
                  <IconButton
                    variant="primary"
                    size="small"
                    color="red"
                    onClick={onClickDeleteFewCards}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />
              <TextInput
                placeholder="Search"
                icon={<SearchIcon />}
                onChange={onChangeTextInput}
                value={textInputValue}
              />
            </div>
            <main className={styles.main}>
              <MiniCardList
                mode="selecting"
                cardList={cardList}
                onClickMore={cachedOnClickMore}
              />
            </main>
            {cardsIsLoading && <MiniCardSkeleton count={20} />}
          </div>
        )}
      </Resolver>
      <div className={styles.lastElement} ref={ref} />
    </>
  );
};

export default AllDeckSettingsPage;
