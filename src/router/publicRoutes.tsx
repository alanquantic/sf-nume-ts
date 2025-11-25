import { Navigate } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage';

const publicRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
];

export default publicRoutes;
