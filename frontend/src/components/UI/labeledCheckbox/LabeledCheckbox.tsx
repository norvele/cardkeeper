import { FC, ReactNode } from 'react';
import Checkbox from '@/components/UI/checkbox/Checkbox';
import styles from '@/components/UI/labeledCheckbox/labeledCheckbox.module.scss';

interface ILabeledCheckboxProps {
  isChecked: boolean;
  children: ReactNode;
  size: 'small' | 'normal';
  onChange: (_isChecked: boolean) => void;
}

const LabeledCheckbox: FC<ILabeledCheckboxProps> = ({
  isChecked,
  children,
  size,
  onChange,
}) => {
  return (
    <label className={styles.label}>
      <Checkbox
        onChange={(isChecked) => {
          onChange(isChecked);
        }}
        isChecked={isChecked}
        size={size}
      />
      <span>{children}</span>
    </label>
  );
};

export default LabeledCheckbox;
