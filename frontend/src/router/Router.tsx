import { Navigate, createBrowserRouter } from 'react-router-dom';
import AllDeckSettingsPage from '@/pages/AllDeckSettingsPage/AllDeckSettingsPage';
import CreateCardPage from '@/pages/CreateCardPage/CreateCardPage';
import EditCardPage from '@/pages/EditCardPage/EditCardPage';
import FocusedDeckSettingsPage from '@/pages/FocusedDeckSettingsPage/FocusedDeckSettingsPage';
import HomePage from '@/pages/HomePage/HomePage';
import LearningPage from '@/pages/LearningPage/LearningPage';
import RecentlyAddedDeckSettingsPage from '@/pages/RecentlyAddedDeckSettingsPage/RecentlyAddedDeckSettingsPage';

const isAuth = true;

const privateRoutes: Array<object> = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/create-card',
    element: <CreateCardPage />,
  },
  {
    path: 'edit-card/:id',
    element: <EditCardPage />,
  },
  {
    path: '/learning/:id',
    element: <LearningPage />,
  },
  {
    path: '/deck-settings/all',
    element: <AllDeckSettingsPage />,
  },
  {
    path: '/deck-settings/focused',
    element: <FocusedDeckSettingsPage />,
  },
  {
    path: '/deck-settings/recentlyAdded',
    element: <RecentlyAddedDeckSettingsPage />,
  },
];

const publicRoutes: Array<object> = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <div>login</div>,
  },
];

const routes = isAuth ? privateRoutes : publicRoutes;

export const router = createBrowserRouter(routes);
