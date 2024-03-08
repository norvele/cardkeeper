import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import SettingsIcon from '@/assets/icons/settings.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import LearningCard from '@/components/business/LearningCard/LearningCard';
import LearningPanel from '@/components/business/LearningPanel/LearningPanel';
import TopBar from '@/components/business/TopBar/TopBar';
import { cardApiService } from '@/container';
import styles from '@/pages/LearningPage/learningPage.module.scss';
import { editCard } from '@/store/cardFormStore';
import {
  $learningCard,
  $learningCardIsFliped,
  $learningCardSide,
  fetchLearningCard,
  fetchLearningCardFx,
  resetLearningCard,
  setLearningCardIsFliped,
  toggleLearningCardSide,
} from '@/store/cardsStore';

const LearningPage = () => {
  const learningCardIsFliped = useUnit($learningCardIsFliped);

  const learningCardSide = useUnit($learningCardSide);

  const [learningCard, loading] = useUnit([
    $learningCard,
    fetchLearningCardFx.pending,
  ]);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const title = searchParams.get('title');

  useEffect(() => {
    if (id) {
      resetLearningCard();
      fetchLearningCard(id);
    }
  }, []);

  const text =
    learningCardSide === 'front'
      ? learningCard.data?.frontText
      : learningCard.data?.backText;

  function onClickFlipCard() {
    setLearningCardIsFliped(true);
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
    <>
      <TopBar
        leftSlot={
          <IconButton variant="primary" size="small" onClick={onClickGoToBack}>
            <ArrowBackIcon />
          </IconButton>
        }
        title={title}
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
          isFliped={learningCardIsFliped}
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
