import { AxiosError } from 'axios';
import { isBefore } from 'date-fns';
import toast from 'react-hot-toast';
import { initReactQueryAuth } from 'react-query-auth';

import axios from '@/api/axios';
import LoaderComponent from '@/components/LoaderComponent';
import { normalizeDateOnlyValue } from '@/utils/constants';
import storage from '@/utils/storage';

interface ApiErrorResponse {
  success: boolean;
  data: {
    msg: string;
  };
}

type LoginCredentialsDTO = {
  username: string;
  password: string;
};

const EMPTY_LICENSE: Api.License = {
  id: 0,
  userId: 0,
  status: 'inactive',
  expirationDate: null,
  licenseId: null,
};

const EMPTY_COMPANY: Api.Company = {
  direction: null,
  logo: null,
  name: null,
  phone: null,
  website: null,
};

const ERROR_MESSAGES: Record<string, string> = {
  MEMBERSHIP_REQUIRED_OR_INACTIVE: 'Este usuario no tiene membresia activa. Por favor, active su membresia para continuar.',
  MEMBERSHIP_EXPIRED: 'Su membresia ha expirado. Por favor, renueve su membresia para acceder al sistema.',
  INVALID_CREDENTIALS: 'Las credenciales ingresadas son incorrectas. Por favor, verifique su usuario y contrasena.',
};

type BackendMeLicense = {
  id?: number | null;
  userId?: number | null;
  status?: string | number | null;
  expirationDate?: string | null;
  licenseId?: string | null;
  planId?: string | null;
};

type BackendMeUser = Api.AuthUser & {
  license?: BackendMeLicense | null;
};

function handleAuthError(error: unknown): void {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  if (axiosError.response?.data?.data?.msg) {
    const errorCode = axiosError.response.data.data.msg;
    const errorMessage = ERROR_MESSAGES[errorCode] || 'Ha ocurrido un error durante el inicio de sesion. Por favor, intente nuevamente.';

    toast.error(errorMessage, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#EF4444',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
        maxWidth: '500px',
      },
    });
  } else if (axiosError.message === 'Network Error') {
    toast.error('No se pudo conectar con el servidor. Por favor, verifique su conexion a internet.', {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#EF4444',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
        maxWidth: '500px',
      },
    });
  } else {
    toast.error('Ha ocurrido un error inesperado. Por favor, intente nuevamente mas tarde.', {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#EF4444',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
        maxWidth: '500px',
      },
    });
  }
}

function mapAuthSession(session: Api.AuthSession): Api.FrontendSession {
  return {
    user: {
      ...session.user,
      birthDate: normalizeDateOnlyValue(session.user.birthDate),
    },
    company: {
      name: session.user.companyName,
      direction: session.user.companyDirection,
      phone: session.user.companyPhone,
      website: session.user.companyWebsite,
      logo: session.user.companyLogo,
    },
    license: session.license || EMPTY_LICENSE,
    app_version: session.app_version,
  };
}

function normalizeLicense(license?: BackendMeLicense | null): Api.License {
  if (!license) {
    return EMPTY_LICENSE;
  }

  let normalizedStatus: string;
  if (typeof license.status === 'number') {
    normalizedStatus = license.status === 1 ? 'active' : 'inactive';
  } else {
    normalizedStatus = license.status || 'inactive';
  }

  return {
    id: license.id || 0,
    userId: license.userId || 0,
    status: normalizedStatus as Api.LicenseStatus,
    expirationDate: license.expirationDate || null,
    licenseId: license.licenseId || license.planId || null,
  };
}

function mapMeResponse(response: Api.MeResponse | Api.AuthUser): Api.FrontendSession {
  if ('user' in response) {
    return mapAuthSession(response);
  }

  const backendUser = response as BackendMeUser;

  return mapAuthSession({
    user: backendUser,
    license: normalizeLicense(backendUser.license),
    app_version: null,
  });
}

function isLicenseExpired(license: Api.License | null | undefined): boolean {
  if (!license || !license.expirationDate) {
    return false;
  }

  return license.status === 'expired' || isBefore(new Date(license.expirationDate), new Date());
}

async function handleLoginResponse(response: Api.LoginResponse) {
  storage.setToken(response.token);
  return mapAuthSession(response);
}

const getUser = (): Promise<Api.MeResponse | Api.AuthUser> => axios.get('/auth/me');

const loginWithUsernameAndPassword = (data: LoginCredentialsDTO): Promise<Api.LoginResponse> => axios.post('/auth/login', data);

async function loadUser() {
  if (!storage.getToken()) {
    return null as unknown as Api.FrontendSession;
  }

  const data = await getUser();
  const session = mapMeResponse(data);

  if (isLicenseExpired(session.license)) {
    storage.clearToken();
    window.location.assign(window.location.origin as unknown as string);
    return null;
  }

  return {
    ...session,
    company: session.company || EMPTY_COMPANY,
    license: session.license || EMPTY_LICENSE,
  };
}

async function loginFn(data: LoginCredentialsDTO) {
  try {
    const response = await loginWithUsernameAndPassword(data);
    const session = await handleLoginResponse(response);

    if (isLicenseExpired(session.license)) {
      storage.clearToken();
      toast.error(ERROR_MESSAGES.MEMBERSHIP_EXPIRED, {
        duration: 5000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          maxWidth: '500px',
        },
      });
      window.location.assign(window.location.origin as unknown as string);
      return null as unknown as Api.FrontendSession;
    }

    toast.success('Inicio de sesion exitoso. Bienvenido al sistema.', {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    });

    return session;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
}

async function registerFn(data: LoginCredentialsDTO) {
  const response = await loginWithUsernameAndPassword(data);
  const session = await handleLoginResponse(response);
  return session;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return <LoaderComponent />;
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<Api.FrontendSession | null, unknown, LoginCredentialsDTO>(authConfig);
