import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { initReactQueryAuth } from 'react-query-auth';

import axios from '@/api/axios';
import LoaderComponent from '@/components/LoaderComponent';
import storage from '@/utils/storage';
import { isBefore } from 'date-fns';

interface ApiErrorResponse {
  success: boolean;
  data: {
    msg: string;
  };
}

const ERROR_MESSAGES: Record<string, string> = {
  MEMBERSHIP_REQUIRED_OR_INACTIVE: 'Este usuario no tiene membresía activa. Por favor, active su membresía para continuar.',
  MEMBERSHIP_EXPIRED: 'Su membresía ha expirado. Por favor, renueve su membresía para acceder al sistema.',
  INVALID_CREDENTIALS: 'Las credenciales ingresadas son incorrectas. Por favor, verifique su usuario y contraseña.',
};

function handleAuthError(error: unknown): void {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  if (axiosError.response?.data?.data?.msg) {
    const errorCode = axiosError.response.data.data.msg;
    const errorMessage = ERROR_MESSAGES[errorCode] || 'Ha ocurrido un error durante el inicio de sesión. Por favor, intente nuevamente.';

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
    toast.error('No se pudo conectar con el servidor. Por favor, verifique su conexión a internet.', {
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
    toast.error('Ha ocurrido un error inesperado. Por favor, intente nuevamente más tarde.', {
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

async function handleUserResponse(response: Api.UserResponse) {
  storage.setToken(response.token);
  return response;
}

const getUser = (): Promise<Api.UserResponse> => axios.post('/wp-json/app/v3/auth/me');

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    const isExpired = isBefore(data.license.expirationDate, new Date());
    if ((data.license.status as unknown as string) === 'expired' || isExpired) {
      storage.clearToken();
      window.location.assign(window.location.origin as unknown as string);
      return null;
    }
    return data;
  }
  return null as unknown as Api.UserResponse;
}

type LoginCredentialsDTO = {
  username: string;
  password: string;
};

const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<Api.UserResponse> => axios.post('/wp-json/app/v3/auth/login', data);

async function loginFn(data: LoginCredentialsDTO) {
  try {
    const response = await loginWithEmailAndPassword(data);
    const user = await handleUserResponse(response);

    toast.success('Inicio de sesión exitoso. Bienvenido al sistema.', {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    });

    return user;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
}

async function registerFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
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

export const { AuthProvider, useAuth } = initReactQueryAuth<Api.UserResponse | null, unknown, LoginCredentialsDTO>(authConfig);
