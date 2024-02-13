import { FC, ReactNode } from 'react';
import Checkbox from '@/components/UI/checkbox/Checkbox';
import styles from '@/components/UI/labeledCheckbox/labeledCheckbox.module.scss';

interface ILabeledCheckboxProps {
  children: ReactNode;
  onChange: () => void;
}

const LabeledCheckbox: FC<ILabeledCheckboxProps> = ({ children, onChange }) => {
  return (
    <label className={styles.label}>
      <Checkbox onChange={onChange} />
      <span>{children}</span>
    </label>
  );
};

export default LabeledCheckbox;
