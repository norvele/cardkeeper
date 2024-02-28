import { FC } from 'react';
import Switcher from '@/components/UI/switcher/Switcher';
import styles from '@/components/business/SidePanel/sidePanel.module.scss';

interface ISidePanelProps {
  side: 'front' | 'back';
  onChangeSwitchSide: () => void;
}

const SidePanel: FC<ISidePanelProps> = ({ onChangeSwitchSide, side }) => {
  return (
    <div className={styles.sidepanel}>
      <Switcher side={side} onChange={onChangeSwitchSide} />
    </div>
  );
};

export default SidePanel;
