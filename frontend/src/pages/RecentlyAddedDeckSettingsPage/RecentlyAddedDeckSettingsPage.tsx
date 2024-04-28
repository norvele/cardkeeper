import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TextInput from '@/components/UI/textInput/TextInput';
import MiniCardList from '@/components/business/MiniCardList/MiniCardList';
import MiniCardSkeleton from '@/components/business/MiniCardSkeleton/MiniCardSkeleton';
import TopBar from '@/components/business/TopBar/TopBar';
import { useDebounce } from '@/hooks/useDebounce';
import styles from '@/pages/RecentlyAddedDeckSettingsPage/recentlyAddedDeckSettingsPage.module.scss';
import { showModal } from '@/store/modalStore';
import {
  saveDeck,
  $inputValueIsValid,
  $cardList,
  $paginationOptions,
  $textInputValue,
  changeTextInput,
  fetchCardsWithReset,
  fetchCardsFx,
  resetCardList,
  resetInput,
  setNextPage,
} from '@/store/recentlyAddedDeckSettingsStore';
import { ICard } from '@/types';

const RecentlyAddedDeckSettingsPage = () => {
  const { ref, inView, entry } = useInView({ threshold: 0 });

  const debounce = useDebounce();

  const [shadowIsVisible, setShadowIsVisible] = useState(false);

  const { currentPage, limitCards, totalPageCount } =
    useUnit($paginationOptions);
  const [cardList, cardsIsLoading, fetchCards] = useUnit([
    $cardList,
    fetchCardsFx.pending,
    fetchCardsFx,
  ]);
  const textInputValue = useUnit($textInputValue);
  const inputValueIsValid = useUnit($inputValueIsValid);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCards({ deckId: 'recentlyAdded', limitCards, currentPage });

    return () => {
      resetCardList();
      resetInput();
    };
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
    if (cardList.length >= limitCards)
      fetchCards({
        deckId: 'recentlyAdded',
        limitCards,
        currentPage,
        value: textInputValue,
      });
  }, [currentPage]);

  function onClickGoToBack() {
    navigate(-1);
  }

  const cachedOnClickMore = useCallback(function onClickMore(card: ICard) {
    showModal({
      name: 'cardListContext',
      params: {
        cardText: card.frontText,
        buttons: [
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
                  callback: () => {},
                },
              });
            },
          },
        ],
      },
    });
  }, []);

  function onChangeTextInput(value: string) {
    changeTextInput(value);
    window.scrollTo(0, 0);

    debounce(() => {
      fetchCardsWithReset({
        deckId: 'resentlyAdded',
        limitCards,
        currentPage: 1,
        value,
      });
    }, 550);
  }

  function onClickSave() {
    // saveDeck({ deckId, cardList });
    navigate(-1);
  }

  return (
    <>
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
          title="Recently added"
          rightSlot={
            <Button
              variant="primary"
              icon={<CheckIcon />}
              size="small"
              onClick={onClickSave}
            >
              Save
            </Button>
          }
        />
      </div>
      <p className={styles.infoForInput}>Number of cards in the deck</p>
      <TextInput
        onChange={onChangeTextInput}
        value={textInputValue}
        textSize="large"
      />
      {!inputValueIsValid && <p className={styles.invalid}>Must be a number</p>}
      <p className={styles.currentCards}>Current cards</p>
      <main className={styles.main}>
        <MiniCardList
          mode="normal"
          cardList={cardList}
          onClickMore={cachedOnClickMore}
        />
      </main>
      {cardsIsLoading && <MiniCardSkeleton count={20} />}
      <div className={styles.lastElement} ref={ref} />
    </>
  );
};

export default RecentlyAddedDeckSettingsPage;
