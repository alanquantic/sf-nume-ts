/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import cx from 'classnames';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import miniLaura from '@/assets/mini-laura.png';
import AnnualReturnsPDF from '@/components-pdf/document/AnnualReturnsPDF';
import CalendarPDF from '@/components-pdf/document/CalendarPDF';
import CircleTimePDF from '@/components-pdf/document/CircleTimePDF';
import CompatibilityTablePDF from '@/components-pdf/document/CompatibilityTablePDF';
import DestinyPDF from '@/components-pdf/document/DestinyPDF';
import GroupAnnualReturnsPDF from '@/components-pdf/document/GroupAnnualReturnsPDF';
import GroupCalendarMonthPDF from '@/components-pdf/document/GroupCalendarMonthPDF';
import GroupCalendarPDF from '@/components-pdf/document/GroupCalendarPDF';
import GroupCircleTimePDF from '@/components-pdf/document/GroupCircleTimePDF';
import GroupPinnaclePDF from '@/components-pdf/document/GroupPinnaclePDF';
import GroupVibrationTimePDF from '@/components-pdf/document/GroupVibrationTimePDF';
import LifePathPDF from '@/components-pdf/document/LifePathPDF';
import MonthPDF from '@/components-pdf/document/MonthPDF';
import NamePDF from '@/components-pdf/document/NamePDF';
import PDF from '@/components-pdf/document/PDF';
import PinnaclePDF from '@/components-pdf/document/PinnaclePDF';
import SynastryAnnualReturnsPDF from '@/components-pdf/document/SynastryAnnualReturnsPDF';
import SynastryCalendarMonthPDF from '@/components-pdf/document/SynastryCalendarMonthPDF';
import SynastryCalendarPDF from '@/components-pdf/document/SynastryCalendarPDF';
import SynastryCircleTimePDF from '@/components-pdf/document/SynastryCircleTimePDF';
import SynastryDestinyPDF from '@/components-pdf/document/SynastryDestinityPDF';
import SynastryPinnaclePDF from '@/components-pdf/document/SynastryPinnaclePDF';
import SynastryVibrationTimePDF from '@/components-pdf/document/SynastryVibrationTimePDF';
import TimeVibrationPDF from '@/components-pdf/document/TimeVibrationPDF';
import ConsultantAddNoteModal from '@/components/dashboard/consultant/ConsultantAddNoteModal';
import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';
import usePDFErrorHandler from '@/hooks/usePDFErrorHandler';
import Group from '@/resources/Group';
import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import { PDFPageConfig } from '@/types/pdf.types';
import { pdf, PDFViewer } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import FloatingLaura from '../FloatingLaura';
import ConsultationDateModal from '../modal/ConsultationDateModal';
import ModalPDF from '../ModalPDF';
import PDFErrorDisplay from '../PDFErrorDisplay';

function Notifications() {
  return null;
}

