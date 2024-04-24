import { FC, ReactNode } from 'react';
import styles from '@/components/UI/textInput/textInput.module.scss';

interface ITextInputProps {
  placeholder?: string;
  value: string;
  textSize: 'normal' | 'large';
  icon?: ReactNode;
  onChange: (_value: string) => void;
}

const TextInput: FC<ITextInputProps> = ({
  placeholder,
  icon,
  onChange,
  value,
  textSize,
}) => {
  return (
    <form className={styles.form}>
      {icon && <i className={styles.icon}>{icon}</i>}
      <input
        type="text"
        className={`${styles.input} ${styles[textSize]}`}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </form>
  );
};

export default TextInput;
