/* eslint-disable max-len */
import { getYear } from 'date-fns';
import {
  useContext,
  useEffect, useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { TiPlus } from 'react-icons/ti';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import DestinyTable from '@/components/personal/destinyTable/DestinyTable';
import SelectPartner from '@/components/sinastry/SelectPartner';
import { ConsultContext } from '@/context/ConsultContext';
import useConsult from '@/hooks/useConsult';
import Synastry from '@/resources/Synastry';
import { reduceNumber } from '@/utils/numbers';

interface SinastryDestinyTableComponent {
  table: any[];
  start: number;
  consultant: any;
  partner: any;
  tableP: any[];
  startP: number;
  currentYearRef?: React.RefObject<HTMLDivElement> | null;
}

function SinastryDestinyTable({
  table,
  start,
  consultant,
  partner,
  tableP,
  startP,
  currentYearRef = null,
}: SinastryDestinyTableComponent) {
  const [binomActive, setBinomActive] = useState(false);
  const { t } = useTranslation();
  const { calculationDate } = useConsult();
  const singleC = consultant.getSingle();
  const singleP = partner.getSingle();
  const synastry = new Synastry(consultant, partner);

  const partnerDT = [];
  for (let i = 0; i < table.length; i += 1) {
    partnerDT.push({
      pmC: table[i].pmC,
      pmN: table[i].pmN,
      pmD: table[i].pmD,
      pMC: table[i].pMC,
      pMN: table[i].pMN,
      pMD: table[i].pMD,
      pfC: (singleC) ? table[i].pfC : '',
      pfN: (singleC) ? table[i].pfN : 0,
      pfD: (singleC) ? table[i].pfD : 0,

      pmCP: tableP[i].pmC,
      pmNP: tableP[i].pmN,
      pmDP: tableP[i].pmD,
      pMCP: tableP[i].pMC,
      pMNP: tableP[i].pMN,
      pMDP: tableP[i].pMD,
      pfCP: singleP ? tableP[i].pfC : '',
      pfNP: singleP ? tableP[i].pfN : 0,
      pfDP: singleP ? tableP[i].pfD : 0,

      pmCPC: `${table[i].pmC} ${tableP[i].pmC}`,
      pmNPC: reduceNumber(table[i].pmN + tableP[i].pmN),
      pmDPC: reduceNumber(table[i].pmD + tableP[i].pmD),

      pMCPC: `${table[i].pMC} ${tableP[i].pMC}`,
      pMNPC: reduceNumber(table[i].pMN + tableP[i].pMN),
      pMDPC: reduceNumber(table[i].pMD + tableP[i].pMD),

      pfCPC: `${singleC ? table[i].pfC : ''} ${singleP ? tableP[i].pfC : ''}`,
      pfNPC: reduceNumber((singleC ? table[i].pfN : 0) + (singleP ? tableP[i].pfN : 0)),
      pfDPC: reduceNumber((singleC ? table[i].pfD : 0) + (singleP ? tableP[i].pfD : 0)),
    });
  }

  return (
    <div className="destinity-table flex mb-8 justify-center">
      <div className="w-32 z-0">
        <div className="h-6 w-32 text-13 font-black bg-main-30 border-t border-gray-400 border-l border-r flex items-center justify-start px-1">
          {t('sinastry.destinyTable.year')}
        </div>
        <div className="h-6 text-13 font-black bg-black bg-opacity-10 border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
          {t('sinastry.destinyTable.age')}
        </div>
        <div className="h-12 text-13 font-black bg-white border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
          {t('sinastry.destinyTable.mentalPlane')}
        </div>
        <div className="h-12 text-13 font-black bg-white border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
          {t('sinastry.destinyTable.physicalPlane')}
        </div>
        <div className="h-12 text-13 font-black bg-white border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
          {t('sinastry.destinyTable.emotionalPlane')}
        </div>
        <button
          type="button"
          className={`${binomActive ? 'bg-gold' : 'bg-yellow'} h-10 font-bold mb-1 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl flex justify-center items-center absolute btn-destiny-synastry text-13 text-white px-2`}
          onClick={() => { setBinomActive(!binomActive); }}
        >
          {t('sinastry.destinyTable.binomials')}
        </button>
        <div className="h-10 text-13 font-black bg-pink border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
          {t('sinastry.destinyTable.spiritualPlane')}
        </div>
        <div className="mt-5 h-10 text-13 font-black bg-gray bg-opacity-15 border-b border-l border-r border-t border-gray-400 flex items-center justify-start px-1">
          {t('sinastry.destinyTable.personalYear')}
        </div>
        <div className="h-10 text-13 font-black bg-white border-b border-l border-r border-gray-400 flex items-center justify-start px-1">
          {t('sinastry.destinyTable.destinyNumber')}
        </div>
      </div>
      {partnerDT.map((el, i) => {
        const isCurrentYear = calculationDate.year === consultant.getYearOfBirth() + i + start;
        return (
          <>
            <div className="nameBreakdown">
              <div
                ref={isCurrentYear ? currentYearRef : null}
                className={`h-6 w-7 text-10 text-center border-t border-gray-400 border-r ${
                  isCurrentYear ? 'bg-red-50' : 'bg-main-30'
                }`}
              >
                {consultant.getYearOfBirth() + i + start}
              </div>
              <div className={`h-6 w-7 text-13 text-center border-b border-r border-gray-400 ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-black bg-opacity-10'
              }`}
              >
                {i + start}
              </div>
              <div className={`h-12 w-7 text-13 border-b border-r border-gray-400 flex flex-col ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-white'
              }`}
              >
                <strong className="h-6 w-7 leading-6 text-center border-b border-gray-400">{el.pmC}</strong>
                <p className="h-6 w-7 leading-6 text-center text-10">
                  {el.pmN}
                  /
                  {el.pmD}
                </p>
              </div>
              <div className={`h-12 w-7 text-13 border-b border-r border-gray-400 flex flex-col ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-white'
              }`}
              >
                <strong className="h-6 w-7 leading-6 text-center border-b border-gray-400">{el.pMC}</strong>
                <p className="h-4 text-center text-10">
                  {el.pMN}
                  /
                  {el.pMD}
                </p>
              </div>
              <div className={`h-12 w-7 text-13 border-b border-r border-gray-400 flex flex-col ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-white'
              }`}
              >
                <strong className="h-6 w-7 leading-6 text-center border-b border-gray-400">{el.pfC}</strong>
                <p className="h-4 text-center text-10">{singleC && `${el.pfN} / ${el.pfD}`}</p>
              </div>
              <div className={`h-10 w-7 border-b border-r border-gray-400 flex items-center justify-center ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-pink'
              } ${binomActive && 'text-xs'}`}
              >
                {binomActive ? (
                  <strong>
                    {reduceNumber(el.pmD + el.pMD + el.pfD)}
                    /
                    {reduceNumber(el.pmN + el.pMN + el.pfN)}
                  </strong>
                ) : <strong>{reduceNumber(el.pmD + el.pMD + el.pfD)}</strong>}
              </div>
              <div className={`mt-5 h-10 w-7 text-13 font-bold border-b border-r border-t border-gray-400 flex items-center justify-center ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-gray bg-opacity-15'
              }`}
              >
                {consultant.calcPersonalYear(consultant.getYearOfBirth() + i + start)}
              </div>
              <div className={`h-10 w-7 text-13 font-bold border-b border-r border-gray-400 flex items-center justify-center ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-white'
              }`}
              >
                {reduceNumber(el.pmD + el.pMD + el.pfD + consultant.calcPersonalYear(consultant.getYearOfBirth() + i + start))}
              </div>
            </div>

            <div className="nameBreakdown">
              <div className={`h-6 w-7 text-10 text-center border-t border-gray-400 border-r ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-main-30'
              }`}
              >
                {partner.getYearOfBirth() + i + startP}
              </div>
              <div className={`h-6 w-7 text-13 text-center border-b border-r border-gray-400 ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-black bg-opacity-10'
              }`}
              >
                {i + startP}
              </div>
              <div className={`h-12 w-7 text-13 border-b border-r border-gray-400 flex flex-col ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-white'
              }`}
              >
                <strong className="h-6 w-7 leading-6 text-center border-b border-gray-400">{el.pmCP}</strong>
                <p className="h-6 w-7 leading-6 text-center text-10">
                  {el.pmNP}
                  /
                  {el.pmDP}
                </p>
              </div>
              <div className={`h-12 w-7 text-13 border-b border-r border-gray-400 flex flex-col ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-white'
              }`}
              >
                <strong className="h-6 w-7 leading-6 text-center border-b border-gray-400">{el.pMCP}</strong>
                <p className="h-4 text-center text-10">
                  {el.pMNP}
                  /
                  {el.pMDP}
                </p>
              </div>
              <div className={`h-12 w-7 text-13 border-b border-r border-gray-400 flex flex-col ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-white'
              }`}
              >
                <strong className="h-6 w-7 leading-6 text-center border-b border-gray-400">{el.pfCP}</strong>
                <p className="h-4 text-center text-10">{singleP && `${el.pfNP}/${el.pfDP}`}</p>
              </div>
              <div className={`h-10 w-7 border-b border-r border-gray-400 flex items-center justify-center ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-pink'
              } ${binomActive && 'text-xs'}`}
              >
                {binomActive ? (
                  <strong>
                    {reduceNumber(el.pmNP + el.pMNP + el.pfNP)}
                    /
                    {reduceNumber(el.pmDP + el.pMDP + el.pfDP)}
                  </strong>
                ) : <strong>{reduceNumber(el.pmDP + el.pMDP + el.pfDP)}</strong>}
              </div>
              <div className={`mt-5 h-10 w-7 text-13 font-bold border-b border-r border-t border-gray-400 flex items-center justify-center ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-gray bg-opacity-15'
              }`}
              >
                {partner.calcPersonalYear(partner.getYearOfBirth() + i + startP)}
              </div>
              <div className={`h-10 w-7 text-13 font-bold border-b border-r border-gray-400 flex items-center justify-center ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-50' : 'bg-white'
              }`}
              >
                {reduceNumber(el.pmDP + el.pMDP + el.pfDP + partner.calcPersonalYear(partner.getYearOfBirth() + i + startP))}
              </div>
            </div>

            <div className="nameBreakdown">
              <div className={`h-6 w-7 text-10 text-center border-t border-gray-400 border-r ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-80' : 'bg-main-30'
              }`}
              >
                {consultant.getYearOfBirth() + i + start}
              </div>
              <div className={`h-6 w-7 text-13 text-center border-b border-r border-gray-400 ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-80' : 'bg-gold-15'
              }`}
              >
                {reduceNumber(i + start + i + startP)}
              </div>
              <div className={`h-12 w-7 text-xs border-b border-r border-gray-400 flex flex-col ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-80' : 'bg-gold-15'
              }`}
              >
                <strong className="h-6 w-7 leading-6 text-center border-b border-gray-400">{el.pmCPC}</strong>
                <p className="h-6 w-7 leading-6 text-center text-10">
                  {el.pmNPC}
                  /
                  {el.pmDPC}
                </p>
              </div>
              <div className={`h-12 w-7 text-xs border-b border-r border-gray-400 flex flex-col ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-80' : 'bg-gold-15'
              }`}
              >
                <strong className="h-6 w-7 leading-6 text-center border-b border-gray-400">{el.pMCPC}</strong>
                <p className="h-4 text-center text-10">
                  {el.pMNPC}
                  /
                  {el.pMDPC}
                </p>
              </div>
              <div className={`h-12 w-7 text-xs border-b border-r border-gray-400 flex flex-col ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-80' : 'bg-gold-15'
              }`}
              >
                <strong className="h-6 w-7 leading-6 text-center border-b border-gray-400">{el.pfCPC}</strong>
                <p className="h-4 text-center text-10">{(singleC && singleP) && `${el.pfNPC}/${el.pfDPC}`}</p>
              </div>
              <div className={`h-10 w-7 text-xs border-b border-r border-gray-400 flex items-center justify-center ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-80' : 'bg-gold-15'
              }`}
              >
                <strong>
                  {reduceNumber(el.pmNPC + el.pMNPC + el.pfNPC)}
                  /
                  {reduceNumber(el.pmDPC + el.pMDPC + el.pfDPC)}
                </strong>
              </div>
              <div className={`mt-5 h-10 w-7 text-xs font-bold border-b border-r border-t border-gray-400 flex items-center justify-center ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-80' : 'bg-gold-15'
              }`}
              >
                {synastry.calcPersonalYear(consultant.getYearOfBirth() + i + start)}
              </div>
              <div className={`h-10 w-7 text-xs font-bold border-b border-r border-gray-400 flex items-center justify-center ${
                calculationDate.year === consultant.getYearOfBirth() + i + start ? 'bg-red-80' : 'bg-gold-15'
              }`}
              >
                {reduceNumber(el.pmDPC + el.pMDPC + el.pfDPC + synastry.calcPersonalYear(consultant.getYearOfBirth() + i + start))}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

SinastryDestinyTable.defaultProps = {
  currentYearRef: null,
};

export default function SinastryDestinyTablePage() {
  const {
    consultant, activePartnerData, selectedPartnersAsPersons,
  } = useContext(ConsultContext);
  const { t } = useTranslation();
  const [partnerActive, setPartnerActive] = useState<boolean>(true);
  const [personOneActive, setPersonOneActive] = useState<boolean>(false);
  const [personTwoActive, setPersonTwoActive] = useState<boolean>(false);
  const currentYearRef = useRef<HTMLDivElement>(null);

  // Función para hacer scroll al año actual
  const scrollToCurrentYear = () => {
    if (currentYearRef.current) {
      currentYearRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  // Effect para hacer scroll al año actual cuando se carga la página
  useEffect(() => {
    if (selectedPartnersAsPersons && selectedPartnersAsPersons.length >= 2) {
      // Pequeño delay para asegurar que el DOM esté renderizado
      const timer = setTimeout(() => {
        scrollToCurrentYear();
      }, 100);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [selectedPartnersAsPersons]);

  if (!consultant) {
    return <NoConsultantSelected />;
  }

  if (!activePartnerData || !selectedPartnersAsPersons || selectedPartnersAsPersons.length < 2) {
    return (
      <div className="page-content bg-cover pb-10">
        <SelectPartner />
        <div className="col-span-12 text-center mt-8">
          <strong>{t('sinastry.selectPartnerForDestinyTable')}</strong>
        </div>
      </div>
    );
  }

  // Use the already converted Person objects from context
  const person1 = selectedPartnersAsPersons[0]; // Pareja 1
  const person2 = selectedPartnersAsPersons[1]; // Pareja 2

  // Create synastry instance between the two partners (not consultant)
  const synastry = new Synastry(person1, person2);
  const yearMeet = synastry.getYearMeet() || new Date().getFullYear();

  // Calculate age when they met for person1
  const ageMeetP1 = yearMeet - getYear(person1.birthDate);
  const destinyTableP1 = person1.getDestinityTable();
  const tableFromMeetP1 = destinyTableP1.slice(ageMeetP1);

  // Calculate age when they met for person2
  const ageMeetP2 = yearMeet - getYear(person2.birthDate);
  const destinyTableP2 = person2.getDestinityTable();
  const tableFromMeetP2 = destinyTableP2.slice(ageMeetP2);

  // Split tables into sections for synastry view (from when they met)
  const synastryTable1P1 = tableFromMeetP1.slice(0, 11);
  const synastryTable2P1 = tableFromMeetP1.slice(11, 22);
  const synastryTable3P1 = tableFromMeetP1.slice(22, 33);
  const synastryTable4P1 = tableFromMeetP1.slice(33, 44);
  const synastryTable5P1 = tableFromMeetP1.slice(44, 55);
  const synastryTable6P1 = tableFromMeetP1.slice(55, 66);

  const synastryTable1P2 = tableFromMeetP2.slice(0, 11);
  const synastryTable2P2 = tableFromMeetP2.slice(11, 22);
  const synastryTable3P2 = tableFromMeetP2.slice(22, 33);
  const synastryTable4P2 = tableFromMeetP2.slice(33, 44);
  const synastryTable5P2 = tableFromMeetP2.slice(44, 55);
  const synastryTable6P2 = tableFromMeetP2.slice(55, 66);

  // Full lifetime tables for individual view
  const fullTable1P1 = destinyTableP1.slice(0, 30);
  const fullTable2P1 = destinyTableP1.slice(30, 60);
  const fullTable3P1 = destinyTableP1.slice(60, 90);
  const fullTable4P1 = destinyTableP1.slice(90, 120);
  const fullTable5P1 = destinyTableP1.slice(120, 150);
  const fullTable6P1 = destinyTableP1.slice(150, 180);

  const fullTable1P2 = destinyTableP2.slice(0, 30);
  const fullTable2P2 = destinyTableP2.slice(30, 60);
  const fullTable3P2 = destinyTableP2.slice(60, 90);
  const fullTable4P2 = destinyTableP2.slice(90, 120);
  const fullTable5P2 = destinyTableP2.slice(120, 150);
  const fullTable6P2 = destinyTableP2.slice(150, 180);

  // Name cycles for both persons
  const nameCyclesP1 = person1.calcNameCycles();
  const nameSubCyclesP1 = person1.calcNameSubCycles();
  const nameCyclesP2 = person2.calcNameCycles();
  const nameSubCyclesP2 = person2.calcNameSubCycles();

  const selectPartner = () => {
    setPartnerActive(true);
    setPersonOneActive(false);
    setPersonTwoActive(false);
  };

  const selectPersonOne = () => {
    setPartnerActive(false);
    setPersonOneActive(true);
    setPersonTwoActive(false);
  };

  const selectPersonTwo = () => {
    setPartnerActive(false);
    setPersonOneActive(false);
    setPersonTwoActive(true);
  };

  return (
    <div className="page-content bg-cover pb-10">
      <SelectPartner />

      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 mb-5 relative">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-between items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="flex justify-center items-center">
              <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-red-day p-2">
                <TiPlus className="text-2xl" />
              </div>
              {t('sinastry.destinyTable.title')}
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className={`font-bold h-10 mb-1 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl text-13 px-2 ml-2 flex justify-center items-center ${!partnerActive ? 'bg-gray-400' : 'bg-yellow'
                }`}
                onClick={selectPartner}
              >
                {t('sinastry.destinyTable.partner')}
              </button>
              <button
                type="button"
                className={`font-bold h-10 mb-1 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl text-13 px-2 ml-2 flex justify-center items-center ${!personOneActive ? 'bg-gray-400' : 'bg-yellow'
                }`}
                onClick={selectPersonOne}
              >
                {t('sinastry.destinyTable.person1')}
              </button>
              <button
                type="button"
                className={`font-bold h-10 mb-1 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl text-13 px-2 ml-2 flex justify-center items-center ${!personTwoActive ? 'bg-gray-400' : 'bg-yellow'
                }`}
                onClick={selectPersonTwo}
              >
                {t('sinastry.destinyTable.person2')}
              </button>
            </div>
          </div>
          <div className="pinnacle-wrap px-8 py-3">
            {partnerActive && (
              <>
                <SinastryDestinyTable
                  table={synastryTable1P1}
                  start={0 + ageMeetP1}
                  consultant={person1}
                  partner={person2}
                  tableP={synastryTable1P2}
                  startP={0 + ageMeetP2}
                  currentYearRef={currentYearRef}
                />
                <SinastryDestinyTable
                  table={synastryTable2P1}
                  start={11 + ageMeetP1}
                  consultant={person1}
                  partner={person2}
                  tableP={synastryTable2P2}
                  startP={11 + ageMeetP2}
                  currentYearRef={currentYearRef}
                />
                <SinastryDestinyTable
                  table={synastryTable3P1}
                  start={22 + ageMeetP1}
                  consultant={person1}
                  partner={person2}
                  tableP={synastryTable3P2}
                  startP={22 + ageMeetP2}
                  currentYearRef={currentYearRef}
                />
                <SinastryDestinyTable
                  table={synastryTable4P1}
                  start={33 + ageMeetP1}
                  consultant={person1}
                  partner={person2}
                  tableP={synastryTable4P2}
                  startP={33 + ageMeetP2}
                  currentYearRef={currentYearRef}
                />
                <SinastryDestinyTable
                  table={synastryTable5P1}
                  start={44 + ageMeetP1}
                  consultant={person1}
                  partner={person2}
                  tableP={synastryTable5P2}
                  startP={44 + ageMeetP2}
                  currentYearRef={currentYearRef}
                />
                <SinastryDestinyTable
                  table={synastryTable6P1}
                  start={55 + ageMeetP1}
                  consultant={person1}
                  partner={person2}
                  tableP={synastryTable6P2}
                  startP={55 + ageMeetP2}
                  currentYearRef={currentYearRef}
                />
              </>
            )}
            {personOneActive && (
              <>
                <DestinyTable
                  table={fullTable1P1}
                  start={0}
                  consultant={person1}
                  nameCycles={nameCyclesP1}
                  nameSubCycles={nameSubCyclesP1}
                />
                <DestinyTable
                  table={fullTable2P1}
                  start={30}
                  consultant={person1}
                  nameCycles={nameCyclesP1}
                  nameSubCycles={nameSubCyclesP1}
                />
                <DestinyTable
                  table={fullTable3P1}
                  start={60}
                  consultant={person1}
                  nameCycles={nameCyclesP1}
                  nameSubCycles={nameSubCyclesP1}
                />
                <DestinyTable
                  table={fullTable4P1}
                  start={90}
                  consultant={person1}
                  nameCycles={nameCyclesP1}
                  nameSubCycles={nameSubCyclesP1}
                />
                <DestinyTable
                  table={fullTable5P1}
                  start={120}
                  consultant={person1}
                  nameCycles={nameCyclesP1}
                  nameSubCycles={nameSubCyclesP1}
                />
                <DestinyTable
                  table={fullTable6P1}
                  start={150}
                  consultant={person1}
                  nameCycles={nameCyclesP1}
                  nameSubCycles={nameSubCyclesP1}
                />
              </>
            )}
            {personTwoActive && (
              <>
                <DestinyTable
                  table={fullTable1P2}
                  start={0}
                  consultant={person2}
                  nameCycles={nameCyclesP2}
                  nameSubCycles={nameSubCyclesP2}
                />
                <DestinyTable
                  table={fullTable2P2}
                  start={30}
                  consultant={person2}
                  nameCycles={nameCyclesP2}
                  nameSubCycles={nameSubCyclesP2}
                />
                <DestinyTable
                  table={fullTable3P2}
                  start={60}
                  consultant={person2}
                  nameCycles={nameCyclesP2}
                  nameSubCycles={nameSubCyclesP2}
                />
                <DestinyTable
                  table={fullTable4P2}
                  start={90}
                  consultant={person2}
                  nameCycles={nameCyclesP2}
                  nameSubCycles={nameSubCyclesP2}
                />
                <DestinyTable
                  table={fullTable5P2}
                  start={120}
                  consultant={person2}
                  nameCycles={nameCyclesP2}
                  nameSubCycles={nameSubCyclesP2}
                />
                <DestinyTable
                  table={fullTable6P2}
                  start={150}
                  consultant={person2}
                  nameCycles={nameCyclesP2}
                  nameSubCycles={nameSubCyclesP2}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
