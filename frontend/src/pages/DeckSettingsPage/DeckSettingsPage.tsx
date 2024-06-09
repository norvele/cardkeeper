import { Provider } from 'effector-react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from '@/pages/DeckSettingsPage/deckSettingPage.module.scss';
// import { recentlyAddedDeckSettingsScope } from '@/store/recentlyAddedDeckSettingsStore';
import RecentlyAddedDeckSettingsPage from '../RecentlyAddedDeckSettingsPage/RecentlyAddedDeckSettingsPage';

interface IDeckSettingsPageProps {}

const DeckSettingsPage: FC<IDeckSettingsPageProps> = () => {
  return <Outlet />;
};

export default DeckSettingsPage;
