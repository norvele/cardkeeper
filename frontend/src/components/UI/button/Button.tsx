import { FC, ReactNode } from 'react';
import styles from './button.module.scss';

interface IButtonProps {
  variant: 'primary' | 'secondary' | 'default';
  children: ReactNode | string;
}

const Button: FC<IButtonProps> = ({ variant, children }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export default Button;
