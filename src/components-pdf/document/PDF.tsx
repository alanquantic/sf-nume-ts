import {
  Document, Image, Page, Text, View,
} from '@react-pdf/renderer';

import { formatDate } from '@/utils/constants';
import { PDFDocumentProps, PDFPageConfig } from '../../types/pdf.types';
import { configReport } from '../styles';

export default function PDF({
  consultant,
  config,
  profile,
  sidebar,
  synastry,
  groupConsult,
  newDate,
  month,
  logoURL,
  date,
  partnerYear,
  groupYear,
  locale,
}: PDFDocumentProps) {
  if (!consultant || !profile || !Array.isArray(config) || config.length === 0) {
    return null;
  }

  const listOfPDF = config.reduce<PDFPageConfig[]>((pages, configItem) => {
    const pdfConfigItem = configItem as unknown as ((props: unknown) => PDFPageConfig | PDFPageConfig[]);

    if (typeof pdfConfigItem !== 'function') {
      return pages;
    }

    const result = pdfConfigItem({
      consultant,
      newDate,
      synastry,
      groupConsult,
      month,
      date,
      partnerYear,
      groupYear,
    });

    if (Array.isArray(result)) {
      return [...pages, ...result];
    }

    if (result) {
      return [...pages, result];
    }

    return pages;
  }, []);

  return (
    <Document>
      {listOfPDF.map((pageConfig, index) => (
        <Page key={`pdf-page-${index + 1}`} size={[612, 795]} style={configReport.page}>
          {pageConfig.bg && <Image src={pageConfig.bg} style={configReport.pageBackground} />}

          <View style={configReport.header}>
            <View style={configReport.header_consultor_name}>
              <Text>{profile.fullName}</Text>
            </View>
            <View style={configReport.header_consultant_name}>
              <Text>{consultant.fullName}</Text>
            </View>
            <View style={configReport.header_date}>
              <Text>{formatDate({ date: newDate || new Date(), format: 'long', locale })}</Text>
            </View>
            <View style={configReport.header_birth_date}>
              <Text>{consultant.getFormattedBirthDate()}</Text>
            </View>
            <View style={configReport.header_age}>
              <Text>{consultant.getYearsOld()}</Text>
            </View>
            <View style={configReport.header_logo} />
            {logoURL ? <Image style={configReport.img_logo} src={logoURL} /> : null}
          </View>

          <View style={configReport.sidebar}>
            <Text style={configReport.page_number}>{index + 1}</Text>
            <Text style={configReport.page_copy_1}>Copyright 2025, Laura L. Rodríguez. Prohibida su reproducción y distribución.</Text>
            <Text style={configReport.page_copy_2}>
              Este Software esta licenciado para uso exclusivo de:
              {' '}
              {profile.fullName}
              .
            </Text>
            <Text style={configReport.page_copy_3}>{sidebar.webSite}</Text>
            <Text style={configReport.page_copy_4}>{sidebar.email}</Text>
            <Text style={configReport.page_copy_5}>
              Tels:
              {sidebar.phone}
            </Text>
          </View>

          <View style={configReport.content}>
            {pageConfig.children}
          </View>
        </Page>
      ))}
    </Document>
  );
}
