import { FC } from 'react';
import styles from '@/components/UI/checkbox/checkbox.module.scss';

interface ICheckboxProps {
  onChange: () => void;
}

const Checkbox: FC<ICheckboxProps> = ({ onChange }) => {
  return (
    <label className={styles.label}>
      <input type="checkbox" className={styles.input} onChange={onChange} />
      <span className={styles.checkbox} />
    </label>
  );
};

export default Checkbox;
