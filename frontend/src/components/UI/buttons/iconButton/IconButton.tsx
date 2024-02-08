import { FC, ReactNode } from 'react';
import styles from '@/components/UI/buttons/iconButton/iconButton.module.scss';

interface IIconButtonProps {
  children: ReactNode;
}

const IconButton: FC<IIconButtonProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default IconButton;
