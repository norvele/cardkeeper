import { FC, ReactNode } from 'react';
import styles from '@/components/business/ButtonGroup/buttonGroup.module.scss';

interface IButtonGroupProps {
  position: 'vertical' | 'horizontal';
  children: ReactNode[];
}

const ButtonGroup: FC<IButtonGroupProps> = ({ position, children }) => {
  const dividerClasses =
    position === 'vertical' ? styles.horizontalDivider : styles.verticalDivider;
  const divider = <hr className={dividerClasses} />;
  const buttons = children.map((button, index, array) =>
    index === array.length - 1 ? (
      <div key={index}>{[button]}</div>
    ) : (
      <div key={index}>{[button, divider]}</div>
    ),
  );

  return (
    <>
      <hr className={styles.horizontalDivider} />
      <div className={styles[position]}>{buttons}</div>
    </>
  );
};

export default ButtonGroup;
