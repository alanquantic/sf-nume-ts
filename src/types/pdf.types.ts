import Group from '@/resources/Group';
import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import { ReactElement } from 'react';
// import { Group, Person, Synastry } from '../resources';

type Opts = {
  day: number;
  month: number;
  year: number;
};

// PDF Component Props
export interface PDFComponentProps {
  consultant: Person; // Person
  newDate?: any; // dayjs object
  synastry?: Synastry; // Synastry
  groupConsult?: any; // Group
  month?: number;
  createNameObj?: any;
}

// PDF Page Configuration
export interface PDFPageConfig {
  bg?: string;
  children: ReactElement | ReactElement[];
}

// PDF Document Props
export interface PDFDocumentProps {
  consultant: Person | null; // Person
  config: PDFPageConfig[];
  profile: Person; // Person
  date: Opts; // dayjs object
  sidebar: {
    email: string;
    webSite: string;
    phone: string;
  };
  synastry?: Synastry | null; // Synastry
  groupConsult?: Group | null; // Group
  newDate?: Date; // dayjs object
  month?: number;
  logoURL?: string;
  partnerYear: number;
  groupYear: number;
  locale?: string;
}

// Annual Return Types
export interface AnnualReturnData {
  yearToCalculate: number;
  age: number;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  G: number;
  H: number;
}

// Pinnacle Types
export interface PinnacleData {
  stage: number;
  startAge: number;
  endAge: number;
  pinnacleNumber: number;
  challengeNumber: number;
}

// Life Path Types
export interface LifePathData {
  lifePathNumber: number;
  personalYear: number;
  personalMonth: number;
  personalWeek: number;
  personalDay: number;
}

// Name Analysis Types
export interface NameAnalysisData {
  name: string;
  numericValue: number;
  frequency: number;
  potential: number;
  balance: number;
  inhabitants: number;
}

// Vibration Time Types
export interface VibrationTimeData {
  cycle: number;
  quarter: number;
  year: number;
  month: number;
  energy: number;
}

// Synastry Types
export interface SynastryData {
  compatibility: number;
  harmony: number;
  challenge: number;
  potential: number;
}

// Group Types
export interface GroupData {
  members: any[]; // Person[]
  groupNumber: number;
  collectiveEnergy: number;
}

// Calendar Types
export interface CalendarData {
  year: number;
  month: number;
  days: number[];
  events: CalendarEvent[];
}

export interface CalendarEvent {
  date: string;
  description: string;
  type: 'personal' | 'universal' | 'special';
}

// Create Name Types
export interface CreateNameData {
  originalName: string;
  suggestedNames: string[];
  analysis: NameAnalysisData[];
}

// Document Configuration Types
export type PDFConfigFunction = (props: PDFComponentProps) => PDFPageConfig | PDFPageConfig[];

export interface DocumentConfig {
  type: 'personal' | 'synastry' | 'group' | 'createName';
  components: PDFConfigFunction[];
  background?: string;
}

// Style Types
export interface PDFStyles {
  page: any;
  pageBackground: any;
  header: any;
  content: any;
  sidebar: any;
  [key: string]: any;
}

// Asset Types
export interface PDFAssets {
  backgrounds: Record<string, string>;
  icons: Record<string, string>;
  fonts: Record<string, string>;
}

// Error Types for PDF Generation
export interface PDFError {
  id: string;
  type: 'validation' | 'generation' | 'component' | 'resource' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details?: string;
  component?: string;
  timestamp: Date;
  recoverable: boolean;
  suggestions?: string[];
}

export interface PDFErrorContext {
  consultant?: any;
  config?: any;
  profile?: any;
  component?: string;
  stage?: 'validation' | 'generation' | 'rendering' | 'finalization';
}

export interface PDFValidationResult {
  isValid: boolean;
  errors: PDFError[];
  warnings: PDFError[];
}

export interface PDFGenerationResult {
  success: boolean;
  document?: any;
  errors: PDFError[];
  warnings: PDFError[];
  generationTime: number;
  pagesGenerated: number;
}

// Error Handler Types
export interface ErrorHandlerConfig {
  showUserFriendlyMessages: boolean;
  logToConsole: boolean;
  logToServer: boolean;
  retryAttempts: number;
  fallbackComponents: Record<string, any>;
}

// Export all types
