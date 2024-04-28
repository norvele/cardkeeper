import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
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
  $mode,
  $paginationOptions,
  $selectedCards,
  $textInputValue,
  changeTextInput,
  fetchCards,
  fetchCardsFx,
  resetCardList,
  selectCard,
  setMode,
  setNextPage,
} from '@/store/allDeckSettingsStore';
import { showModal } from '@/store/modalStore';
import { ICard } from '@/types';

const AllDeckSettingsPage = () => {
  const { ref, inView, entry } = useInView({ threshold: 0 });

  const debounce = useDebounce();

  const [shadowIsVisible, setShadowIsVisible] = useState(false);

  const { currentPage, limitCards, totalPageCount } =
    useUnit($paginationOptions);
  const [cardList, cardsIsLoading] = useUnit([$cardList, fetchCardsFx.pending]);
  const mode = useUnit($mode);
  const selectedCards = useUnit($selectedCards);
  const textInputValue = useUnit($textInputValue);

  const navigate = useNavigate();

  const resolverCallbacks = [
    () => {
      fetchCards({ deckId: 'all', limitCards, currentPage });
    },
  ];

  useEffect(() => {
    resetCardList();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShadowIsVisible(true);
      } else {
        setShadowIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canLoad = currentPage < totalPageCount;
    const isLoading = cardsIsLoading || !cardList?.length;

    if (entry?.isIntersecting && canLoad && !isLoading) {
      setNextPage();
    }
  }, [inView]);

  useEffect(() => {
    debounce(() => {
      resetCardList();
      window.scrollTo(0, 0);
      fetchCards({
        deckId: 'all',
        limitCards,
        currentPage,
        search: textInputValue,
      });
    }, 550);
  }, [textInputValue]);

  useEffect(() => {
    if (cardList.length >= limitCards)
      fetchCards({
        deckId: 'all',
        limitCards,
        currentPage,
        search: textInputValue,
      });
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
    changeTextInput({ deckId: 'all', search: value, currentPage, limitCards });
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
                title="All Cards"
                rightSlot={
                  <IconButton variant="primary" size="small">
                    <AddIcon />
                  </IconButton>
                }
              />
              <TextInput
                textSize="normal"
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
                textSize="normal"
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
