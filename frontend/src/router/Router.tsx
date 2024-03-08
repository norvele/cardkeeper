import { Navigate, createBrowserRouter } from 'react-router-dom';
import CreateCardPage from '@/pages/CreateCardPage/CreateCardPage';
import EditCardPage from '@/pages/EditCardPage/EditCardPage';
import HomePage from '@/pages/HomePage/HomePage';
import LearningPage from '@/pages/LearningPage/LearningPage';

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
