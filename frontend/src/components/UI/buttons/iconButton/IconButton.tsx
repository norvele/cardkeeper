import { FC, ReactNode } from 'react';
import styles from './iconButton.module.scss';

interface IIconButton {
  children: ReactNode;
}

const IconButton: FC<IIconButton> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default IconButton;
