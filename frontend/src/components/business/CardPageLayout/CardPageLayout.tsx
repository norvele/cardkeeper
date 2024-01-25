import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TopBar from '@/components/business/TopBar/TopBar';

interface ICardPageLayoutProps {
  children: ReactNode;
  type: 'Edit' | 'Create';
  goBackHandler: () => void;
  saveHandler: () => void;
}

const CardPageLayout: FC<ICardPageLayoutProps> = ({
  children,
  type,
  goBackHandler,
  saveHandler,
}) => {
  return (
    <>
      <TopBar
        leftSlot={
          <Link to="/home" onClick={goBackHandler}>
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
            onClick={saveHandler}
            icon={<CheckIcon />}
          >
            Save
          </Button>
        }
      />
      {children}
    </>
  );
};

export default CardPageLayout;
