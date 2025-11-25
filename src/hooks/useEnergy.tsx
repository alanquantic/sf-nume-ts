import { useContext } from 'react';
import { EnergyContext } from '../context/EnergyContext';

const useEnergy = () => useContext(EnergyContext);

export default useEnergy;