function Navbar() {
  const { user: userAuth } = useAuth();
  const { t, i18n } = useTranslation();
  const {
    firstName, lastName, scdLastName, birthDate, email,
  } = userAuth?.user ?? {};
  const { logo, website, phone } = userAuth?.company ?? {};

  /** Variables para Reportes PDF */
  const [modal, setModal] = useState(false);
  const [availableReports, setAvailableReports] = useState<any>({});
  const [availableReportsSelected, setAvailableReportsSelected] = useState<string[]>([]);
  const [previewDocument, setPreviewDocument] = useState(false);
  const [isDownloadPDFEnabled, setIsDownloadPDFEnabled] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);

  // Error handling hook
  const {
    errors,
    warnings,
    addError,
    addWarning,
    clearErrors,
    removeError,
    removeWarning,
    validatePDFData,
  } = usePDFErrorHandler({
    showUserFriendlyMessages: true,
    logToConsole: true,
    retryAttempts: 2,
  });

  const reportList = [
    'pinnacle',
    'life_path',
    'name',
    'destiny_table',
    'time_vibration',
    'annual_returns',
    'time_circle',
    'annual_calendar',
    'monthly_calendar',
    'synastry_pinnacle',
    'synastry_annual_returns',
    'synastry_destiny_table',
    'synastry_compatibility_table',
    'synastry_time_circle',
    'synastry_annual_calendar',
    'synastry_monthly_calendar',
    'synastry_time_vibration',
    'group_pinnacle',
    'group_annual_returns',
    'group_time_circle',
    'group_annual_calendar',
    'group_monthly_calendar',
    'group_vibration_time',
  ];
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const groupPath = location.pathname.split('/')[1];
  const existDownloadPDF = () => reportList.includes(path);
  const isCreateName = path === 'create-name';

  const {
    handleIsEditingConsultant,
    activeConsultant,
    selectedGroup,
    selectedPartnersAsPersons,
    calculationDate,
    consultant,
    consultationDate,
    activePartnerData,
    activeGroup,
    selectedMonthReport,
  } = useConsult();

  useEffect(() => {
    if (groupPath === 'group' && !!activeConsultant) {
      const isEnabled = existDownloadPDF() && (selectedGroup.length > 0 && !!selectedGroup);
      setIsDownloadPDFEnabled(isEnabled);
    } else if (groupPath === 'partner' && !!activeConsultant) {
      const isEnabled = existDownloadPDF() && (selectedPartnersAsPersons.length > 0 && !!selectedPartnersAsPersons);
      setIsDownloadPDFEnabled(isEnabled);
    } else {
      const isEnabled = existDownloadPDF() && (!!activeConsultant);
      setIsDownloadPDFEnabled(isEnabled);
    }
  }, [existDownloadPDF, activeConsultant, selectedGroup, selectedPartnersAsPersons, location]);

  const handlerEdit = () => {
    handleIsEditingConsultant(true);
  };

  const printSingleReportPDF = async () => {
    const reports = {
      pinnacle: PinnaclePDF,
      life_path: LifePathPDF,
      name: NamePDF,
      destiny_table: DestinyPDF,
      time_vibration: TimeVibrationPDF,
      annual_returns: AnnualReturnsPDF,
      time_circle: CircleTimePDF,
      annual_calendar: CalendarPDF,
      monthly_calendar: MonthPDF,
      synastry_pinnacle: SynastryPinnaclePDF,
      synastry_annual_returns: SynastryAnnualReturnsPDF,
      synastry_destiny_table: SynastryDestinyPDF,
      synastry_compatibility_table: CompatibilityTablePDF,
      synastry_time_circle: SynastryCircleTimePDF,
      synastry_annual_calendar: SynastryCalendarPDF,
      synastry_monthly_calendar: SynastryCalendarMonthPDF,
      group_pinnacle: GroupPinnaclePDF,
      group_annual_returns: GroupAnnualReturnsPDF,
      group_time_circle: GroupCircleTimePDF,
      group_annual_calendar: GroupCalendarPDF,
      group_monthly_calendar: GroupCalendarMonthPDF,
      synastry_time_vibration: SynastryVibrationTimePDF,
      group_vibration_time: GroupVibrationTimePDF,
    };
    const config = [Object.entries(reports).filter((i) => i[0] === path)[0][1] as unknown as PDFPageConfig];
    const profile = new Person({
      id: '0',
      name: firstName || '',
      lastName: lastName || '',
      scdLastName: scdLastName || '',
      birthDate: birthDate?.toString() || '',
    });

    const sidebar = { email: email || '', webSite: website || '', phone: phone || '' };
    let synastryObject: Synastry | null = null;
    let groupConsult: Group | null = null;
    if (groupPath === 'partner') {
      synastryObject = new Synastry(selectedPartnersAsPersons[0], selectedPartnersAsPersons[1]);
    }
    if (groupPath === 'group') {
      groupConsult = new Group(selectedGroup, activeGroup?.lastInit ?? 0);
    }
    console.log('selectedMonthReport', selectedMonthReport);

    const blob = await pdf((
      <PDF
        consultant={consultant}
        config={config}
        profile={profile}
        date={calculationDate}
        sidebar={sidebar}
        logoURL={logo}
        groupConsult={groupConsult}
        newDate={consultationDate}
        month={selectedMonthReport}
        synastry={synastryObject}
        partnerYear={activePartnerData?.yearMeet ?? 0}
        groupYear={activeGroup?.lastInit ?? 0}
        locale={t('locale') as string}
      />
    )).toBlob();
    saveAs(blob, `${consultant?.fullName} - ${path}.pdf`);
  };

  const openModal = () => {
    try {
      setModal(true);
      clearErrors(); // Clear any previous errors
      setGenerationError(null);

      let reportListType: any = null;
      const reports: Record<string, any> = {
        personal: {
          pinnacle: { name: t('reports.personal.pinnacle'), fn: PinnaclePDF },
          lifePath: { name: t('reports.personal.lifePath'), fn: LifePathPDF },
          name: { name: t('reports.personal.name'), fn: NamePDF },
          destiny_table: { name: t('reports.personal.destinyTable'), fn: DestinyPDF },
          time_vibration: { name: t('reports.personal.vibrationTime'), fn: TimeVibrationPDF },
          annual_returns: { name: t('reports.personal.annualReturns'), fn: AnnualReturnsPDF },
          time_circle: { name: t('reports.personal.timeCircle'), fn: CircleTimePDF },
          annual_calendar: { name: t('reports.personal.annualCalendar'), fn: CalendarPDF },
          monthly_calendar: { name: t('reports.personal.monthlyCalendar'), fn: MonthPDF },
        },
        partner: {
          synastry_pinnacle: { name: t('reports.partner.synastryPinnacle'), fn: SynastryPinnaclePDF },
          synastry_annual_returns: { name: t('reports.partner.synastryAnnualReturns'), fn: SynastryAnnualReturnsPDF },
          synastry_destiny_table: { name: t('reports.partner.synastryDestinyTable'), fn: SynastryDestinyPDF },
          synastry_compatibility_table: { name: t('reports.partner.synastryCompatibilityTable'), fn: CompatibilityTablePDF },
          synastry_time_circle: { name: t('reports.partner.synastryTimeCircle'), fn: SynastryCircleTimePDF },
          synastry_annual_calendar: { name: t('reports.partner.synastryAnnualCalendar'), fn: SynastryCalendarPDF },
          synastry_monthly_calendar: { name: t('reports.partner.synastryMonthlyCalendar'), fn: SynastryCalendarMonthPDF },
          synastry_time_vibration: { name: t('reports.partner.synastryVibrationTime'), fn: SynastryVibrationTimePDF },
        },
        group: {
          group_pinnacle: { name: t('reports.group.groupPinnacle'), fn: GroupPinnaclePDF },
          group_annual_returns: { name: t('reports.group.groupAnnualReturns'), fn: GroupAnnualReturnsPDF },
          group_time_circle: { name: t('reports.group.groupTimeCircle'), fn: GroupCircleTimePDF },
          group_annual_calendar: { name: t('reports.group.groupAnnualCalendar'), fn: GroupCalendarPDF },
          group_monthly_calendar: { name: t('reports.group.groupMonthlyCalendar'), fn: GroupCalendarMonthPDF },
          group_vibration_time: { name: t('reports.group.groupVibrationTime'), fn: GroupVibrationTimePDF },
        },
      };

      // Find matching report type
      for (const kind of Object.keys(reports)) {
        // eslint-disable-next-line no-prototype-builtins
        if (reports[kind].hasOwnProperty(path)) {
          reportListType = reports[kind];
          break; // Salir del loop una vez encontrado
        }
      }

      if (!reportListType) {
        addError({
          id: 'no_reports_available',
          type: 'validation',
          severity: 'high',
          message: t('reports.errors.noReportsAvailable') as string,
          details: t('reports.errors.noReportsFound', { path }) as string,
          timestamp: new Date(),
          recoverable: false,
          suggestions: ['Verificar la configuración de reportes', 'Contactar al administrador'],
        });
        return;
      }

      setAvailableReports(reportListType);
    } catch (error) {
      console.error('Error opening modal:', error);
      addError({
        id: 'modal_open_error',
        type: 'system',
        severity: 'high',
        message: t('reports.errors.modalOpenError') as string,
        details: error instanceof Error ? error.message : 'Error desconocido',
        timestamp: new Date(),
        recoverable: true,
        suggestions: ['Intentar nuevamente', 'Recargar la página'],
      });
    }
  };

  const closeModal = () => {
    setModal(false);
    setAvailableReportsSelected([]);
    setPreviewDocument(false);
    clearErrors();
    setGenerationError(null);
  };

  const handleModal = () => {
    if (!isDownloadPDFEnabled) {
      return;
    }
    setIsNotesModalOpen(true);
  };

  const handleSelectedReports = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const report = e.target;
      if (report.checked) {
        setAvailableReportsSelected([...availableReportsSelected, report.name]);
      } else {
        setAvailableReportsSelected(availableReportsSelected.filter((r) => r !== report.name));
      }
    } catch (error) {
      console.error('Error handling report selection:', error);
      addError({
        id: 'report_selection_error',
        type: 'system',
        severity: 'medium',
        message: t('reports.errors.reportSelectionError') as string,
        details: error instanceof Error ? error.message : 'Error desconocido',
        timestamp: new Date(),
        recoverable: true,
        suggestions: ['Intentar seleccionar nuevamente', 'Recargar la página'],
      });
    }
  };

  const printButton = () => (
    <button
      type="button"
      className="inline-flex items-center px-6 py-3 bg-main-600 text-white font-semibold rounded-xl shadow-lg bg-main-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      onClick={() => {
        try {
          setPreviewDocument(true);
          clearErrors();
          setGenerationError(null);
        } catch (error) {
          console.error('Error setting preview:', error);
          addError({
            id: 'preview_error',
            type: 'system',
            severity: 'medium',
            message: t('reports.errors.previewError') as string,
            details: error instanceof Error ? error.message : 'Error desconocido',
            timestamp: new Date(),
            recoverable: true,
            suggestions: ['Intentar nuevamente', 'Recargar la página'],
          });
        }
      }}
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Generar Reportes
    </button>
  );

  const printReportPreview = () => {
    try {
      // Validate data before generating PDF
      const pdfData = {
        consultant,
        profile: {
          id: '0',
          name: firstName || '',
          lastName: lastName || '',
          scdLastName: scdLastName || '',
          birthDate: birthDate?.toString() || '',
        },
        config: availableReportsSelected.map((report) => availableReports[report].fn),
        sidebar: { email: '', webSite: '', phone: '' },
        logoURL: '',
        synastry: [],
        groupConsult: [],
        newDate: new Date(),
        month: selectedMonthReport || calculationDate.month,
        createNameObj: activeConsultant?.createNames,
      };

      // Validate PDF data
      const validation = validatePDFData(pdfData, {
        component: 'Navbar',
        stage: 'validation',
      });

      if (!validation.isValid) {
        validation.errors.forEach((error) => addError(error));
        validation.warnings.forEach((warning) => addWarning(warning));

        if (validation.errors.some((e) => e.severity === 'critical')) {
          setGenerationError('No se puede generar el reporte debido a errores críticos');
          return null;
        }
      }

      const config = availableReportsSelected.map((report) => availableReports[report].fn);

      const profile = new Person({
        id: '0',
        name: firstName || '',
        lastName: lastName || '',
        scdLastName: scdLastName || '',
        birthDate: birthDate?.toString() || '',
      });
      let synastryObject: Synastry | null = null;
      let groupConsult: Group | null = null;
      if (groupPath === 'partner') {
        synastryObject = new Synastry(selectedPartnersAsPersons[0], selectedPartnersAsPersons[1]);
      }
      if (groupPath === 'group') {
        groupConsult = new Group(selectedGroup, activeGroup?.lastInit ?? 0);
      }

      const sidebar = { email: email || '', webSite: website || '', phone: phone || '' };

      return (
        <PDFViewer width="100%" height="95%">
          <PDF
            consultant={consultant}
            config={config}
            profile={profile}
            date={calculationDate}
            newDate={consultationDate}
            sidebar={sidebar}
            synastry={synastryObject}
            logoURL={logo}
            groupConsult={groupConsult}
            month={selectedMonthReport || calculationDate.month}
            partnerYear={activePartnerData?.yearMeet ?? 0}
            groupYear={activeGroup?.lastInit ?? 0}
            locale={t('locale') as string}
          />
        </PDFViewer>
      );
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al generar el reporte';

      addError({
        id: 'pdf_generation_error',
        type: 'generation',
        severity: 'high',
        message: t('reports.errors.generateError') as string,
        details: errorMessage,
        component: 'PDF Generation',
        timestamp: new Date(),
        recoverable: true,
        suggestions: [
          'Verificar que todos los datos estén completos',
          'Intentar generar el reporte nuevamente',
          'Contactar al administrador si el problema persiste',
        ],
      });

      setGenerationError(errorMessage);
      return null;
    }
  };

  const handleRetry = () => {
    clearErrors();
    setGenerationError(null);
    setPreviewDocument(false);
    // The user can try again by clicking the generate button
  };

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <nav className="app-navbar">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex">
            <img
              src="/assets/logo.png"
              className="app-logo"
              alt="app-logo"
            />
          </Link>
          <div
            className="main-menu hidden w-full md:block md:w-auto mr-3"
          >
            <ul className="flex flex-col md:flex-row md:space-x-5 md:mt-0 text-xs font-medium h-full">
              <li className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="button-nav-bar"
                  onClick={() => setIsGlossaryModalOpen(true)}
                >
                  <img
                    src={miniLaura}
                    alt="add_user"
                    className="mb-1"
                    width={50}
                    height={50}
                  />
                  {t('modal.glossary.glossary')}
                </button>
              </li>
              <li className="flex items-center justify-center">
                <Link
                  className="button-nav-bar"
                  to="/consultant"
                >
                  <img
                    src="/assets/navbar/add_user.svg"
                    alt="add_user"
                    className="mb-1"
                  />
                  {t('navbar.enterData')}
                </Link>
              </li>
              <li className="flex items-center justify-center">
                <Link
                  className="button-nav-bar"
                  to="/consultant"
                  onClick={handlerEdit}
                >
                  <img
                    src="/assets/navbar/update_user.svg"
                    className="mb-1"
                    alt="update_user"
                  />
                  {t('navbar.updateData')}
                </Link>
              </li>
              <li className="flex items-center justify-center">
                <ConsultationDateModal />
              </li>
              <li className="flex items-center justify-center">
                <Link
                  className="button-nav-bar"
                  to="/partner/synastry_pinnacle"
                >
                  <img
                    src="/assets/navbar/partner_data.svg"
                    className="mb-1"
                    alt="partner_data"
                  />
                  {t('navbar.partnerData')}
                </Link>
              </li>
              <li className="flex items-center justify-center">
                <Link
                  className="button-nav-bar"
                  to="/group/group_pinnacle"
                >
                  <img
                    src="/assets/navbar/group_data.svg"
                    className="mb-1"
                    alt="group_data"
                  />
                  {t('navbar.groupData')}
                </Link>
              </li>
              <li className="flex items-center justify-center">
                <button
                  type="button"
                  className={cx(
                    isDownloadPDFEnabled || isCreateName ? 'button-nav-bar' : 'button-nav-bar--disabled',
                  )}
                  onClick={handleModal}
                >
                  <img
                    src="/assets/navbar/notes.svg"
                    alt="notas"
                  />
                  {t('navbar.notes')}
                </button>
              </li>

              <li className="flex items-center justify-center">
                {isDownloadPDFEnabled
                  ? (
                    <button
                      type="button"
                      onClick={printSingleReportPDF}
                      className="button-nav-bar"
                    >
                      <img
                        src="/assets/navbar/save_report.svg"
                        className="mb-1"
                        alt="save_report"
                      />
                      {t('navbar.saveReport')}
                    </button>
                  )
                  : (
                    <button
                      className="button-nav-bar--disabled"
                      type="button"
                    >
                      <img
                        src="/assets/navbar/save_report.svg"
                        className="mb-1"
                        alt="save_report"
                      />
                      {t('navbar.saveReport')}
                    </button>
                  )}
              </li>
              <li className="flex items-center justify-center">
                {isDownloadPDFEnabled
                  ? (
                    <button
                      type="button"
                      onClick={openModal}
                      className="button-nav-bar"
                    >
                      <img
                        src="/assets/navbar/print_reports.svg"
                        className="mb-1"
                        alt="printReports"
                      />
                      {t('navbar.printReports')}
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      className="flex flex-col justify-center text-center items-center text-white opacity-30 cursor-auto h-full px-3"
                    >
                      <img
                        src="/assets/navbar/print_reports.svg"
                        className="mb-1"
                        alt="printReports"
                      />
                      {t('navbar.printReports')}
                    </button>
                  )}
              </li>
              <li className="flex items-center justify-center ml-20">
                <a className="button-nav-bar" href="https://app.numerologia-cotidiana.com/formulario-de-soporte-arithmax/" target="_blank" rel="noreferrer">
                  <img
                    src="/assets/navbar/mail.svg"
                    alt="email"
                    className="w-6 lg:w-8 mb-1"
                  />
                  {t('navbar.support')}
                </a>
              </li>
              <li className="flex items-center justify-center ml-7">
                <Notifications />
              </li>
              <li className="flex items-center justify-center ml-6">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  title={i18n.language === 'es' ? 'Change to English' : 'Cambiar a Español'}
                >
                  <img
                    src={i18n.language === 'es'
                      ? 'https://www.worldometers.info/img/flags/small/tn_mx-flag.gif'
                      : 'https://www.worldometers.info/img/flags/small/tn_us-flag.gif'}
                    className="w-8"
                    alt={i18n.language === 'es' ? 'Español - México' : 'English - USA'}
                  />
                </button>
              </li>
              <li className="flex items-center justify-center mx-4 text-white">|</li>
              <li className="flex items-center justify-center text-sm text-white max-w-[110px]">
                <p>
                  <Trans
                    i18nKey="navbar.helloMessage"
                    values={{
                      name: `${firstName} ${lastName}`,
                    }}
                  />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ConsultantAddNoteModal isOpen={isNotesModalOpen} setIsOpen={setIsNotesModalOpen} />
      {
      (modal) ? (
        <ModalPDF
          handleCloseModal={closeModal}
          className="w-11/12 h-full absolute top-0 left-0"
        >
          <div className="flex justify-between gap-3 mb-6">
            <h4 className="text-xl font-semibold text-gray-800">
              {!previewDocument
                ? 'Selecciona los reportes que quieres imprimir' : 'Vista Previa del Reporte'}
            </h4>
          </div>

          {/* Error Display */}
          {(errors.length > 0 || warnings.length > 0) && (
            <div className="mb-4">
              <PDFErrorDisplay
                errors={errors}
                warnings={warnings}
                onDismissError={removeError}
                onDismissWarning={removeWarning}
                onRetry={handleRetry}
                className="mb-4"
              />
            </div>
          )}

          {/* Generation Error */}
          {generationError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800 font-medium">Error al generar el reporte:</span>
              </div>
              <p className="text-red-600 mt-1">{generationError}</p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                Intentar nuevamente
              </button>
            </div>
          )}

          {/* Selección de Reportes con Estilos Mejorados */}
          {!previewDocument && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-main-50 to-secondary-50 rounded-xl p-6 border border-main-200">
                <h4 className="text-lg font-semibold text-main-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-main-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Tipos de Reportes Disponibles
                </h4>
                <div className="grid gap-3">
                  {Object.entries(availableReports).map((item: any) => (
                    <div key={`ck_${item[0]}`} className="flex items-center p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-main-300 transition-all duration-200 cursor-pointer group hover:shadow-md">
                      <div className="relative">
                        <input
                          onChange={handleSelectedReports}
                          id={`ck_${item[0]}`}
                          type="checkbox"
                          name={item[0]}
                          className="w-5 h-5 text-main-600 bg-gray-100 border-gray-300 rounded focus:ring-main-500 focus:ring-2 transition-all duration-200"
                        />
                      </div>
                      <label htmlFor={`ck_${item[0]}`} className="ml-4 text-gray-900 font-medium cursor-pointer flex-1 group-hover:text-main-700 transition-colors duration-200">
                        {item[1].name as string}
                      </label>
                      <div className="w-8 h-8 bg-main-100 rounded-full flex items-center justify-center group-hover:bg-main-200 transition-colors duration-200">
                        <svg className="w-4 h-4 text-main-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Botón de Generar Reportes */}
          {(availableReportsSelected.length > 0 && !previewDocument) && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-main-50 to-secondary-50 rounded-xl p-6 border border-main-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-main-800 mb-2">
                      Reportes Seleccionados:
                      {' '}
                      {availableReportsSelected.length}
                    </h4>
                    <p className="text-main-600 text-sm">
                      {availableReportsSelected.length === 1
                        ? '1 reporte seleccionado'
                        : `${availableReportsSelected.length} reportes seleccionados`}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    {printButton()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State - Solo cuando está generando */}
          {previewDocument && !printReportPreview() && (
            <div className="mb-6 text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
                <div className="animate-spin w-12 h-12 border-4 border-main-600 border-t-transparent rounded-full mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Generando Reporte PDF</h4>
                <p className="text-blue-600">Por favor espera mientras se procesa tu solicitud...</p>
              </div>
            </div>
          )}

          {/* Vista Previa del PDF - Solo cuando el reporte esté listo */}
          {previewDocument && printReportPreview() && (
            <div className="h-[calc(95vh-200px)] min-h-[700px] bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
                {printReportPreview()}
              </div>
            </div>
          )}
        </ModalPDF>
      ) : null
    }
      <FloatingLaura
        isOpen={isGlossaryModalOpen}
        onClose={() => setIsGlossaryModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
