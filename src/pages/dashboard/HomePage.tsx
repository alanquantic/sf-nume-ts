import { useTranslation } from 'react-i18next';

import EnergyTimeCircle from '@/components/dashboard/home/EnergyTimeCircle';
import UniversalEnergy from '@/components/dashboard/home/UniversalEnergy';
import { useAuth } from '@/context/AuthProvider';
import EnergyProvider from '@/context/EnergyProvider';

function HomePage() {
  const { user: userAuth } = useAuth();
  const { t } = useTranslation();
  const { firstName } = userAuth?.user ?? {};
  const names = `${firstName}`;

  return (
    <div className="bg-cover grid grid-cols-2 gap-4 h-screen pt-11">
      <EnergyProvider>
        {/* Columna izquierda - Componentes de energía */}
        <div className="flex flex-col justify-center mt-11">
          <div className="mb-8 pl-14 pt-11 pb-7 bg-white bg-opacity-50 w-full relative rounded-tr-3xl rounded-br-3xl">
            <h2 className="font-black mt-0 mb-2 text-main-700 text-2xl">
              {t('home.title', { name: names })}
            </h2>
            <h2 className="text-main-700 text-2xl">
              {t('home.subtitle')}
            </h2>
            <img src="/assets/welcome.png" className="welcomeLogo" alt="welcome" />
          </div>

          <UniversalEnergy />
        </div>

        {/* Columna derecha - Círculo del tiempo */}
        <div className="flex items-center justify-center">
          <EnergyTimeCircle />
        </div>
      </EnergyProvider>
    </div>
  );
}

export default HomePage;
