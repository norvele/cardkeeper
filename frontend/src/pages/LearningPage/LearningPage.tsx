import { useUnit } from 'effector-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import SettingsIcon from '@/assets/icons/settings.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import LearningCard from '@/components/business/LearningCard/LearningCard';
import LearningPanel from '@/components/business/LearningPanel/LearningPanel';
import Resolver from '@/components/business/Resolver/Resolver';
import TopBar from '@/components/business/TopBar/TopBar';
import { cardApiService } from '@/container';
import styles from '@/pages/LearningPage/learningPage.module.scss';
import { editCard } from '@/store/cardFormStore';
import {
  $openedDeck,
  fetchOpenedDeck,
  fetchOpenedDeckFx,
} from '@/store/learningStore';
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
  const [learningCard, loadingLearningCard] = useUnit([
    $learningCard,
    fetchLearningCardFx.pending,
  ]);
  const [openedDeck, loadingOpenedDeck] = useUnit([
    $openedDeck,
    fetchOpenedDeckFx.pending,
  ]);

  const { id } = useParams();
  const navigate = useNavigate();

  function resolverCallback() {
    if (id) {
      resetLearningCard();
      fetchLearningCard(id);
      fetchOpenedDeck(id);
    }
  }

  const text =
    learningCardSide === 'front'
      ? learningCard.data?.frontText
      : learningCard.data?.backText;

  function onClickFlipCard() {
    setLearningCardIsFlipped(true);
    toggleLearningCardSide();
  }

  function onClickRotateCard() {
    toggleLearningCardSide();
  }

  function onClickEditCard() {
    navigate(`/edit-card/${learningCard.data?.id}`);
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
    <Resolver
      callback={resolverCallback}
      loading={loadingLearningCard || loadingOpenedDeck}
    >
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
          editingIsDisabled={loadingLearningCard}
        />
        <LearningPanel
          isFlipped={learningCardIsFlipped}
          loading={loadingLearningCard}
          onClickFlipCard={onClickFlipCard}
          onClickForgot={onClickForgot}
          onClickKnow={onClickKnow}
          onClickRotateCard={onClickRotateCard}
        />
      </main>
    </Resolver>
  );
};

export default LearningPage;
