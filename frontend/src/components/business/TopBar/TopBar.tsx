import { FC, ReactNode } from 'react';
import styles from '@/components/business/TopBar/topBar.module.scss';

interface ITopBarProps {
  leftSlot: ReactNode;
  title?: string;
  rightSlot: ReactNode;
}

const TopBar: FC<ITopBarProps> = ({ leftSlot, title, rightSlot }) => {
  return (
    <header className={styles.topbar}>
      {leftSlot}
      {title}
      {rightSlot}
    </header>
  );
};

export default TopBar;
