import { FC } from 'react';
import styles from '@/components/UI/checkbox/checkbox.module.scss';

interface ICheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const Checkbox: FC<ICheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        className={styles.input}
        onChange={onChange}
        checked={isChecked}
      />
      <span className={styles.checkbox} />
    </label>
  );
};

export default Checkbox;
