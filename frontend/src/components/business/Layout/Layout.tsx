import { FC, ReactNode } from 'react';
import styles from '@/components/business/Layout/layout.module.scss';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Layout;
