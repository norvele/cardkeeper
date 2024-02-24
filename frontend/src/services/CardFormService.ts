import { useUnit } from 'effector-react';
import {
  $cardError,
  $cardForm,
  $cardSide,
  $savingCardFormStatus,
  resetCardFormEvent,
  saveCardEvent,
  toggleCanBeInFocusedCheckboxEvent,
  toggleSideSwitchEvent,
  updateInputEvent,
} from '@/store/cardFormStore';

export class CardFormService {
  public updateInput(value: string, side: 'front' | 'back') {
    updateInputEvent({ value, side });
  }

  public resetCardForm() {
    resetCardFormEvent();
  }

  public toggleCanBeInFocusedCheckbox() {
    toggleCanBeInFocusedCheckboxEvent();
  }

  public toggleSideSwitch() {
    toggleSideSwitchEvent();
  }

  public getCardSide() {
    return useUnit($cardSide);
  }

  public getCardForm() {
    return useUnit($cardForm);
  }

  public getCardError() {
    return useUnit($cardError);
  }

  public saveCard() {
    saveCardEvent();
  }

  public getSavingCardFormStatus() {
    return useUnit($savingCardFormStatus);
  }
}
