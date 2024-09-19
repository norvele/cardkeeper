import { FC } from 'react';
import { Outlet } from 'react-router-dom';
// import { recentlyAddedDeckSettingsScope } from '@/store/recentlyAddedDeckSettingsStore';

interface IDeckSettingsPageProps {}

const DeckSettingsPage: FC<IDeckSettingsPageProps> = () => {
  return <Outlet />;
};

export default DeckSettingsPage;
