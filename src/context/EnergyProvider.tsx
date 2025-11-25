import { useAuth } from '@/context/AuthProvider';
import Group from '@/resources/Group';
import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import { useCallback, useEffect, useState } from 'react';
import { EnergyContext, EnergyContextInterface } from './EnergyContext';

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

function EnergyProvider({ children }: any) {
  const { user: userAuth } = useAuth();

  // Crear userPerson por defecto
  const userPerson = new Person({
    id: userAuth?.user.id?.toString() || '',
    name: userAuth?.user.firstName || '',
    lastName: userAuth?.user.lastName || '',
    scdLastName: userAuth?.user.scdLastName || '',
    birthDate: userAuth?.user.birthDate?.toString() || '',
  });

  // Nuevo: estado para manejo de selección activa - inicializar con userPerson
  const [activeSelection, setActiveSelectionState] = useState<Person | Synastry | Group | undefined>(userPerson);
  const [selectedType, setSelectedTypeState] = useState<'universal' | 'person' | 'partner' | 'group' | undefined>('person');
  const [activeGuestPartner, setActiveGuestPartner] = useState<Synastry | null>(null);
  const [activeGuestGroup, setActiveGuestGroup] = useState<Group | null>(null);
  const [guestPartner, setGuestPartner] = useState<GuestPartner | null>(null);
  const [guestGroup, setGuestGroup] = useState<GuestGroup | null>(null);

  useEffect(() => {
    if (userAuth?.user) {
      // Load guest partner from user
      const guestPartnerData: GuestPartner = userAuth?.guests?.guestEnergyPartner || null;
      setGuestPartner(guestPartnerData || null);

      if (guestPartnerData && guestPartnerData.guestPartner.length >= 2) {
        const synastry = new Synastry(
          new Person({
            id: guestPartnerData.guestPartner[0].id,
            name: guestPartnerData.guestPartner[0].names,
            lastName: guestPartnerData.guestPartner[0].lastName,
            scdLastName: guestPartnerData.guestPartner[0].scdLastName,
            birthDate: guestPartnerData.guestPartner[0].date,
          }),
          new Person({
            id: guestPartnerData.guestPartner[1].id,
            name: guestPartnerData.guestPartner[1].names,
            lastName: guestPartnerData.guestPartner[1].lastName,
            scdLastName: guestPartnerData.guestPartner[1].scdLastName,
            birthDate: guestPartnerData.guestPartner[1].date,
          }),
        );
        setActiveGuestPartner(synastry);
      } else {
        setActiveGuestPartner(null);
      }

      // Load guest group from user
      const guestGroupData: GuestGroup = userAuth.guests.guestEnergyGroup;
      setGuestGroup(guestGroupData || null);

      if (guestGroupData && guestGroupData.guestGroup.length > 0) {
        const group = new Group(
          guestGroupData.guestGroup.map((g: Api.GroupMember) => new Person({
            id: g.id,
            name: g.name,
            lastName: g.lastName,
            scdLastName: g.scdLastName,
            birthDate: g.date,
          })),
          guestGroupData.guestYearGroup || 0,
        );
        setActiveGuestGroup(group);
      } else {
        setActiveGuestGroup(null);
      }
    }
  }, [userAuth]);

  // Funciones para manejo de selección activa (estabilizadas con useCallback)
  const setActiveSelection = useCallback((selection: Person | Synastry | Group | undefined) => {
    setActiveSelectionState(selection);
  }, []);

  const setSelectedType = useCallback((type: 'universal' | 'person' | 'partner' | 'group' | undefined) => {
    setSelectedTypeState(type);
  }, []);

  // Actualizar userPerson cuando cambie la información del usuario
  useEffect(() => {
    const updatedUserPerson = new Person({
      id: userAuth?.user.id?.toString() || '',
      name: userAuth?.user.firstName || '',
      lastName: userAuth?.user.lastName || '',
      scdLastName: userAuth?.user.scdLastName || '',
      birthDate: userAuth?.user.birthDate?.toString() || '',
    });

    // Solo actualizar si no hay una selección activa o si la selección actual es la persona por defecto
    if (!activeSelection || (activeSelection instanceof Person && activeSelection.id === updatedUserPerson.id)) {
      setActiveSelectionState(updatedUserPerson);
    }
  }, [userAuth]);

  // Memoize selectActiveGuestPartner function
  const selectActiveGuestPartner = useCallback((guestPartnerData: GuestPartner) => {
    if (!guestPartnerData) {
      throw new Error('partner is required');
    }
    const mapPartner: Person[] = guestPartnerData.guestPartner.map((p: Api.Partner) => new Person({
      id: p.id,
      name: p.names,
      lastName: p.lastName,
      scdLastName: p.scdLastName,
      birthDate: p.date,
      yearMet: guestPartnerData.guestMeetYear,
    }));
    const synastry: Synastry = new Synastry(
      mapPartner[0],
      mapPartner[1],
    );
    setActiveGuestPartner(synastry);
    setGuestPartner({ guestPartner: guestPartnerData.guestPartner, guestMeetYear: guestPartnerData.guestMeetYear, name: guestPartnerData.name });
  }, []);

  // Memoize selectActiveGuestGroup function
  const selectActiveGuestGroup = useCallback((guestGroupData: GuestGroup) => {
    if (!guestGroupData) {
      throw new Error('group is required');
    }
    const mapGroup: Person[] = guestGroupData.guestGroup.map((g: Api.GroupMember) => new Person({
      id: g.id,
      name: g.name,
      lastName: g.lastName,
      scdLastName: g.scdLastName,
      birthDate: g.date,
    }));
    const groupClass: Group = new Group(mapGroup, guestGroupData.guestYearGroup);
    setActiveGuestGroup(groupClass);
    setGuestGroup({ guestGroup: guestGroupData.guestGroup, guestYearGroup: guestGroupData.guestYearGroup, name: guestGroupData.name });
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: EnergyContextInterface = {
    // Nuevo: funciones de selección activa
    activeSelection,
    setActiveSelection,
    selectedType,
    setSelectedType,
    guestPartner,
    activeGuestPartner,
    selectActiveGuestPartner,
    guestGroup,
    activeGuestGroup,
    selectActiveGuestGroup,
  };

  return (
    <EnergyContext.Provider value={value}>
      {children}
    </EnergyContext.Provider>
  );
}

export default EnergyProvider;
