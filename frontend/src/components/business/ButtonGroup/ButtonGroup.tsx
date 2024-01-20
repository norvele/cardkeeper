import { FC, ReactNode } from 'react';
import styles from '@/components/business/ButtonGroup/buttonGroup.module.scss';

interface IButtonGroupProps {
  position: 'vertical' | 'horizontal';
  children: ReactNode[];
}

const ButtonGroup: FC<IButtonGroupProps> = ({ position, children }) => {
  const dividerClasses =
    position === 'vertical' ? styles.horizontalDivider : styles.verticalDivider;

  const buttons = children.reduce((acc: ReactNode[], button, index, array) => {
    acc.push(button);

    if (index !== array.length - 1) {
      acc.push(<hr key={index} className={dividerClasses} />);
    }

    return acc;
  }, []);

  return (
    <>
      <hr className={styles.horizontalDivider} />
      <div className={styles[position]}>{buttons}</div>
    </>
  );
};

export default ButtonGroup;
