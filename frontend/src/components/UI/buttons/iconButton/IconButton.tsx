import { FC, ReactNode } from 'react';
import styles from '@/components/UI/buttons/iconButton/iconButton.module.scss';

interface IIconButton {
  children: ReactNode;
}

const IconButton: FC<IIconButton> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default IconButton;
