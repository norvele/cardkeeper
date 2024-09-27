import { FC, useState } from 'react';
import Button from '@/components/UI/buttons/button/Button';
import LabeledCheckbox from '@/components/UI/labeledCheckbox/LabeledCheckbox';
import CardEditor from '@/components/business/CardEditor/CardEditor';
import styles from '@/components/business/CardForm/cardForm.module.scss';
import Divider from '@/components/business/Divider/Divider';
import { showModal } from '@/store/modalStore';
import { IDeck } from '@/types/deck';
import { ICard } from '@/types/index';

interface ICardFormProps {
  type: 'Edit' | 'Create';
  card: ICard;
  side: 'back' | 'front';
  customDecks?: IDeck[];
  errorIsVisible: boolean;
  checkboxIsChecked: boolean;
  onChangeInput: (_value: string, _side: 'front' | 'back') => void;
  onChangeSwitchSide: () => void;
  onChangeCanBeInFocusedCheckbox: () => void;
  onChangeCustomDeckCheckbox?: (_deck: IDeck, _isChecked: boolean) => void;
}

const CardForm: FC<ICardFormProps> = ({
  type,
  card,
  side,
  customDecks,
  errorIsVisible,
  checkboxIsChecked,
  onChangeInput,
  onChangeSwitchSide,
  onChangeCanBeInFocusedCheckbox,
  onChangeCustomDeckCheckbox,
}) => {
  const customDecksIsVisible = useState(
    Boolean(card.customDecks?.length !== 0 && onChangeCustomDeckCheckbox),
  );

  function onClickDelete() {
    showModal({
      name: 'confirmation',
      params: {
        notification: 'Are you sure you want to delete this card?',
        textButton: 'Delete',
        callback: null,
      },
    });
  }

  return (
    <form className={styles.form}>
      <div className={styles.card}>
        <CardEditor
          card={card}
          side={side}
          errorIsVisible={errorIsVisible}
          onChangeInput={onChangeInput}
          onChangeSwitchSide={onChangeSwitchSide}
        />
      </div>
      <Divider />
      <div className={styles.checkbox}>
        <LabeledCheckbox
          onChange={onChangeCanBeInFocusedCheckbox}
          isChecked={checkboxIsChecked}
          size="normal"
        >
          Can be in the focused deck
        </LabeledCheckbox>
        {customDecksIsVisible && (
          <>
            <p className={styles.p}>Included in custom deck</p>
            {customDecks?.map((deck) => (
              <div className={styles.customDecks} key={deck.id}>
                <LabeledCheckbox
                  onChange={(isChecked) => {
                    onChangeCustomDeckCheckbox(deck, isChecked);
                  }}
                  isChecked={Boolean(
                    card.customDecks?.some((item: IDeck) => {
                      return item.id === deck.id;
                    }),
                  )}
                  size="normal"
                >
                  {deck.name}
                </LabeledCheckbox>
              </div>
            ))}
          </>
        )}
      </div>
      {type === 'Edit' && (
        <>
          <Divider />
          <div className={styles.delete}>
            <Button
              size="regular"
              variant="default"
              fontColor="red"
              onClick={onClickDelete}
            >
              Delete card
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default CardForm;
