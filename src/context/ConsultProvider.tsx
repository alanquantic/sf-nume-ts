import { format } from 'date-fns';
import {
  useCallback, useEffect, useMemo, useReducer, useState,
} from 'react';
import { useQueryClient } from 'react-query';

import { ConsultContext, ConsultContextInterface } from './ConsultContext';
import { consultReducer, types } from './ConsultReducer';

import { getConsultantsQueryKey, useConsultantsQuery } from '@/api/consultants';
import { useAuth } from '@/context/AuthProvider';
import Person from '@/resources/Person';
import { sanitizeName } from '@/utils/constants';

const INITIAL_STATE = {
  consultant: null,
  activeConsultant: null,
  consultationDate: new Date(),
  calculationDate: { day: 0, month: 0, year: 0 },
  calculationYear: 0,
  isEditingConsultant: false,
  activePartner: null,
  groupsAvailable: [],
  activeGroup: null,
  isEditingGroup: false,
  setIsEditingGroup: () => null,
  selectedMonthReport: 0,
  setSelectedMonthReport: () => null,
};

function ConsultProvider({ children }: any) {
  const [consultState, dispatch] = useReducer(consultReducer, INITIAL_STATE);

  // Single source of truth: the consultants list from react-query.
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.user?.id;
  const consultantsQueryKey = useMemo(() => getConsultantsQueryKey(userId), [userId]);
  const { data: consultantsData } = useConsultantsQuery();
  const consultants = useMemo<Api.Consultant[]>(
    () => (Array.isArray(consultantsData) ? consultantsData : []),
    [consultantsData],
  );

  // The active consultant is stored by id and always derived from the cache, so it
  // never goes stale and editing scalar fields can't wipe the nested relations.
  // The fallback holds the last-selected object for the brief window before a freshly
  // created consultant appears in the (re)fetched list.
  const [activeConsultantId, setActiveConsultantId] = useState<string | null>(null);
  const [activeConsultantFallback, setActiveConsultantFallback] = useState<Api.Consultant | null>(null);

  const activeConsultant = useMemo<Api.Consultant | null>(() => {
    if (!activeConsultantId) return null;
    const fromCache = consultants.find((c) => c?.id === activeConsultantId);
    if (fromCache) return fromCache;
    if (activeConsultantFallback?.id === activeConsultantId) return activeConsultantFallback;
    return null;
  }, [consultants, activeConsultantId, activeConsultantFallback]);

  // Person derived from the active consultant (always fresh, e.g. after editing the name).
  const consultant = useMemo<Person | null>(() => {
    if (!activeConsultant) return null;
    return new Person({
      id: activeConsultant.id || '',
      name: sanitizeName(activeConsultant.names || ''),
      lastName: sanitizeName(activeConsultant.lastName || ''),
      scdLastName: sanitizeName(activeConsultant.scdLastName || ''),
      birthDate: activeConsultant.date?.toString() || '',
    });
  }, [activeConsultant]);

  // Available sub-collections derived from the active consultant (no mirrored state).
  const partnersAvailable = useMemo<Api.Partner[]>(() => (activeConsultant?.partnerData || []).flatMap((pd) => pd.partner || []), [activeConsultant]);
  const partnerDataAvailable = useMemo<Api.PartnerData[]>(() => activeConsultant?.partnerData || [], [activeConsultant]);
  const groupsAvailable = useMemo<Api.GroupData[]>(() => activeConsultant?.groupData || [], [activeConsultant]);

  const [consultationDate, setConsultationDate] = useState<Date>(new Date());
  const [activePartner, setActivePartner] = useState<Person | null>(null);
  const [selectedMonthReport, setSelectedMonthReport] = useState<number>(0);

  // Memoize calculationDate to prevent unnecessary recalculations
  const calculationDate = useMemo(() => ({
    day: Number(format(consultationDate, 'dd')),
    month: Number(format(consultationDate, 'MM')),
    year: Number(format(consultationDate, 'yyyy')),
  }), [consultationDate]);

  // Memoize calculationYear
  const calculationYear = useMemo(
    () => Number(format(consultationDate, 'yyyy')),
    [consultationDate],
  );

  // Initialize selectedMonthReport with current month if not set
  useEffect(() => {
    if (selectedMonthReport === 0 && calculationDate.month > 0) {
      setSelectedMonthReport(calculationDate.month);
    }
  }, [calculationDate.month, selectedMonthReport]);

  // Group management state (UI selection)
  const [activeGroup, setActiveGroup] = useState<Api.GroupData | null>(null);
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Person[]>([]);

  // PartnerData management state (UI selection)
  const [activePartnerData, setActivePartnerData] = useState<Api.PartnerData | null>(null);
  const [isEditingPartnerData, setIsEditingPartnerData] = useState(false);
  const [selectedPartnersAsPersons, setSelectedPartnersAsPersons] = useState<Person[]>([]);

  // Optimistically patch a consultant into the react-query cache so the derived
  // activeConsultant / lists update instantly; the mutation hooks revalidate afterwards.
  const patchConsultantInCache = useCallback((updated: Api.Consultant) => {
    setActiveConsultantFallback(updated);
    queryClient.setQueryData<Api.Consultant[]>(consultantsQueryKey, (old) => {
      const list = Array.isArray(old) ? old : [];
      return list.some((c) => c?.id === updated.id)
        ? list.map((c) => (c?.id === updated.id ? updated : c))
        : [...list, updated];
    });
  }, [queryClient, consultantsQueryKey]);

  // Memoize selectConsultant function
  const selectConsultant = useCallback((newConsultant: Api.Consultant) => {
    if (!newConsultant) throw new Error('consultant is required');

    setActiveConsultantFallback(newConsultant);
    setActiveConsultantId(newConsultant.id || null);

    // Reset partner/group selections when switching consultant
    setActivePartnerData(null);
    setSelectedPartnersAsPersons([]);
    setActivePartner(null);
    setActiveGroup(null);
    setSelectedGroup([]);
  }, []);

  // Memoize selectActiveConsultant function
  const selectActiveConsultant = useCallback((newActiveConsultant: Api.Consultant) => {
    setActiveConsultantFallback(newActiveConsultant);
    setActiveConsultantId(newActiveConsultant.id || null);
    // Clear active partner data when switching consultants
    setActivePartnerData(null);
    setSelectedPartnersAsPersons([]);
  }, []);

  // Memoize selectActivePartner function
  const selectActivePartner = useCallback((newPartner: Api.Partner) => {
    if (!newPartner) throw new Error('partner is required');

    // Si el partner tiene id vacío, limpiar la selección
    if (!newPartner.id) {
      setActivePartner(null);
      return;
    }

    // Buscar la versión más actualizada del partner en partnersAvailable
    const updatedPartner = partnersAvailable.find((p) => p.id === newPartner.id) || newPartner;

    const newPartnerPerson = new Person({
      id: updatedPartner.id || '',
      name: sanitizeName(updatedPartner.names || ''),
      lastName: sanitizeName(updatedPartner.lastName || ''),
      scdLastName: sanitizeName(updatedPartner.scdLastName || ''),
      birthDate: updatedPartner.date?.toString() || '',
      yearMet: 0, // Api.Partner no tiene yearMeet, se establece en 0
    });

    setActivePartner(newPartnerPerson);
  }, [partnersAvailable]);

  // Memoize updateUserPartnerActive function
  const updateUserPartnerActive = useCallback((activePartnerId: string) => {
    const newPartner = partnersAvailable.find((p) => p.id === activePartnerId);
    if (newPartner) {
      selectActivePartner(newPartner);
    }
  }, [partnersAvailable, selectActivePartner]);

  // Memoize selectActivePartnerData function
  const selectActivePartnerData = useCallback((partnerData: Api.PartnerData) => {
    if (!partnerData || !partnerData.id) {
      setActivePartnerData(null);
      setSelectedPartnersAsPersons([]);
      return;
    }

    // Buscar el partnerData actualizado en partnerDataAvailable
    const updatedPartnerData = partnerDataAvailable.find((p) => p.id === partnerData.id) || partnerData;

    setActivePartnerData(updatedPartnerData);

    // Convertir los partners del grupo a objetos Person
    if (updatedPartnerData.partner && updatedPartnerData.partner.length > 0) {
      const partnersAsPersons = updatedPartnerData.partner.map((partner) => new Person({
        id: partner.id,
        name: sanitizeName(partner.names || ''),
        lastName: sanitizeName(partner.lastName || ''),
        scdLastName: sanitizeName(partner.scdLastName || ''),
        birthDate: partner.date || '',
        yearMet: updatedPartnerData.yearMeet || undefined,
      }));
      setSelectedPartnersAsPersons(partnersAsPersons);

      // Establecer el primer partner como activePartner
      if (partnersAsPersons.length > 0) {
        setActivePartner(partnersAsPersons[0]);
      }
    } else {
      setSelectedPartnersAsPersons([]);
      setActivePartner(null);
    }
  }, [partnerDataAvailable]);

  // Memoize handleIsEditingPartnerData function
  const handleIsEditingPartnerData = useCallback((isEditing: boolean) => {
    setIsEditingPartnerData(isEditing);
  }, []);

  // Memoize handleSetSelectedPartnersAsPersons function
  const handleSetSelectedPartnersAsPersons = useCallback((partners: Person[]) => {
    setSelectedPartnersAsPersons(partners);
  }, []);

  // Memoize updateConsultantPartners function — patches the cache (optimistic) so the
  // derived activeConsultant / lists update instantly; the API hooks revalidate after.
  const updateConsultantPartners = useCallback((updatedConsultant: Api.Consultant) => {
    patchConsultantInCache(updatedConsultant);
    setActiveConsultantId(updatedConsultant.id || null);

    // Si hay un partnerData activo, actualizarlo también
    if (activePartnerData) {
      const updatedActivePartnerData = updatedConsultant.partnerData?.find((p) => p.id === activePartnerData.id);
      if (updatedActivePartnerData) {
        setActivePartnerData(updatedActivePartnerData);

        // Actualizar selectedPartnersAsPersons
        if (updatedActivePartnerData.partner && updatedActivePartnerData.partner.length > 0) {
          const partnersAsPersons = updatedActivePartnerData.partner.map((partner) => new Person({
            id: partner.id,
            name: sanitizeName(partner.names || ''),
            lastName: sanitizeName(partner.lastName || ''),
            scdLastName: sanitizeName(partner.scdLastName || ''),
            birthDate: partner.date || '',
            yearMet: updatedActivePartnerData.yearMeet || undefined,
          }));
          setSelectedPartnersAsPersons(partnersAsPersons);
        } else {
          setSelectedPartnersAsPersons([]);
        }
      }
    }

    // Si hay un partner activo, actualizarlo también
    if (activePartner) {
      const updatedActivePartner = (updatedConsultant.partnerData || [])
        .flatMap((pd) => pd.partner || [])
        .find((p) => p.id === activePartner.id);
      if (updatedActivePartner) {
        const updatedPartnerPerson = new Person({
          id: updatedActivePartner.id || '',
          name: sanitizeName(updatedActivePartner.names || ''),
          lastName: sanitizeName(updatedActivePartner.lastName || ''),
          scdLastName: sanitizeName(updatedActivePartner.scdLastName || ''),
          birthDate: updatedActivePartner.date?.toString() || '',
          yearMet: 0, // Api.Partner no tiene yearMeet, se establece en 0
        });
        setActivePartner(updatedPartnerPerson);
      }
    }
  }, [patchConsultantInCache, activePartner, activePartnerData]);

  // Memoize updateConsultantGroups function — patches the cache (optimistic).
  const updateConsultantGroups = useCallback((updatedConsultant: Api.Consultant) => {
    patchConsultantInCache(updatedConsultant);
    setActiveConsultantId(updatedConsultant.id || null);

    // Si hay un grupo activo, actualizarlo también
    if (activeGroup) {
      const updatedActiveGroup = updatedConsultant.groupData?.find((g) => g.id === activeGroup.id);
      if (updatedActiveGroup) {
        setActiveGroup(updatedActiveGroup);
        if (updatedActiveGroup.members?.length === 0) {
          setSelectedGroup([]);
        } else {
          const membersPerson = updatedActiveGroup.members?.map((member) => new Person({
            id: member.id,
            name: sanitizeName(member.name || ''),
            lastName: sanitizeName(member.lastName || ''),
            scdLastName: sanitizeName(member.scdLastName || ''),
            birthDate: member.date || '',
          }));
          setSelectedGroup(membersPerson as Person[]);
        }
      }
    }
  }, [patchConsultantInCache, activeGroup]);

  // Memoize selectActiveGroup function
  const selectActiveGroup = useCallback((group: Api.GroupData | null) => {
    if (!group || !group.id) {
      setActiveGroup(null);
      setSelectedGroup([]);
      return;
    }

    // Buscar el grupo actualizado en groupsAvailable
    const updatedGroup = groupsAvailable.find((g) => g.id === group.id) || group;

    if (updatedGroup.members?.length === 0) {
      setSelectedGroup([]);
    } else {
      const membersPerson = updatedGroup.members?.map((member) => new Person({
        id: member.id,
        name: sanitizeName(member.name || ''),
        lastName: sanitizeName(member.lastName || ''),
        scdLastName: sanitizeName(member.scdLastName || ''),
        birthDate: member.date || '',
      }));
      setSelectedGroup(membersPerson as Person[]);
    }
    setActiveGroup(updatedGroup);
  }, [groupsAvailable]);

  // Memoize handleIsEditingConsultant function
  const handleIsEditingConsultant = useCallback((isEditing: boolean) => {
    dispatch({ type: types.isEditingConsultant, isEditing });
  }, []);

  // Memoize setIsEditingGroup function
  const handleSetIsEditingGroup = useCallback((isEditing: boolean) => {
    setIsEditingGroup(isEditing);
  }, []);

  // Memoize setSelectedGroup function
  const handleSetSelectedGroup = useCallback((group: Person[]) => {
    setSelectedGroup(group);
  }, []);

  // Memoize the entire context value to prevent unnecessary re-renders
  const value: ConsultContextInterface = useMemo(() => ({
    ...consultState,
    consultant,
    activeConsultant,
    selectConsultant,
    selectActiveConsultant,
    consultationDate,
    selectConsultationDate: setConsultationDate,
    calculationDate,
    calculationYear,
    selectedMonthReport,
    setSelectedMonthReport,
    handleIsEditingConsultant,
    activePartner,
    selectActivePartner,
    partnersAvailable,
    updateUserPartnerActive,
    updateConsultantPartners,
    // PartnerData management
    partnerDataAvailable,
    activePartnerData,
    selectActivePartnerData,
    isEditingPartnerData,
    handleIsEditingPartnerData,
    selectedPartnersAsPersons,
    setSelectedPartnersAsPersons: handleSetSelectedPartnersAsPersons,
    // Group management
    groupsAvailable,
    activeGroup,
    isEditingGroup,
    setIsEditingGroup: handleSetIsEditingGroup,
    selectActiveGroup,
    selectedGroup,
    setSelectedGroup: handleSetSelectedGroup,
    updateConsultantGroups,
  }), [
    consultState,
    consultant,
    activeConsultant,
    selectConsultant,
    selectActiveConsultant,
    consultationDate,
    calculationDate,
    calculationYear,
    selectedMonthReport,
    setSelectedMonthReport,
    handleIsEditingConsultant,
    activePartner,
    selectActivePartner,
    partnersAvailable,
    updateUserPartnerActive,
    updateConsultantPartners,
    // PartnerData dependencies
    partnerDataAvailable,
    activePartnerData,
    selectActivePartnerData,
    isEditingPartnerData,
    handleIsEditingPartnerData,
    selectedPartnersAsPersons,
    handleSetSelectedPartnersAsPersons,
    // Group dependencies
    groupsAvailable,
    activeGroup,
    isEditingGroup,
    handleSetIsEditingGroup,
    selectActiveGroup,
    selectedGroup,
    handleSetSelectedGroup,
    updateConsultantGroups,
  ]);

  return (
    <ConsultContext.Provider value={value}>
      {children}
    </ConsultContext.Provider>
  );
}

export default ConsultProvider;
