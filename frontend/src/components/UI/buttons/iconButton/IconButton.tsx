import { FC, ReactNode } from 'react';
import styles from '@/components/UI/buttons/iconButton/iconButton.module.scss';

interface IIconButtonProps {
  size: 'smaller' | 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary' | 'transparent';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  color?: 'red' | 'black';
}

const IconButton: FC<IIconButtonProps> = ({
  size,
  variant,
  disabled,
  onClick,
  color = 'black',
  children,
}) => {
  return (
    <button
      className={`${styles.button} ${size && styles[size]} ${styles[variant]} ${
        styles[color]
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
