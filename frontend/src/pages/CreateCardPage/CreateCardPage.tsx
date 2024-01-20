import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '@/components/business/Form/Form';
import { ICard } from '@/types/Card';

const CreateCardPage = () => {
  const [newCard, setNewCard] = useState<ICard>({
    id: '',
    frontText: '',
    backText: '',
    canBeInFocused: false,
  });
  const [emptySide, setEmptySide] = useState<'back' | 'front' | null>(null);

  const navigate = useNavigate();

  function onChangeInputHandler(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    side: 'frontText' | 'backText',
  ) {
    const card = { ...newCard, [side]: event.target.value };
    setNewCard(card);
  }

  function onChangeCheckboxHandler() {
    const card = { ...newCard, canBeInFocused: !newCard.canBeInFocused };
    setNewCard(card);
  }

  function saveHandler() {
    if (!newCard.frontText) {
      setEmptySide('front');
    } else if (!newCard.backText) {
      setEmptySide('back');
    } else {
      const card = { ...newCard, id: `${Date.now()}` };
      // post card to backend

      const response = true;
      if (response) {
        // why redirect() not working?
        navigate('/home');
      }
      setNewCard({
        id: '',
        frontText: '',
        backText: '',
        canBeInFocused: false,
      });
      setEmptySide(null);
    }
  }

  return (
    <Form
      type="Create"
      card={newCard}
      onChangeInputHandler={onChangeInputHandler}
      onChangeCheckboxHandler={onChangeCheckboxHandler}
      saveHandler={saveHandler}
      emptySide={emptySide}
      setEmptySide={setEmptySide}
    />
  );
};

export default CreateCardPage;
