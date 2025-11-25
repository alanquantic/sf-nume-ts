import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdEdit, MdExpandLess, MdExpandMore } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';

import { ConsultContext } from '@/context/ConsultContext';
import PartnerFormInLine from './PartnerFormInLine';

export default function SelectPartner() {
  const {
    partnerDataAvailable, consultant, isEditingConsultant, handleIsEditingConsultant, activePartnerData,
  } = useContext(ConsultContext);
  const [partnerEmpty, setPartnerEmpty] = useState(true);
  const [isAddFormActive, setIsAddFormActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (activePartnerData && activePartnerData.partner && activePartnerData.partner.length > 1) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [activePartnerData]);

  useEffect(() => {
    // Cambiar la lógica para usar partnerDataAvailable en lugar de partnersAvailable
    // Agregar verificación de seguridad para evitar errores de undefined
    const partnerDataArray = partnerDataAvailable || [];
    if (partnerDataArray.length < 2) {
      setPartnerEmpty(true);
    } else {
      setPartnerEmpty(false);
    }
  }, [partnerDataAvailable]);

  if (!consultant) return null;

  const handleEditPartner = () => {
    handleIsEditingConsultant(!isEditingConsultant);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="grid mt-8 col-span-12 mb-10 ">
      <div className="bg-black text-white text-base font-bold h-8 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl">
        <div className="flex items-center">
          <div
            className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-red-day p-2"
          >
            <TiPlus className="text-2xl" />
          </div>
          {t('modal.partner.partnerData')}
          <MdEdit className="text-xl text-white" />
        </div>
        <div className="flex items-center gap-2">
          {/* Botón de colapsar/expandir */}
          <button
            type="button"
            onClick={handleToggleCollapse}
            className="flex items-center gap-1 px-3 py-1 bg-main rounded-lg transition-colors duration-200 text-lg"
            title={isCollapsed ? t('show') || undefined : t('hide') || undefined}
          >
            {isCollapsed ? (
              <>
                <MdExpandMore className="text-lg" />
                {t('show')}
              </>
            ) : (
              <>
                <MdExpandLess className="text-lg" />
                {t('hide')}
              </>
            )}
          </button>
        </div>
      </div>
      <div
        className={`pinnacle-wrap px-8 py-8 transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed
            ? 'max-h-0 !py-0 opacity-0'
            : 'max-h-[2000px] opacity-100'
        }`}
      >
        <PartnerFormInLine
          hasPartner={partnerEmpty}
          setIsAddFormActive={setIsAddFormActive}
          handleEditPartner={handleEditPartner}
          isAddFormActive={isAddFormActive}
        />
      </div>
    </div>
  );
}
