import UniversalEnergyGroup from '@/components/Universal/universalEnergy/UniversalEnergyGroup';
import UniversalEnergyPartner from '@/components/Universal/universalEnergy/UniversalEnergyPartner';
import UniversalEnergyPerson from '@/components/Universal/universalEnergy/UniversalEnergyPerson';
import UniversalEnergyValues from '@/components/Universal/universalEnergy/UniversalEnergyValues';
import { useAuth } from '@/context/AuthProvider';
import useEnergy from '@/hooks/useEnergy';
import Person from '@/resources/Person';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function UniversalEnergy() {
  const { user: userAuth } = useAuth();
  const {
    setActiveSelection,
    selectedType,
    setSelectedType,
    activeSelection,
  } = useEnergy();
  const { t } = useTranslation();

  const userPerson = new Person({
    id: userAuth?.user.id?.toString() || '',
    name: userAuth?.user.firstName || '',
    lastName: userAuth?.user.lastName || '',
    scdLastName: userAuth?.user.scdLastName || '',
    birthDate: userAuth?.user.birthDate?.toString() || '',
  });

  // Resetear la selección cuando cambie el consultante - pero mantener userPerson por defecto
  useEffect(() => {
    // Solo resetear si no hay una selección activa
    if (!activeSelection) {
      setActiveSelection(userPerson);
      setSelectedType('person');
    }
  }, [setActiveSelection, setSelectedType, userPerson, activeSelection]);

  // Funciones para manejar la selección activa
  const handlePersonSelect = () => {
    // Usar userPerson del contexto en lugar de consultant
    setActiveSelection(userPerson);
    setSelectedType('person');
  };

  const handlePartnerSelect = () => {
    // La lógica para pareja se manejará en el componente UniversalEnergyPartner
    setSelectedType('partner');
  };

  const handleGroupSelect = () => {
    // La lógica para grupo se manejará en el componente UniversalEnergyGroup
    setSelectedType('group');
  };

  const handleUniversalSelect = () => {
    setSelectedType('universal');
  };

  return (
    <div>
      <div className="mt-14 mb-5 text-center">
        <p className="text-sm text-gray-500">
          💡
          {' '}
          {t('home.editInformation')}
        </p>
        <p className="text-sm text-orange-600 font-medium">
          ⚠️
          {' '}
          {t('home.selectConsultant')}
        </p>
      </div>
      <div className="grid grid-cols-4 mt-1">
        {/* Energía Universal - siempre visible */}
        <UniversalEnergyValues
          setActive={handleUniversalSelect}
          selected={selectedType === 'universal'}
        />

        {/* Personal - habilitado solo si hay consultante */}
        <UniversalEnergyPerson
          person={userPerson}
          setActive={handlePersonSelect}
          selected={selectedType === 'person'}
        />

        {/* Pareja - habilitado solo si hay consultante */}

        <UniversalEnergyPartner
          setActive={handlePartnerSelect}
          selected={selectedType === 'partner'}
        />

        {/* Grupo - habilitado solo si hay consultante */}

        <UniversalEnergyGroup
          setActive={handleGroupSelect}
          selected={selectedType === 'group'}
        />

      </div>
    </div>
  );
}

export default UniversalEnergy;
