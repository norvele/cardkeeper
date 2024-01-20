import clsx from 'clsx';
import { FC } from 'react';
import styles from '@/components/UI/switcher/switcher.module.scss';

interface ISwitcherProps {
  side: 'front' | 'back';
  onChange?: () => void;
}

const Switcher: FC<ISwitcherProps> = ({ side, onChange }) => {
  const rootFrontClasses = [styles.text];
  const rootBackClasses = [styles.text];

  switch (side) {
    case 'front':
      rootFrontClasses.push(styles.active);
      break;
    case 'back':
      rootBackClasses.push(styles.active);
      break;
  }

  return (
    <div className={styles.side}>
      <span
        className={clsx(styles.text, { [styles.active]: side === 'front' })}
      >
        Front
      </span>
      <label className={styles.switcher}>
        <input
          type="checkbox"
          className={styles.input}
          onChange={onChange}
          checked={side === 'back'}
        />
        <span className={styles.slider} />
      </label>
      <span className={clsx(styles.text, { [styles.active]: side === 'back' })}>
        Back
      </span>
    </div>
  );
};

export default Switcher;
