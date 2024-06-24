import clsx from 'clsx';
import { FC, ReactNode, useEffect, useState } from 'react';
import styles from '@/components/business/DeckSettingsLayout/deckSettingsLayout.module.scss';

interface IDeckSettingsLayoutProps {
  TopBar: ReactNode;
  children: ReactNode;
}

const DeckSettingsLayout: FC<IDeckSettingsLayoutProps> = ({
  TopBar,
  children,
}) => {
  const [shadowIsVisible, setShadowIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShadowIsVisible(true);
      } else {
        setShadowIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={clsx(styles.topContent, {
          [styles.shadow]: shadowIsVisible,
        })}
      >
        {TopBar}
      </div>
      {children}
    </div>
  );
};

export default DeckSettingsLayout;
