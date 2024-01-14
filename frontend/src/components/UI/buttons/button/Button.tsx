import { FC, ReactNode } from 'react';
import styles from '@/components/UI/buttons/button/button.module.scss';

interface IButtonProps {
  variant: 'primary' | 'default';
  size: 'small' | 'regular';
  children: ReactNode;
}

const Button: FC<IButtonProps> = ({ variant, size, children }) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${styles[size]}`}>
      {children}
    </button>
  );
};

export default Button;
