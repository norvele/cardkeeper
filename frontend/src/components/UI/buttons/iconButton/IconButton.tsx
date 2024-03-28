import { FC, ReactNode } from 'react';
import styles from '@/components/UI/buttons/iconButton/iconButton.module.scss';

interface IIconButtonProps {
  size?: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary' | 'transparent';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const IconButton: FC<IIconButtonProps> = ({
  size,
  variant,
  disabled,
  onClick,
  children,
}) => {
  return (
    <button
      className={`${styles.button} ${size && styles[size]} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
