import { FC, ReactNode } from 'react';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TopBar from '@/components/business/TopBar/TopBar';

interface ICardPageLayoutProps {
  type: 'Edit' | 'Create';
  saveButtonDisabled: boolean;
  children: ReactNode;
  onClickSaveCard: () => void;
  onClickGoToBack: () => void;
}

const CardPageLayout: FC<ICardPageLayoutProps> = ({
  children,
  saveButtonDisabled,
  type,
  onClickSaveCard,
  onClickGoToBack,
}) => {
  return (
    <>
      <TopBar
        leftSlot={
          <IconButton variant="primary" size="small" onClick={onClickGoToBack}>
            <ArrowBackIcon />
          </IconButton>
        }
        title={`${type} card`}
        rightSlot={
          <Button
            size="small"
            variant="primary"
            disabled={saveButtonDisabled}
            onClick={onClickSaveCard}
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
