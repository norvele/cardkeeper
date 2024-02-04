import { FC, ReactNode } from 'react';
import styles from '@/components/UI/buttons/button/button.module.scss';

interface IButtonProps {
  variant: 'primary' | 'default' | 'transparent';
  size: 'small' | 'regular';
  fontColor?: 'red' | 'black';
  children: ReactNode;
  icon?: ReactNode;
  onClick: null | (() => void);
}

const Button: FC<IButtonProps> = ({
  variant,
  size,
  fontColor = 'black',
  icon,
  children,
  onClick,
}) => {
  function onClickHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    onClick && onClick();
  }

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${styles[fontColor]}`}
      onClick={(event) => onClickHandler(event)}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
