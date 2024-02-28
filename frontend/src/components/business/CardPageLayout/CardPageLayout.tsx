import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TopBar from '@/components/business/TopBar/TopBar';

interface ICardPageLayoutProps {
  type: 'Edit' | 'Create';
  saveButtonDisabled: boolean;
  children: ReactNode;
  onClickSave: () => void;
}

const CardPageLayout: FC<ICardPageLayoutProps> = ({
  children,
  saveButtonDisabled,
  type,
  onClickSave,
}) => {
  return (
    <>
      <TopBar
        leftSlot={
          <Link to="/home">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        }
        title={`${type} card`}
        rightSlot={
          <Button
            size="small"
            variant="primary"
            disabled={saveButtonDisabled}
            onClick={onClickSave}
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
