import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import LabeledCheckbox from '@/components/UI/labeledCheckbox/LabeledCheckbox';
import Modal from '@/components/UI/modal/Modal';
import ButtonGroup from '@/components/business/ButtonGroup/ButtonGroup';
import Card from '@/components/business/Card/Card';
import Divider from '@/components/business/Divider/Divider';
import styles from '@/components/business/Form/form.module.scss';
import TopBar from '@/components/business/TopBar/TopBar';
import { ICard } from '@/types/Card';

interface IFormProps {
  type: 'Edit' | 'Create';
  card: ICard;
  emptySide: 'back' | 'front' | null;
  setEmptySide: React.Dispatch<React.SetStateAction<'back' | 'front' | null>>;
  saveHandler: () => void;
  onChangeInputHandler: (
    _event: React.ChangeEvent<HTMLTextAreaElement>,
    _side: 'frontText' | 'backText',
  ) => void;
  onChangeCheckboxHandler: () => void;
}

const Form: FC<IFormProps> = ({
  type,
  card,
  emptySide,
  setEmptySide,
  saveHandler,
  onChangeInputHandler,
  onChangeCheckboxHandler,
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const navigate = useNavigate();

  function deleteHandler() {
    const response = true;

    if (response) {
      // return redirect('/home'); why not working???
      navigate('/home');
    }
  }

  function showModal() {
    setIsVisibleModal(true);
  }

  function hideModal() {
    setIsVisibleModal(false);
  }

  return (
    <form className={styles.form}>
      <TopBar
        leftSlot={
          <Link to="/home">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        }
        title={`${type} card`}
        rightSlot={
          <Button size="small" variant="primary" onClick={saveHandler}>
            <CheckIcon />
            Save
          </Button>
        }
      />
      <div className={styles.card}>
        <Card
          variant="secondary"
          card={card}
          onChange={onChangeInputHandler}
          emptySide={emptySide}
          setEmptySide={setEmptySide}
        />
      </div>
      <Divider />
      <div className={styles.checkbox}>
        <LabeledCheckbox onChange={onChangeCheckboxHandler}>
          Can be in the focused deck
        </LabeledCheckbox>
      </div>
      {type === 'Edit' && (
        <>
          <Divider />
          <div className={styles.delete}>
            <Button
              size="regular"
              variant="default"
              fontColor="red"
              onClick={showModal}
            >
              Delete card
            </Button>
          </div>
        </>
      )}
      <Modal
        isVisible={isVisibleModal}
        hideModal={hideModal}
        type="confirm"
        text="Are you sure you want to delete this card?"
      >
        <ButtonGroup position="horizontal">
          <Button size="regular" variant="transparent" onClick={hideModal}>
            Cancel
          </Button>
          <Button
            size="regular"
            variant="transparent"
            fontColor="red"
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </form>
  );
};

export default Form;
