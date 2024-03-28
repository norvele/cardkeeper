import { FC, ReactNode } from 'react';
import Checkbox from '@/components/UI/checkbox/Checkbox';
import styles from '@/components/UI/labeledCheckbox/labeledCheckbox.module.scss';

interface ILabeledCheckboxProps {
  isChecked: boolean;
  children: ReactNode;
  onChange: () => void;
}

const LabeledCheckbox: FC<ILabeledCheckboxProps> = ({
  isChecked,
  children,
  onChange,
}) => {
  return (
    <label className={styles.label}>
      <Checkbox onChange={onChange} isChecked={isChecked} />
      <span>{children}</span>
    </label>
  );
};

export default LabeledCheckbox;
