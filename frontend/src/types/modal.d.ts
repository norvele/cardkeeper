export type TModalName = 'confirmation' | 'listContext';

export interface IConfirmationModal {
  name: 'confirmation';
  params: {
    notification: string;
    textButton: string;
    callback: null | (() => void);
  };
}

export interface IListContextModal {
  name: 'listContext';
  params: {
    cardText: string;
    buttons: Array<{
      textButton: string;
      callback: null | (() => void);
      textColor?: 'red';
    }>;
  };
}

export interface TEmptyModal {
  name: '';
  params: object;
}

export type TModal = IConfirmationModal | IListContextModal;
