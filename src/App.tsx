import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import Analytics from '@/components/Analytics';
import { AppProvider } from '@/context/AppProvider';
import { AppRoutes } from '@/router/AppRoutes';

import '@/utils/i18n';

Modal.setAppElement('#root');

function App() {
  return (
    <AppProvider>
      <Analytics />
      <Toaster />
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
