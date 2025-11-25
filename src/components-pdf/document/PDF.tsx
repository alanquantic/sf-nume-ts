/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  Document, Image, Page, Text, View,
} from '@react-pdf/renderer';
import { useMemo } from 'react';

import { formatDate } from '@/utils/constants';
import { PDFDocumentProps, PDFError } from '../../types/pdf.types';
import PDFErrorFallback from '../PDFErrorFallback';
import { configReport } from '../styles';

export default function PDF({
  consultant, config, profile, sidebar, synastry, groupConsult, newDate, month, logoURL, date, partnerYear, groupYear, locale,
}: PDFDocumentProps) {
  // Validate required props
  const validationErrors = useMemo(() => {
    const errors: PDFError[] = [];

    if (!consultant) {
      errors.push({
        id: 'missing_consultant',
        type: 'validation',
        severity: 'critical',
        message: 'Consultor no encontrado',
        details: 'El objeto consultant es requerido para generar el reporte',
        timestamp: new Date(),
        recoverable: false,
        suggestions: ['Verificar que el consultor esté seleccionado', 'Revisar la configuración del usuario'],
      });
    }

    if (!profile) {
      errors.push({
        id: 'missing_profile',
        type: 'validation',
        severity: 'critical',
        message: 'Perfil no encontrado',
        details: 'El objeto profile es requerido para generar el reporte',
        timestamp: new Date(),
        recoverable: false,
        suggestions: ['Verificar que el perfil esté configurado', 'Revisar la información del usuario'],
      });
    }

    if (!config || !Array.isArray(config) || config.length === 0) {
      errors.push({
        id: 'invalid_config',
        type: 'validation',
        severity: 'critical',
        message: 'Configuración de reporte inválida',
        details: 'La configuración del reporte debe ser un array no vacío',
        timestamp: new Date(),
        recoverable: false,
        suggestions: ['Verificar la configuración del reporte', 'Seleccionar al menos un tipo de reporte'],
      });
    }

    return errors;
  }, [consultant, profile, config]);

  // If there are critical validation errors, show error page
  if (validationErrors.some((error) => error.severity === 'critical')) {
    return (
      <Document>
        <Page size={[612, 795]} style={configReport.page}>
          <View style={configReport.content}>
            {validationErrors.map((error) => (
              <PDFErrorFallback
                key={error.id}
                error={error}
                consultant={consultant}
                fallbackMessage="No se puede generar el reporte PDF debido a errores de validación"
              />
            ))}
          </View>
        </Page>
      </Document>
    );
  }

  // Process configuration and generate PDF components with enhanced error handling
  const listOfPDF = useMemo(
    () => config
      .map((configItem: any, index) => {
        try {
          // Handle single component
          if (!Array.isArray(configItem)) {
            const result = configItem({
              consultant,
              newDate,
              config,
              synastry,
              groupConsult,
              month,
              date,
              partnerYear,
              groupYear,
            });

            // Validate component result
            if (!result || typeof result !== 'object') {
              throw new Error(`Componente en índice ${index} retornó un resultado inválido`);
            }

            return result;
          }

          // Handle array of components
          return configItem.map((component: any, componentIndex: number) => {
            try {
              const result = component({
                consultant,
                newDate,
                config,
                synastry,
                groupConsult,
                month,
                date,
                partnerYear,
                groupYear,
              });

              // Validate component result
              if (!result || typeof result !== 'object') {
                throw new Error(`Componente ${componentIndex} en array ${index} retornó un resultado inválido`);
              }

              return result;
            } catch (componentError) {
              console.error(`Error processing component ${componentIndex} in array ${index}:`, componentError);

              // Return error fallback component
              const error: PDFError = {
                id: `component_error_${index}_${componentIndex}`,
                type: 'component',
                severity: 'high',
                message: 'Error en componente del reporte',
                details: componentError instanceof Error ? componentError.message : 'Error desconocido',
                component: `Array ${index}, Componente ${componentIndex}`,
                timestamp: new Date(),
                recoverable: true,
                suggestions: [
                  'Verificar los datos del consultor',
                  'Revisar la configuración del reporte',
                  'Intentar generar el reporte nuevamente',
                ],
              };

              return {
                bg: undefined,
                children: (
                  <PDFErrorFallback
                    error={error}
                    consultant={consultant}
                    fallbackMessage="No se pudo generar este componente del reporte"
                  />
                ),
              };
            }
          });
        } catch (error) {
          console.error(`Error processing config item at index ${index}:`, error);

          // Return error fallback component
          const pdfError: PDFError = {
            id: `config_error_${index}`,
            type: 'generation',
            severity: 'high',
            message: 'Error al procesar configuración del reporte',
            details: error instanceof Error ? error.message : 'Error desconocido',
            component: `Configuración ${index}`,
            timestamp: new Date(),
            recoverable: true,
            suggestions: [
              'Verificar la configuración del reporte',
              'Revisar que todos los componentes estén disponibles',
              'Intentar generar el reporte nuevamente',
            ],
          };

          return {
            bg: undefined,
            children: (
              <PDFErrorFallback
                error={pdfError}
                consultant={consultant}
                fallbackMessage="No se pudo procesar esta configuración del reporte"
              />
            ),
          };
        }
      })
      .flat()
      .filter(Boolean), // Remove any null/undefined results
    [config, consultant, newDate, synastry, groupConsult, month, partnerYear, groupYear],
  );

  // If no valid components were generated, show error
  if (listOfPDF.length === 0) {
    const noComponentsError: PDFError = {
      id: 'no_components',
      type: 'generation',
      severity: 'critical',
      message: 'No se pudieron generar componentes del reporte',
      details: 'No se generó ningún componente válido para el reporte',
      timestamp: new Date(),
      recoverable: false,
      suggestions: [
        'Verificar la configuración del reporte',
        'Revisar que el consultor tenga datos válidos',
        'Contactar al administrador del sistema',
      ],
    };

    return (
      <Document>
        <Page size={[612, 795]} style={configReport.page}>
          <View style={configReport.content}>
            <PDFErrorFallback
              error={noComponentsError}
              consultant={consultant}
              fallbackMessage="No se pudo generar ningún componente del reporte"
            />
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      {listOfPDF.map((e, i) => (
        <Page key={e.toString()} size={[612, 795]} style={configReport.page}>
          {e.bg && <Image src={e.bg} style={configReport.pageBackground} />}

          <View style={configReport.header}>
            <View style={configReport.header_consultor_name}>
              <Text>{profile?.fullName || 'N/A'}</Text>
            </View>
            <View style={configReport.header_consultant_name}>
              <Text>{consultant?.fullName || 'N/A'}</Text>
            </View>
            <View style={configReport.header_date}>
              <Text>{formatDate({ date: newDate || new Date(), format: 'long', locale }) || 'N/A'}</Text>
            </View>
            <View style={configReport.header_birth_date}>
              <Text>{consultant?.getFormattedBirthDate?.() || 'N/A'}</Text>
            </View>
            <View style={configReport.header_age}>
              <Text>{consultant?.getYearsOld?.() || 'N/A'}</Text>
            </View>
            <View style={configReport.header_logo} />
            {logoURL && <Image style={configReport.img_logo} src={logoURL} />}
          </View>

          <View style={configReport.sidebar}>
            <Text style={configReport.page_number}>{i + 1}</Text>
            <Text style={configReport.page_copy_1}>Copyright 2025, Laura L. Rodríguez. Prohibida su reproducción y distribución.</Text>
            <Text style={configReport.page_copy_2}>
              Este Software esta licenciado para uso exclusivo de:
              {profile?.fullName || 'Usuario'}
              .
            </Text>
            <Text style={configReport.page_copy_3}>{sidebar?.webSite || 'N/A'}</Text>
            <Text style={configReport.page_copy_4}>{sidebar?.email || 'N/A'}</Text>
            <Text style={configReport.page_copy_5}>
              Tels:
              {sidebar?.phone || 'N/A'}
            </Text>
          </View>

          <View style={configReport.content}>
            {e.children}
          </View>
        </Page>
      ))}
    </Document>
  );
}
