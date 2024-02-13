import { FC } from 'react';
import Switcher from '@/components/UI/switcher/Switcher';
import styles from '@/components/business/SidePanel/sidePanel.module.scss';

interface ISidePanelProps {
  onSwitchChange: () => void;
  side: 'front' | 'back';
}

const SidePanel: FC<ISidePanelProps> = ({ onSwitchChange, side }) => {
  return (
    <div className={styles.sidepanel}>
      <Switcher side={side} onChange={onSwitchChange} />
    </div>
  );
};

export default SidePanel;
