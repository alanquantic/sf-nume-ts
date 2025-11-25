import { DocumentConfig, PDFAssets } from '../../types/pdf.types';

// PDF Configuration
export const PDF_CONFIG = {
  // Page settings
  page: {
    size: [612, 795] as [number, number], // A4 size in points
    margins: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  },

  // Font settings
  fonts: {
    primary: 'Open Sans',
    sizes: {
      small: 6,
      normal: 8,
      medium: 10,
      large: 12,
      xlarge: 14,
      title: 16,
    },
  },

  // Colors
  colors: {
    primary: '#000000',
    secondary: '#666666',
    accent: '#ff0000',
    background: '#ffffff',
    sidebar: '#f0f0f0',
  },

  // Layout settings
  layout: {
    header: {
      height: 88,
      width: 795,
    },
    sidebar: {
      width: 50,
    },
    content: {
      padding: '100px 20px 20px 20px',
      minHeight: 700,
    },
  },

  // Copyright and branding
  branding: {
    copyright: 'Copyright 2022, Laura L. Rodríguez. Prohibida su reproducción y distribución.',
    license: 'Este Software esta licenciado para uso exclusivo de:',
  },
} as const;

// Asset configuration
export const PDF_ASSETS: PDFAssets = {
  backgrounds: {
    pinnacle: './assets/pinnacle.jpg',
    annualReturns: './assets/annual-returns.jpg',
    lifePath: './assets/life-path.jpg',
    calendar: './assets/calendar.jpg',
    circleTime: './assets/circle-time.jpg',
    destinityTable: './assets/destinity-table.jpg',
    compatibilityTable: './assets/compatibility.jpg',
    createName: './assets/create-name.jpg',
    timeVibration: './assets/time-vibration.jpg',
    // Synastry backgrounds
    synastryPinnacle: './assets/s-pinnacle.jpg',
    synastryAnnualReturns: './assets/s-annual-returns.jpg',
    synastryDestinityTable: './assets/s-destinity-table.jpg',
    synastryCompatibility: './assets/s-compatibility.jpg',
    synastryTimeVibration: './assets/s-time-vibration.jpg',
    // Group backgrounds
    groupPinnacle: './assets/g-pinnacle.jpg',
    groupAnnualReturns: './assets/g-annual-returns.jpg',
    groupTimeVibration: './assets/g-time-vibration.jpg',
  },
  icons: {
    bridge: './assets/bridge.png',
    timeCurve: './assets/time-curve.svg',
    pinnacle: './assets/pinnacle.svg',
  },
  fonts: {
    openSans: '../assets/fonts/OpenSans/OpenSans-Regular.ttf',
    openSansBold: '../assets/fonts/OpenSans/OpenSans-Bold.ttf',
    openSansItalic: '../assets/fonts/OpenSans/OpenSans-Italic.ttf',
    openSansBoldItalic: '../assets/fonts/OpenSans/OpenSans-BoldItalic.ttf',
  },
};

// Document type configurations
export const DOCUMENT_CONFIGS: Record<string, DocumentConfig> = {
  personal: {
    type: 'personal',
    components: [],
    background: PDF_ASSETS.backgrounds.pinnacle,
  },
  synastry: {
    type: 'synastry',
    components: [],
    background: PDF_ASSETS.backgrounds.synastryPinnacle,
  },
  group: {
    type: 'group',
    components: [],
    background: PDF_ASSETS.backgrounds.groupPinnacle,
  },
  createName: {
    type: 'createName',
    components: [],
    background: PDF_ASSETS.backgrounds.createName,
  },
};

// Utility functions
export const PDF_UTILS = {
  // Format date for PDF
  formatDate: (date: any): string => {
    if (!date) return '';
    return date.format('DD/MM/YYYY');
  },

  // Calculate age
  calculateAge: (birthDate: any, currentDate: any): number => {
    if (!birthDate || !currentDate) return 0;
    return currentDate.diff(birthDate, 'year');
  },

  // Validate PDF data
  validatePDFData: (data: any): boolean => data && typeof data === 'object' && Object.keys(data).length > 0,

  // Generate unique ID for PDF elements
  generateId: (): string => `pdf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,

  // Check if component should be rendered
  shouldRender: (condition: boolean, fallback?: any): any => (condition ? true : fallback || false),
};

// Export all configurations
export default {
  PDF_CONFIG,
  PDF_ASSETS,
  DOCUMENT_CONFIGS,
  PDF_UTILS,
};
