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

  console.log();

  const navigate = useNavigate();
  console.log(newCard);

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
  }

  return (
    <Form
      type="Create"
      card={newCard}
      onChangeInputHandler={onChangeInputHandler}
      onChangeCheckboxHandler={onChangeCheckboxHandler}
      saveHandler={saveHandler}
    />
  );
};

export default CreateCardPage;
