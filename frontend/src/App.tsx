/// <reference types="vite-plugin-svgr/client" />

import AddIcon from '@/assets/icons/add.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import IconButton from '@/components/UI/buttons/iconButton/IconButton';
import TopBar from '@/components/business/TopBar/TopBar';

function App() {
  return (
    <>
      <TopBar
        leftSlot={
          <IconButton>
            <MenuIcon />
          </IconButton>
        }
        title="Card keeper"
        rightSlot={
          <IconButton>
            <AddIcon />
          </IconButton>
        }
      />
    </>
  );
}

export default App;
