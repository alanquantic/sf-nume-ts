declare namespace Api {

  interface Response {
    data: any;
    status: number;
    success?: boolean;
  }

  interface Company {
    direction: string;
    logo: string;
    name: string;
    phone: string;
    website: string;
  }

  interface Consultant {
    id: string;
    notes?: NotesByDate;
    company?: string;
    date?: Date;
    email?: string;
    gender?: string;
    group?: unknown[];
    groupData?: GroupData[];
    lastName?: string;
    createNames?: CreateName[];
    names?: string;
    nationality?: string;
    partner?: Partner[];
    partnerData?: PartnerData[];
    phone?: string;
    scdLastName?: string;
    guestEnergyPartner?: GuestEnergyPartner;
    guestEnergyGroup?: GuestEnergyGroup;
  }
  interface User {
    avatar: string;
    birthDate: Date;
    country: string;
    email: string;
    firstName: string;
    gender: string;
    id: number;
    lastName: string;
    phone: string;
    scdLastName: string;
  }

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

  interface Guest {
    guestEnergyPartner: GuestEnergyPartner;
    guestEnergyGroup: GuestEnergyGroup;
  }

  interface License {
    id: number;
    status: 0 | 1;
    expirationDate: string;
    licenseId: string;
  }

  interface UserResponse {
    app_version: string;
    company: Company;
    consultants: Consultant[];
    guests: Guest;
    license: License;
    token: string;
    user: User;
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
    name:string;
    date: string;
    yearMeet: number;
    partner?: Partner[];
  }

  interface Partner {
    id: string;
    names: string;
    lastName: string;
    scdLastName: string;
    date: string;
  }
  interface GroupData {
    id: string;
    name: string;
    description: string;
    date: string;
    members?: GroupMember[];
    lastInit: number;
  }
  interface GroupMember {
    id: string;
    name: string;
    lastName: string;
    scdLastName: string;
    date: string;
    dateInit: number;
  }
  interface CreateName {
    id: string;
    name: string;
    lastName: string;
    scdLastName: string;
    birthDate: string;
    isPerson: boolean;
  }
  type NotesContentByPath = Record<string, string>; // e.g., { "camino": "...", "nombre": "..." }
  type NotesByDate = Record<string, NotesContentByPath>; // e.g., { "2025-9-15": { ... } }
}
