import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@/assets/icons/add.svg?react';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import MiniCardItem from '@/components/business/MiniCardItem/MiniCardItem';
import Resolver from '@/components/business/Resolver/Resolver';
import TopBar from '@/components/business/TopBar/TopBar';
import styles from '@/pages/DeckSettingsPage/deckSettingsPage.module.scss';
import {
  $editingDeck,
  $mode,
  fetchEditingDeckFx,
  setMode,
} from '@/store/deckSettings';
import { showModal } from '@/store/modalStore';
// import SearchIcon from '@/assets/icons/search.svg?react';
// import TextInput from '@/components/UI/textInput/TextInput';

const SettingsPage = () => {
  const [editingDeck, fetchEditingDeck] = useUnit([
    $editingDeck,
    fetchEditingDeckFx,
  ]);

  const mode = useUnit($mode);

  const navigate = useNavigate();

  const { id } = useParams() as { id: string };

  const resolverCallbacks = [() => fetchEditingDeck(id)];

  function onClickGoToBack() {
    navigate(-1);
  }

  function onClickCancel() {
    setMode('normal');
  }

  function onClickMore() {
    showModal({
      name: 'listContext',
      params: {
        cardText: `Я сегодня не работаю (выходной). И еще очень много текста потомучто
        такая вот карточка. И еще очень много текста потомучто`,
        buttons: [
          {
            textButton: 'Select',
            callback: () => {
              setMode('kebab');
            },
          },
          {
            textButton: 'Edit',
            callback: () => {
              navigate(`/edit-card/20`);
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
                  callback: null,
                },
              });
            },
          },
        ],
      },
    });
  }

  return (
    <Resolver callbacks={resolverCallbacks}>
      {mode === 'normal' && (
        <>
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
          <main className={styles.main}>
            {/* <TextInput placeholder="Search" icon={<SearchIcon />} /> */}

            <MiniCardItem onClickMore={onClickMore} checkbox={false}>
              Я сегодня не работаю (выходной). И еще очень много текста
              потомучто такая вот карточка. И еще очень много текста потомучто
            </MiniCardItem>
          </main>
        </>
      )}

      {mode === 'kebab' && (
        <>
          <TopBar
            leftSlot={
              <IconButton
                variant="primary"
                size="small"
                onClick={onClickCancel}
              >
                <CloseIcon />
              </IconButton>
            }
            rightSlot={
              <IconButton variant="primary" size="small" color="red">
                <DeleteIcon />
              </IconButton>
            }
          />
          <main className={styles.main}>
            {/* <TextInput placeholder="Search" icon={<SearchIcon />} /> */}

            <MiniCardItem onClickMore={onClickMore} checkbox={true}>
              Я сегодня не работаю (выходной). И еще очень много текста
              потомучто такая вот карточка. И еще очень много текста потомучто
            </MiniCardItem>
          </main>
        </>
      )}
    </Resolver>
  );
};

export default SettingsPage;
