declare namespace Api {

  interface Response {
    data: any;
    status: number;
    success?: boolean;
  }

  type LicenseStatus = 'active' | 'inactive' | 'expired';

  interface Company {
    direction: string | null;
    logo: string | null;
    name: string | null;
    phone: string | null;
    website: string | null;
  }

  interface AuthUser {
    avatar: string | null;
    birthDate: string | null;
    country: string | null;
    email: string | null; // Technical identifier; do not assume it is a real email.
    firstName: string | null;
    gender: string | null;
    id: number;
    lastName: string | null;
    phone: string | null;
    scdLastName: string | null;
    companyName: string | null;
    companyDirection: string | null;
    companyPhone: string | null;
    companyWebsite: string | null;
    companyLogo: string | null;
    devices: string | null;
    createdAt: string;
    updatedAt: string;
  }

  interface License {
    id: number;
    userId: number,
    status: LicenseStatus;
    expirationDate: string | null;
    licenseId: string | null;
  }

  interface AuthSession {
    user: AuthUser;
    license: License;
    app_version: string | null;
  }

  interface LoginResponse extends AuthSession {
    token: string;
  }

  interface MeResponse extends AuthSession {}

  interface Consultant {
    id: string;
    userId?: number;
    notes?: NotesByDate | Note[];
    company?: string | null;
    date?: string | null;
    email?: string | null;
    gender?: string | null;
    group?: unknown[] | unknown | null;
    groupData?: GroupData[];
    lastName?: string | null;
    createNames?: CreateName[];
    names?: string | null;
    nationality?: string | null;
    // Legacy field kept temporarily for migration compatibility.
    partner?: Partner[];
    partnerData?: PartnerData[];
    phone?: string | null;
    scdLastName?: string | null;
  }

  // Legacy UI shape used by the current guest-energy screens.
  interface GuestEnergyPartner {
    name: string;
    guestPartner: Partner[];
    guestMeetYear: number;
  }

  interface GuestEnergyGroup {
    name: string;
    guestGroup: GroupMember[];
    guestYearGroup: number;
  }

  interface GuestSession {
    guestEnergyPartner: GuestEnergyPartner;
    guestEnergyGroup: GuestEnergyGroup;
  }

  interface GuestRecord {
    id: number;
    userId: number;
    partnerName: string | null;
    partnerMeetYear: number | null;
    groupName: string | null;
    groupYear: number | null;
  }

  interface GuestPartnerRecord {
    id: string;
    guestId: number;
    names: string | null;
    lastName: string | null;
    scdLastName: string | null;
    date: string | null;
  }

  interface GuestGroupMemberRecord {
    id: string;
    guestId: number;
    name: string | null;
    lastName: string | null;
    scdLastName: string | null;
    date: string | null;
    dateInit: number | null;
  }

  interface GuestEnergy {
    guest: GuestRecord;
    guestPartners: GuestPartnerRecord[];
    guestGroupMembers: GuestGroupMemberRecord[];
  }

  interface FrontendSession {
    app_version: string | null;
    company: Company;
    license: License;
    user: AuthUser;
  }

  interface ProfileUser {
    names?: string;
    lastName?: string;
    scdLastName?: string;
    address?: string;
    tel?: string;
    date?: string;
    company?: string;
    logoURL?: string;
    phone?: string;
    webSite?: string;
  }
  interface PartnerData {
    id: string;
    consultantId?: string;
    name: string | null;
    date: string | null;
    yearMeet: number | null;
    partner?: Partner[];
  }

  interface Partner {
    id: string;
    partnerDataId?: string;
    names: string | null;
    lastName: string | null;
    scdLastName: string | null;
    date: string | null;
  }
  interface GroupData {
    id: string;
    consultantId?: string;
    name: string | null;
    description: string | null;
    date: string | null;
    members?: GroupMember[];
    lastInit: number | null;
  }
  interface GroupMember {
    id: string;
    groupDataId?: string;
    name: string | null;
    lastName: string | null;
    scdLastName: string | null;
    date: string | null;
    dateInit: number | null;
  }
  interface CreateName {
    id: string;
    consultantId?: string;
    name: string | null;
    lastName: string | null;
    scdLastName: string | null;
    birthDate: string | null;
    isPerson: boolean | null;
  }

  interface Note {
    id: number;
    consultantId: string;
    dateKey: string;
    pathKey: string;
    value: string | null;
  }

  type NotesContentByPath = Record<string, string>; // e.g., { "camino": "...", "nombre": "..." }
  type NotesByDate = Record<string, NotesContentByPath>; // e.g., { "2025-9-15": { ... } }
}
