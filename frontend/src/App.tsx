/// <reference types="vite-plugin-svgr/client" />
import ArrowBackIcon from '@/assets/icons/arrow_back.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';

function App() {
  return (
    <div>
      <Button variant="primary" size="regular">
        Add card
      </Button>
      <Button variant="default" size="regular">
        Import from CSV
      </Button>
      <Button variant="primary" size="small">
        <CheckIcon />
        Save
      </Button>
      <Button variant="default" size="small">
        <CheckIcon />
        Save
      </Button>
      <IconButton>
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
}

export default App;
