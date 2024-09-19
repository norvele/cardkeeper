import ArrowBack from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TextInput from '@/components/UI/textInput/TextInput';
import FullCardList from '@/components/business/FullCardList/FullCardList';
import Resolver from '@/components/business/Resolver/Resolver';
import TopBar from '@/components/business/TopBar/TopBar';
import styles from '@/pages/CustomDeckSettingsPage/customDeckSettingsPage.module.scss';
import { $cardList, $deck, $paginationOptions, fetchCardsFx, fetchDeckFx, fetchMoreCardsFx, showMoreCardsEvent } from '@/store/deckSettingsStore';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CustomDeckSettingsPage = () => {
  const [deck, cardList, paginationOptions] = useUnit([$deck, $cardList, $paginationOptions])
  const [fetchDeck, fetchCards, fetchMoreCards] = useUnit([fetchDeckFx, fetchCardsFx, fetchMoreCardsFx]) 

  const [buttonIsVisible, setButtonIsVisible] = useState(true)
  
  const { id } = useParams() as { id: string };

  const resolverCallbacks = [
    () => fetchDeck(id),
    () => fetchCards({deckId: id, limitCards: 3, currentPage: 1})
  ]
  
  let countOfShowMore = deck && paginationOptions.totalCardsCount ? paginationOptions.totalCardsCount - paginationOptions.limitCards * paginationOptions.currentPage : 0
  
  function onClickShowMore() {
    setButtonIsVisible(false)
    if (paginationOptions.totalCardsCount) {
      fetchMoreCards({deckId: id, from: paginationOptions.limitCards * paginationOptions.currentPage + 1, countOfCards: paginationOptions.totalCardsCount - paginationOptions.limitCards})
    }
  }

  useEffect(() => {
    fetchCardsFx({deckId: id, limitCards: paginationOptions.limitCards, currentPage: paginationOptions.currentPage})
  }, [paginationOptions.currentPage])

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
      <Resolver callbacks={resolverCallbacks} >
        <p className={styles.inputName}>Deck Name</p>
        <TextInput textSize="normal" onChange={() => {}} value={deck ? deck.name : ''} />
        <p className={styles.includes}>Includes {deck?.numberOfCard} cards</p>
        <div className={styles.list}>
          {cardList ? <FullCardList cards={cardList} /> : <></>}
        </div>
        <div className={styles.button}>
          {buttonIsVisible ? <Button size="regular" variant="default" onClick={onClickShowMore}>
            Show {countOfShowMore} more
          </Button> : <></>}
        </div>
      </Resolver>
    </>
  );
};

export default CustomDeckSettingsPage;
