import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import SettingsIcon from '@/assets/icons/settings.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import LearningCard from '@/components/business/LearningCard/LearningCard';
import LearningPanel from '@/components/business/LearningPanel/LearningPanel';
import TopBar from '@/components/business/TopBar/TopBar';
import { cardApiService } from '@/container';
import styles from '@/pages/LearningPage/learningPage.module.scss';
import { editCard } from '@/store/cardFormStore';
import { $openedDeck, fetchOpenedDeck } from '@/store/decksStore';
import {
  $learningCard,
  $learningCardIsFlipped,
  $learningCardSide,
  fetchLearningCard,
  fetchLearningCardFx,
  resetLearningCard,
  setLearningCardIsFlipped,
  toggleLearningCardSide,
} from '@/store/learningStore';

const LearningPage = () => {
  const learningCardIsFlipped = useUnit($learningCardIsFlipped);
  const learningCardSide = useUnit($learningCardSide);
  const [learningCard, loading] = useUnit([
    $learningCard,
    fetchLearningCardFx.pending,
  ]);

  const openedDeck = useUnit($openedDeck);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      resetLearningCard();
      fetchLearningCard(id);
      fetchOpenedDeck(id);
    }
  }, []);

  const text =
    learningCardSide === 'front'
      ? learningCard.data?.card.frontText
      : learningCard.data?.card.backText;

  function onClickFlipCard() {
    setLearningCardIsFlipped(true);
    toggleLearningCardSide();
  }

  function onClickRotateCard() {
    toggleLearningCardSide();
  }

  function onClickEditCard() {
    navigate(`/edit-card/${learningCard.data?.card.id}`);
    editCard(learningCardSide);
  }

  function onClickGoToBack() {
    navigate(-1);
  }

  function onClickForgot() {
    if (id) {
      fetchLearningCard(id);
      cardApiService.forgotCard(id);
    }
  }

  function onClickKnow() {
    if (id) {
      fetchLearningCard(id);
      cardApiService.knowCard(id);
    }
  }

  return (
    <>
      <TopBar
        leftSlot={
          <IconButton variant="primary" size="small" onClick={onClickGoToBack}>
            <ArrowBackIcon />
          </IconButton>
        }
        title={openedDeck.data?.name}
        rightSlot={
          <Link to="/settings">
            <IconButton variant="primary" size="small">
              <SettingsIcon />
            </IconButton>
          </Link>
        }
      />
      <main className={styles.cards}>
        <LearningCard
          text={text}
          onClickEditCard={onClickEditCard}
          editingIsDisabled={loading}
        />
        <LearningPanel
          isFlipped={learningCardIsFlipped}
          loading={loading}
          onClickFlipCard={onClickFlipCard}
          onClickForgot={onClickForgot}
          onClickKnow={onClickKnow}
          onClickRotateCard={onClickRotateCard}
        />
      </main>
    </>
  );
};

export default LearningPage;
