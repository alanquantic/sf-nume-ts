/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';

import NoConsultantSelected from '@/components/NoConsultantSelected';

import makeConsultant from '@/api/useConsultant';
import CreateNamePDF from '@/components-pdf/document/CreateNamePDF';
import PDF from '@/components-pdf/document/PDF';
import SectionTitle from '@/components/SectionTitle';
import CreateNameBreakDown from '@/components/personal/createName/CreateNameBreakDonwn';
import DestinyTableCreateName from '@/components/personal/createName/DestinyTableCreateName';
import InclusionTable from '@/components/personal/createName/InclusionTable';
import NameBreak from '@/components/personal/createName/NameBreak';
import NumericValues from '@/components/personal/createName/NumericValues';
import PinnacleCreateName from '@/components/personal/createName/PinnacleCreateName';
import AnnualReturn from '@/components/personal/vibrationTime/AnnualReturn';
import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import Person, { AnnualReturn as AnnualReturnPerson } from '@/resources/Person';
import { PDFPageConfig } from '@/types/pdf.types';
import { pdf } from '@react-pdf/renderer';
import { format, parse } from 'date-fns';
import { saveAs } from 'file-saver';

function CreateNamePage() {
  const { t } = useTranslation();
  const { user: userAuth } = useAuth();
  const {
    consultant, activeConsultant, calculationDate, selectActiveConsultant, consultationDate,
  } = useConsult();
  const {
    firstName, lastName, scdLastName, birthDate,
  } = userAuth?.user ?? {};
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();

  // Estados para los inputs (no se actualizan automáticamente)
  const [inputName, setInputName] = useState<string>('');
  const [inputDate, setInputDate] = useState<string>(new Date().toLocaleDateString('es-ES'));
  const [isPerson, setIsPerson] = useState<boolean>(true);
  const [inputLastName, setInputLastName] = useState<string>('');
  const [inputScdLastName, setInputScdLastName] = useState<string>('');

  // Estados para los cálculos (se actualizan solo al hacer clic en "Calcular")
  const [hasCalculated, setHasCalculated] = useState(false);

  // Estados para nombres guardados
  const [selectedSavedName, setSelectedSavedName] = useState<string>('');
  const [checkN, setcheckN] = useState(false);
  const [checkP, setcheckP] = useState(false);
  const [checkBreakdown, setcheckBreakdown] = useState(false);

  // Estado Person
  const [createNameObj, setCreateNameObj] = useState<Person>(new Person({
    id: '',
    name: '',
    lastName: '',
    scdLastName: '',
    birthDate: new Date().toLocaleDateString('es-ES'),
  }));
  const annualReturnDefault = {
    yearToCalculate: 0,
    age: 0,
    A: '',
    B: '',
    C: '',
    D: '',
    E: '',
    F: '',
    G: '',
    H: '',
  };
  const [annualReturnPastYear, setAnnualReturnPastYear] = useState<AnnualReturnPerson>(annualReturnDefault);
  const [annualReturnCurrent, setAnnualReturnCurrent] = useState<AnnualReturnPerson>(annualReturnDefault);
  const [annualReturnNextYear, setAnnualReturnNextYear] = useState<AnnualReturnPerson>(annualReturnDefault);

  // Limpiar variables de cálculo cuando cambia el consultor
  useEffect(() => {
    if (activeConsultant?.id) {
      setHasCalculated(false);
      setSelectedSavedName('');
      setcheckN(false);
      setcheckP(false);
      // Limpiar también los campos de entrada
      setInputName('');
      setInputLastName('');
      setInputScdLastName('');
      setInputDate(new Date().toLocaleDateString('es-ES'));
      setIsPerson(true);
    }
  }, [activeConsultant?.id]);

  if (!consultant) return (<NoConsultantSelected />);

  const createNames: Api.CreateName[] = activeConsultant?.createNames || [];

  const checkName = () => {
    setcheckN(!checkN);
  };
  const checkPinacle = () => {
    setcheckP(!checkP);
  };

  const isValid = () => {
    const valid = /^[a-zA-Z ñÑ]+$/;
    if (inputName === '' || !valid.test(inputName)) return false;
    if (!inputDate) return false;
    if ((inputLastName === '' && isPerson) || (isPerson && !valid.test(inputLastName))) return false;
    if ((inputScdLastName === '' && isPerson) || (isPerson && !valid.test(inputScdLastName))) return false;
    return true;
  };

  // Solo mostrar error de validación si el usuario ha intentado calcular o si hay datos inválidos
  if ((!isValid() && hasCalculated)) {
    return (
      <div className="col-span-12 text-center font-bold">{t('createName.invalidData')}</div>
    );
  }
  // Función para manejar cambios en inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, checked,
    } = e.target;
    if (name === 'name') {
      setInputName(value);
    } else if (name === 'lastName') {
      setInputLastName(value);
    } else if (name === 'scdLastName') {
      setInputScdLastName(value);
    } else if (name === 'date') {
      // Crear fecha sin problemas de zona horaria
      setInputDate(value);
    } else if (name === 'isPerson') {
      setIsPerson(checked);
    }
    // Resetear cálculos cuando se cambian los inputs
    setHasCalculated(false);
  };

  // Función para calcular
  const handleCalculate = () => {
    if (!isValid()) {
      return;
    }
    setCreateNameObj(new Person({
      id: consultant.id,
      name: inputName,
      lastName: isPerson ? inputLastName : '',
      scdLastName: isPerson ? inputScdLastName : '',
      birthDate: format(parse(inputDate, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
    }));
    setHasCalculated(true);
    setAnnualReturnPastYear(createNameObj?.annualReturn({ ...calculationDate, year: calculationDate.year - 1 }) || null);
    setAnnualReturnCurrent(createNameObj?.annualReturn({ ...calculationDate, year: calculationDate.year }) || null);
    setAnnualReturnNextYear(createNameObj?.annualReturn({ ...calculationDate, year: calculationDate.year + 1 }) || null);
  };

  // Función para guardar
  const handleSave = async () => {
    try {
      if (!activeConsultant || !isValid()) {
        return;
      }

      // Crear el nuevo nombre a guardar
      const newCreateName: Api.CreateName = {
        id: `createName_${Date.now()}`, // Generar ID único
        name: inputName,
        lastName: inputLastName,
        scdLastName: inputScdLastName,
        birthDate: inputDate, // Usar función segura
        isPerson,
      };

      // Actualizar el consultor con el nuevo nombre
      const updatedConsultant: Api.Consultant = {
        ...activeConsultant,
        createNames: [...(activeConsultant.createNames || []), newCreateName],
      };

      // Actualizar la lista de consultores
      const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);

      // Guardar en el servidor
      await addConsultantAsync.mutateAsync(consultantsList);

      // Actualizar el contexto para reflejar los cambios inmediatamente
      selectActiveConsultant(updatedConsultant);

      // Mostrar mensaje de éxito con SweetAlert
      Swal.fire({
        title: t('createName.savedTitle') as string,
        text: t('createName.savedText') as string,
        icon: 'success',
        confirmButtonText: t('createName.acceptButton') as string,
      });
    } catch (error) {
      console.error('Error al guardar el nombre:', error);
      Swal.fire({
        title: t('createName.errorTitle') as string,
        text: t('createName.errorSaveText') as string,
        icon: 'error',
        confirmButtonText: t('createName.acceptButton') as string,
      });
    }
  };

  // Función para manejar selección de nombre guardado
  const handleSavedNameSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedSavedName(selectedId);

    if (selectedId) {
      const savedName = createNames.find((name: Api.CreateName) => name.id === selectedId);
      if (savedName) {
        // Si es una persona, separar el nombre completo en sus partes
        if (savedName.isPerson) {
          // Si ya tiene lastName y scdLastName separados, usarlos
          if (savedName.lastName && savedName.scdLastName) {
            setInputName(savedName.name);
            setInputLastName(savedName.lastName);
            setInputScdLastName(savedName.scdLastName);
          } else {
            // Si no, intentar separar el nombre completo
            const nameParts = savedName.name.trim().split(' ');
            if (nameParts.length >= 3) {
              // Asumir que el primer elemento es el nombre, los dos últimos son apellidos
              setInputName(nameParts[0]);
              setInputLastName(nameParts[nameParts.length - 2]);
              setInputScdLastName(nameParts[nameParts.length - 1]);
            } else if (nameParts.length === 2) {
              // Solo nombre y un apellido
              setInputName(nameParts[0]);
              setInputLastName(nameParts[1]);
              setInputScdLastName('');
            } else {
              // Solo nombre
              setInputName(savedName.name);
              setInputLastName('');
              setInputScdLastName('');
            }
          }
        } else {
          // Si no es persona, usar el nombre completo como está
          setInputName(savedName.name);
          setInputLastName('');
          setInputScdLastName('');
        }

        // Crear fecha sin problemas de zona horaria
        setInputDate(savedName.birthDate);
        setIsPerson(savedName.isPerson ?? true); // Usar true como valor por defecto si no existe
        setHasCalculated(false); // Resetear cálculos para que el usuario haga clic en "Calcular"
      }
    }
  };

  // Función para eliminar nombre guardado
  const handleDeleteSavedName = async (id: string) => {
    try {
      if (!activeConsultant) {
        Swal.fire({
          title: t('createName.errorTitle') as string,
          text: t('createName.noConsultantError') as string,
          icon: 'error',
          confirmButtonText: t('createName.acceptButton') as string,
        });
        return;
      }

      // Buscar el nombre a eliminar
      const nameToDelete = createNames.find((name: Api.CreateName) => name.id === id);
      if (!nameToDelete) {
        Swal.fire({
          title: t('createName.errorTitle') as string,
          text: t('createName.nameNotFoundError') as string,
          icon: 'error',
          confirmButtonText: t('createName.acceptButton') as string,
        });
        return;
      }

      // Confirmar eliminación con SweetAlert
      const result = await Swal.fire({
        title: t('createName.deleteConfirmTitle') as string,
        text: t('createName.deleteConfirmText', { name: nameToDelete.name }) as string,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#ff0000',
        confirmButtonText: t('createName.deleteConfirmButton') as string,
        cancelButtonText: t('createName.cancelButton') as string,
      });

      if (result.isConfirmed) {
        // Actualizar el consultor removiendo el nombre
        const updatedConsultant: Api.Consultant = {
          ...activeConsultant,
          createNames: activeConsultant.createNames?.filter((name: Api.CreateName) => name.id !== id) || [],
        };

        // Actualizar la lista de consultores
        const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);

        // Guardar en el servidor
        await addConsultantAsync.mutateAsync(consultantsList);

        // Actualizar el contexto para reflejar los cambios inmediatamente
        selectActiveConsultant(updatedConsultant);

        // Limpiar selección
        setSelectedSavedName('');

        Swal.fire({
          title: t('createName.deletedTitle') as string,
          text: t('createName.deletedText') as string,
          icon: 'success',
          confirmButtonText: t('createName.acceptButton') as string,
        });
      }
    } catch (error) {
      console.error('Error al eliminar el nombre:', error);
      Swal.fire({
        title: t('createName.errorTitle') as string,
        text: t('createName.errorDeleteText') as string,
        icon: 'error',
        confirmButtonText: t('createName.acceptButton') as string,
      });
    }
  };

  const handleGeneratePDF = async () => {
    const config = [CreateNamePDF as unknown as PDFPageConfig];
    const profile = new Person({
      id: '0',
      name: firstName || '',
      lastName: lastName || '',
      scdLastName: scdLastName || '',
      birthDate: birthDate?.toString() || '',
    });
    const sidebar = { email: '', webSite: '', phone: '' };
    const logoURL = '';
    const blob = await pdf((
      <PDF
        consultant={createNameObj}
        config={config}
        profile={profile}
        date={calculationDate}
        newDate={consultationDate}
        month={calculationDate.month}
        synastry={null}
        groupConsult={null}
        sidebar={sidebar}
        logoURL={logoURL}
        groupYear={0}
        partnerYear={0}
      />
    )).toBlob();
    saveAs(blob, `${consultant?.fullName} - CreateName.pdf`);
  };
  return (
    <div className="page-content bg-cover pb-10">
      <div className="grid grid-cols-12 mt-8 gap-6 pt-10">
        <div className="col-span-12 mb-5">
          <SectionTitle title={t('createName.title')} />
          <div className="pinnacle-wrap px-8 py-8">
            {/* Selector de nombres guardados */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800">
                  {t('createName.savedNames')}
                </h3>
                {createNames.length > 0 && (
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {createNames.length === 1 ? t('createName.savedNamesCount', { count: createNames.length }) : t('createName.savedNamesCount_plural', { count: createNames.length })}
                  </span>
                )}
              </div>

              {createNames.length > 0 ? (
                <div className="space-y-3">
                  <div className="relative">
                    <select
                      value={selectedSavedName}
                      onChange={handleSavedNameSelect}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      <option value="" className="text-gray-500">
                        {t('createName.selectSavedName')}
                      </option>
                      {createNames.map((savedName: Api.CreateName) => (
                        <option key={savedName.id} value={savedName.id} className="py-2">
                          {savedName.isPerson
                            ? `${savedName.name} ${savedName.lastName} ${savedName.scdLastName}`.trim()
                            : savedName.name}
                          {' '}
                          •
                          {' '}
                          {(() => {
                            const [year, month, day] = savedName.birthDate.split('-').map(Number);
                            const date = new Date(year, month - 1, day);
                            return date.toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            });
                          })()}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {selectedSavedName && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedName(selectedSavedName)}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {t('createName.deleteName')}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSavedName('');
                          setHasCalculated(false);
                        }}
                        className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {t('createName.clearSelection')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-gray-600 font-medium">{t('createName.noSavedNames')}</p>
                  <p className="text-gray-500 text-sm mt-1">{t('createName.noSavedNamesMessage')}</p>
                </div>
              )}
            </div>

            <div className="form-container block">
              <div className="flex w-full gap-4">
                <div className="form-group w-2/3">
                  <p className="font-bold mb-1 ">
                    <MdEdit className="text-xl" />
                    {' '}
                    {t('createName.name')}
                  </p>
                  <input
                    id="nameCreateName"
                    type="text"
                    name="name"
                    value={inputName}
                    onChange={handleInputChange}
                    className="rounded"
                    placeholder="No uses acentos o caracteres especiales"
                  />
                </div>
                <div className="form-group w-1/3">
                  <p className="font-bold mb-1">
                    <MdEdit className="text-xl" />
                    {' '}
                    {t('createName.birthDate')}
                    :
                  </p>
                  <input
                    id="dateCreateName"
                    type="date"
                    name="date"
                    value={inputDate}
                    onChange={handleInputChange}
                    className="rounded"
                    required
                  />
                </div>
              </div>

              {/* Inputs adicionales para apellidos cuando es persona */}
              {isPerson && (
                <div className="flex w-full gap-4 mt-4">
                  <div className="form-group w-1/2">
                    <p className="font-bold mb-1">
                      <MdEdit className="text-xl" />
                      {' '}
                      {t('createName.paternalSurname')}
                    </p>
                    <input
                      id="lastNameCreateName"
                      type="text"
                      name="lastName"
                      value={inputLastName}
                      onChange={handleInputChange}
                      className="rounded"
                      required
                      placeholder="No uses acentos o caracteres especiales"
                    />
                  </div>
                  <div className="form-group w-1/2">
                    <p className="font-bold mb-1">
                      <MdEdit className="text-xl" />
                      {' '}
                      {t('createName.maternalSurname')}
                    </p>
                    <input
                      id="scdLastNameCreateName"
                      type="text"
                      name="scdLastName"
                      value={inputScdLastName}
                      onChange={handleInputChange}
                      className="rounded"
                      required
                      placeholder="No uses acentos o caracteres especiales"
                    />
                  </div>
                </div>
              )}

              {/* Radio buttons para seleccionar tipo de entidad */}
              <div className="mt-4 flex w-full">
                <div className="flex space-x-6">
                  <label htmlFor="isPerson-radio" className="flex items-center space-x-3 cursor-pointer">
                    <input
                      id="isPerson-radio"
                      type="radio"
                      name="entityType"
                      value="person"
                      checked={isPerson}
                      onChange={() => {
                        setIsPerson(true);
                        setHasCalculated(false);
                      }}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-700 font-medium">
                      👤
                      {' '}
                      {t('createName.person')}
                    </span>
                  </label>

                  <label htmlFor="isCompany-radio" className="flex items-center space-x-3 cursor-pointer">
                    <input
                      id="isCompany-radio"
                      type="radio"
                      name="entityType"
                      value="company"
                      checked={!isPerson}
                      onChange={() => {
                        setIsPerson(false);
                        setHasCalculated(false);
                      }}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-700 font-medium">
                      🏢
                      {' '}
                      {t('createName.company')}
                    </span>
                  </label>
                  <label htmlFor="isRealiceName-radio" className="flex items-center space-x-3 cursor-pointer">
                    <input
                      id="isRealiceName-radio"
                      type="radio"
                      name="entityType"
                      value="realiceName"
                      checked={!isPerson}
                      onChange={() => {
                        setIsPerson(false);
                        setHasCalculated(false);
                      }}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-700 font-medium">
                      👤
                      {' '}
                      {t('createName.productionName')}
                    </span>
                  </label>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={!isValid()}
                  className={`btn-save ${!isValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {t('createName.calculate')}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!isValid() || !hasCalculated}
                  className={`btn-save !bg-main-50 ${(!isValid() || !hasCalculated) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {t('createName.save')}
                </button>
                <button
                  type="button"
                  className={`btn-save !bg-[#5DC4FE] ${(!isValid() || !hasCalculated) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleGeneratePDF}
                  disabled={!isValid() || !hasCalculated}
                >
                  {t('createName.generatePDF')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {hasCalculated && (
          <>
            <div className="col-span-8 mb-5">
              <SectionTitle
                title={t('createName.numericValues')}
                button={{
                  handle: checkName,
                  isActive: checkN,
                  text: t('createName.verification'),
                }}
              />
              <NumericValues createNameObj={createNameObj} checkN={checkN} />
            </div>

            <div className="col-span-4 row-span-2 mb-5">
              <SectionTitle
                title={t('createName.pinnacle')}
                button={{
                  handle: checkPinacle,
                  isActive: checkP,
                  text: t('createName.verification'),
                }}
              />
              <div className="pinnacle-wrap px-8 py-3">
                <PinnacleCreateName isVerificationActive={checkP} size="sm" consultant={createNameObj || null} />
              </div>
            </div>

            <div className="col-span-8 mb-5">
              <SectionTitle title={t('createName.inclusionTable')} />
              <InclusionTable createNameObj={createNameObj} />
            </div>

            <div className="col-span-12 mb-5">
              <SectionTitle title={t('createName.annualReturns')} />
              <div className="pinnacle-wrap overflow-hidden grid grid-cols-3">
                <div className="px-5 py-8">
                  <AnnualReturn annualReturn={annualReturnPastYear} size="xs" />
                </div>
                <div className="px-5 py-8 border-b border-solid border-gray-300 bg-active-radial bg-opacity-15">
                  <AnnualReturn annualReturn={annualReturnCurrent} current months size="xs" />
                </div>
                <div className="px-5 py-8 border-r border-gray-400">
                  <AnnualReturn annualReturn={annualReturnNextYear} size="xs" />
                </div>
              </div>
            </div>

            <div className="col-span-12 mb-5">
              <SectionTitle
                title={t('createName.breakdown')}
                button={{
                  handle: () => setcheckBreakdown(!checkBreakdown),
                  isActive: checkBreakdown,
                  text: t('createName.verification'),
                }}
              />
              {(isPerson) ? (
                <CreateNameBreakDown consultant={createNameObj} checkBreakdown={checkBreakdown} />
              ) : (
                <NameBreak createNameObj={createNameObj} checkBreakdown={checkBreakdown} />
              )}
            </div>

            <div className="col-span-12 mb-5">
              <SectionTitle title={t('createName.nameCycle')} />
              <DestinyTableCreateName createNameObj={createNameObj} calculationDate={calculationDate} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateNamePage;
