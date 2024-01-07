/// <reference types="vite-plugin-svgr/client" />
import Button from './components/UI/button/Button';
import AddIcon from './assets/icons/add.svg?react';

function App() {
  return (
    <div>
      <Button variant="primary">Add card</Button>
      <Button variant="secondary">Import from CSV</Button>
      <Button variant="default">
        <AddIcon />
      </Button>
    </div>
  );
}

export default App;
