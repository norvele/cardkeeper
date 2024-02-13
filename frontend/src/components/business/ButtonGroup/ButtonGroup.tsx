import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import styles from '@/components/business/ButtonGroup/buttonGroup.module.scss';

interface IButtonGroupProps {
  position: 'vertical' | 'horizontal';
  children: ReactNode[];
}

const ButtonGroup: FC<IButtonGroupProps> = ({ position, children }) => {
  const buttons = children.reduce((acc: ReactNode[], button, index, array) => {
    acc.push(button);

    if (index !== array.length - 1) {
      acc.push(
        <hr
          key={index}
          className={clsx(styles.hr, {
            [styles.horizontalDivider]: position === 'vertical',
            [styles.verticalDivider]: position === 'horizontal',
          })}
        />,
      );
    }

    return acc;
  }, []);

  return (
    <>
      <hr className={`${styles.horizontalDivider} ${styles.hr}`} />
      <div className={styles[position]}>{buttons}</div>
    </>
  );
};

export default ButtonGroup;
