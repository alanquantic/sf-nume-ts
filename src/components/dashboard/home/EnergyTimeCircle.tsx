import { useAuth } from '@/context/AuthProvider';
import useEnergy from '@/hooks/useEnergy';
import Person from '@/resources/Person';
import TimeCircle from '../../personal/timeCircle/TimeCircle';
import TimeCircleUniversal from './timeCircle/TimeCircleUniversal';

function EnergyTimeCircle() {
  const { activeSelection, selectedType } = useEnergy();
  const { user: userAuth } = useAuth();

  // Crear userPerson por defecto
  const userPerson = new Person({
    id: userAuth?.user.id?.toString() || '',
    name: userAuth?.user.firstName || '',
    lastName: userAuth?.user.lastName || '',
    scdLastName: userAuth?.user.scdLastName || '',
    birthDate: userAuth?.user.birthDate?.toString() || '',
  });
  if (selectedType === 'universal') {
    return (
      <div className="row-span-2 flex justify-center items-center">
        <TimeCircleUniversal />
      </div>
    );
  }
  // Si hay una selección activa, usarla
  if (activeSelection) {
    return (
      <div className="row-span-2 flex justify-center items-center">
        <TimeCircle consultant={activeSelection} />
      </div>
    );
  }

  // Si se seleccionó universal, mostrar mensaje

  // Si no hay selección activa, mostrar userPerson por defecto
  return (
    <div className="row-span-2 flex justify-center items-center">
      <TimeCircle consultant={userPerson} />
    </div>
  );
}

export default EnergyTimeCircle;
