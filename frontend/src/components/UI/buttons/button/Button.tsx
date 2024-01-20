import { FC, ReactNode } from 'react';
import styles from '@/components/UI/buttons/button/button.module.scss';

interface IButtonProps {
  variant: 'primary' | 'default' | 'transparent';
  fontColor?: 'red' | 'black';
  size: 'small' | 'regular';
  children: ReactNode;
  onClick?: () => void; // пока не сделаны все обработчики - необязательно
}

const Button: FC<IButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  fontColor = 'black',
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
      {children}
    </button>
  );
};

export default Button;
