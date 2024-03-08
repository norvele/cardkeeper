import { FC, ReactNode } from 'react';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TopBar from '@/components/business/TopBar/TopBar';

interface ICardPageLayoutProps {
  type: 'Edit' | 'Create';
  rightButtonDisabled: boolean;
  children: ReactNode;
  onClickRight: () => void;
  onClickLeft: () => void;
}

const CardPageLayout: FC<ICardPageLayoutProps> = ({
  children,
  rightButtonDisabled,
  type,
  onClickRight,
  onClickLeft,
}) => {
  return (
    <>
      <TopBar
        leftSlot={
          <IconButton variant="primary" size="small" onClick={onClickLeft}>
            <ArrowBackIcon />
          </IconButton>
        }
        title={`${type} card`}
        rightSlot={
          <Button
            size="small"
            variant="primary"
            disabled={rightButtonDisabled}
            onClick={onClickRight}
            icon={<CheckIcon />}
          >
            Save
          </Button>
        }
      />
      <main>{children}</main>
    </>
  );
};

export default CardPageLayout;
