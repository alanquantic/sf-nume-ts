import { useRoutes } from 'react-router-dom';

import { useAuth } from '@/context/AuthProvider';
import protectedRoutes from './protectedRoutes';
import publicRoutes from './publicRoutes';

export function AppRoutes() {
  const auth = useAuth();
  const element = useRoutes(auth.user ? protectedRoutes : publicRoutes);
  return element;
}

export default AppRoutes;
