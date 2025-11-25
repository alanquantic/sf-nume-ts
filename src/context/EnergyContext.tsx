import Group from '@/resources/Group';
import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import { createContext } from 'react';

type GuestPartner = {
  guestPartner: Api.Partner[];
  guestMeetYear: number;
  name: string;
};

type GuestGroup = {
  guestGroup: Api.GroupMember[];
  guestYearGroup: number;
  name: string;
};

export interface EnergyContextInterface {
  // Nuevo: manejo de selección activa para TimeCircle (solo tipos compatibles)
  activeSelection?: Person | Synastry | Group;
  setActiveSelection: (selection: Person | Synastry | Group | undefined) => void;
  selectedType?: 'universal' | 'person' | 'partner' | 'group';
  setSelectedType: (type: 'universal' | 'person' | 'partner' | 'group' | undefined) => void;
  guestPartner: GuestPartner | null;
  activeGuestPartner: Synastry | null;
  selectActiveGuestPartner: (GuestPartner: GuestPartner) => void;
  guestGroup: GuestGroup | null;
  activeGuestGroup: Group | null;
  selectActiveGuestGroup: (GuestGroup: GuestGroup) => void;
}

export const energyContextDefaults: EnergyContextInterface = {
  // Nuevo: valores por defecto para selección activa
  activeSelection: undefined,
  setActiveSelection: () => { },
  selectedType: undefined,
  setSelectedType: () => { },
  guestPartner: null,
  guestGroup: null,
  activeGuestPartner: null,
  selectActiveGuestPartner: () => null,
  activeGuestGroup: null,
  selectActiveGuestGroup: () => null,
};

export const EnergyContext = createContext<EnergyContextInterface>(energyContextDefaults);
