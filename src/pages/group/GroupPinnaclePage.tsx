/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { HiArrowRight } from 'react-icons/hi';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import SectionTitle from '@/components/SectionTitle';
import SelectGroup from '@/components/group/SelectGroup';
import GroupPinnacle from '@/components/group/pinnacle/GroupPinnacle';
import GroupPinnacleName from '@/components/group/pinnacle/GroupPinnacleName';
import AnnualReturn from '@/components/personal/pinnacle/AnnualReturn';
import useConsult from '@/hooks/useConsult';
import Group from '@/resources/Group';
import Person from '@/resources/Person';

export default function GroupPinnaclePage() {
  const {
    consultant, activeGroup, selectedGroup, calculationDate,
  } = useConsult();
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isGroupPinnacleVerificationActive, setIsGroupPinnacleVerificationActive] = useState(false);
  const [isCheckGPActive, setIsCheckGPActive] = useState(false);

  const [memberNameChecks, setMemberNameChecks] = useState<Record<string, boolean>>({});
  const [memberPinnacleChecks, setMemberPinnacleChecks] = useState<Record<string, boolean>>({});

  const toggleMemberNameCheck = (memberId: string) => {
    setMemberNameChecks((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  const toggleMemberPinnacleCheck = (memberId: string) => {
    setMemberPinnacleChecks((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };
  const handleCheckGPActive = () => {
    setIsCheckGPActive(!isCheckGPActive);
  };

  const handleGroupPinnacleVerification = () => {
    setIsGroupPinnacleVerificationActive(!isGroupPinnacleVerificationActive);
  };

  // Función para terminar el drag (memoizada para useEffect)
  const handleMouseUp = useCallback(() => {
    if (!scrollContainerRef.current) return;

    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
    scrollContainerRef.current.style.userSelect = 'auto';
  }, []);

  // Función para iniciar el drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);

    // Cambiar cursor
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.userSelect = 'none';
  };

  // Función para manejar el movimiento del mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Velocidad del scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Función para salir del área de drag
  const handleMouseLeave = () => {
    handleMouseUp();
  };

  // Efecto para agregar event listeners globales
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mouseleave', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseUp);
    };
  }, [isDragging, handleMouseUp]);

  // Validaciones mejoradas con mensajes informativos
  if (!consultant) {
    return <NoConsultantSelected />;
  }

  if (!activeGroup) {
    return (
      <div className="page-content bg-cover pb-10 px-4 mx-auto">
        <SelectGroup />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t('group.noGroupSelected')}</h3>
            <p className="text-gray-600">{t('group.noGroupSelectedMessage')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedGroup || selectedGroup.length === 0) {
    return (
      <div className="page-content bg-cover pb-10 px-4 mx-auto">
        <SelectGroup />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t('group.noMembersInGroup')}</h3>
            <p className="text-gray-600">
              {t('group.noMembersInGroupMessage', { groupName: activeGroup.name })}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Crear el objeto Group solo si tenemos datos válidos
  const GroupPerson = new Group(selectedGroup, activeGroup.lastInit);
  const annualReturn = GroupPerson.annualReturn(calculationDate.year);
  const colors = [
    'bg-lime-600',
    'bg-cyan-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-green-600',
    'bg-red-600',
    'bg-sky-600',
    'bg-amber-600',
  ];

  return (
    <div className="page-content bg-cover pb-10 ">
      <SelectGroup />
      <div className="mx-auto px-5 py-6">
        {/* Leyenda de navegación */}
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
            <HiArrowRight className="text-blue-600 text-lg" />
            <p className="text-sm text-gray-700 font-medium">
              {t('group.dragToSeeMore')}
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="group-container flex-shrink-0 w-[330px] min-w-0 mt-5 pr-4">
            <SectionTitle
              title={`${t('group.nameLabel')} ${activeGroup.name}`}
              color="bg-group"
              button={{
                text: isCheckGPActive ? t('sinastry.pinnacle.normal') : t('sinastry.pinnacle.verification'),
                handle: handleCheckGPActive,
                isActive: isCheckGPActive,
              }}
            />
            <div className="mb-5">
              <GroupPinnacleName main="bg-active-radial" Consultant={GroupPerson} isVerificationActive={isCheckGPActive} />
            </div>
            <SectionTitle
              title={`${t('group.pinnacleLabel')} ${activeGroup.name}`}
              color=" bg-group"
              button={{
                text: isGroupPinnacleVerificationActive ? t('sinastry.pinnacle.normal') : t('sinastry.pinnacle.verification'),
                handle: handleGroupPinnacleVerification,
                isActive: isGroupPinnacleVerificationActive,
              }}
            />
            <div className="section-wrap px-2 py-7 h-560 bg-active-radial mb-5">
              <GroupPinnacle main="" consultant={GroupPerson} size="small" isVerificationActive={isGroupPinnacleVerificationActive} />
            </div>
            <SectionTitle
              title={`${t('group.returnLabel')} ${activeGroup.name}`}
              color="bg-group"
            />
            <div className="pinnacle-wrap bg-active-radial p-4">
              <AnnualReturn annualReturn={annualReturn} current months size="xl" />
            </div>
          </div>

          {/* Contenedor principal con scroll horizontal */}
          <div
            ref={scrollContainerRef}
            className="w-2/3 flex overflow-x-auto gap-6 pb-4 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: isDragging ? 'none' : 'auto',
            }}
          >
            {/* Grupo - siempre visible, ancho fijo para 2 elementos */}

            {/* Miembros - scroll horizontal */}
            {selectedGroup.map((member: Person, index: number) => {
              const hasMemberId = member.id !== undefined && member.id !== null;
              const memberKey = hasMemberId ? String(member.id) : `member-${index}`;
              const isMemberNameActive = memberNameChecks[memberKey] ?? false;
              const isMemberPinnacleActive = memberPinnacleChecks[memberKey] ?? false;

              return (
                <div key={memberKey} className="member-container flex-shrink-0 w-[314px] min-w-0 mt-5">
                  <SectionTitle
                    title={`${t('group.nameLabel')} ${member.name}`}
                    color="bg-group"
                    button={{
                      text: isMemberNameActive ? t('sinastry.pinnacle.normal') : t('sinastry.pinnacle.verification'),
                      handle: () => toggleMemberNameCheck(memberKey),
                      isActive: isMemberNameActive,
                    }}
                    bg={colors[index]}
                  />
                  <div className="mb-5">
                    <GroupPinnacleName main="" Consultant={member} isVerificationActive={isMemberNameActive} />
                  </div>
                  <SectionTitle
                    title={`${t('group.pinnacleLabel')} ${member.name}`}
                    color=" bg-group"
                    button={{
                      text: isMemberPinnacleActive ? t('sinastry.pinnacle.normal') : t('sinastry.pinnacle.verification'),
                      handle: () => toggleMemberPinnacleCheck(memberKey),
                      isActive: isMemberPinnacleActive,
                    }}
                    bg={colors[index]}
                  />
                  <div className="section-wrap px-2 py-7 h-560 mb-5">
                    <GroupPinnacle main="bg-white" consultant={member} size="small" isVerificationActive={isMemberPinnacleActive} />
                  </div>
                  <SectionTitle
                    title={`${t('group.returnLabel')} ${member.name}`}
                    color="bg-group"
                    bg={colors[index]}
                  />
                  <div className="pinnacle-wrap bg-white p-4">
                    <AnnualReturn annualReturn={member.annualReturn(calculationDate)} current months size="xl" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
/*

*/
