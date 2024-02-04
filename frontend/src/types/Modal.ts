export type TModalName = '' | 'confirm';

export interface IModalParams {
  notification: string;
  textButton: string;
  callback: null | (() => void);
}

export interface IModal {
  name: TModalName;
  params: IModalParams;
}
