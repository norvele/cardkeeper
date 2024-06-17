import ArrowBack from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TextInput from '@/components/UI/textInput/TextInput';
import FullCardList from '@/components/business/FullCardList/FullCardList';
import TopBar from '@/components/business/TopBar/TopBar';
import styles from '@/pages/CustomDeckSettingsPage/customDeckSettingsPage.module.scss';

const cards = [
  {
    id: '1',
    frontText:
      'Все последние (недавние) исследования показывают, что мы получаем пользу во многих...',
    backText: 'backtext card 1',
    canBeInFocused: false,
  },
  {
    id: '2',
    frontText: `мы всегда будем на связи`,
    backText: 'backtext card 2',
    canBeInFocused: true,
  },
  {
    id: '3',
    frontText: 'мы приехали на стадион рано',
    backText: 'backtext card 3',
    canBeInFocused: false,
  },
];

const CustomDeckSettingsPage = () => {
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
        title="Catchphrases"
      />
      <p className={styles.inputName}>Deck Name</p>
      <TextInput textSize="normal" onChange={() => {}} value="Catchphrases" />
      <p className={styles.includes}>Includes {25} cards</p>
      <div className={styles.list}>
        <FullCardList cards={cards} />
      </div>
      <div className={styles.button}>
        <Button size="regular" variant="default" onClick={() => {}}>
          Show {8} more
        </Button>
      </div>
    </>
  );
};

export default CustomDeckSettingsPage;
