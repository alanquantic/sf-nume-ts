import { AxiosError } from 'axios';

import axios from './axios';

type MessageResponse = { message: string };

type BackendErrorResponse = {
  error?: { message?: string };
};

export const requestPasswordReset = (email: string): Promise<MessageResponse> => axios.post('/auth/forgot-password', { email });

export const resetPassword = (token: string, password: string): Promise<MessageResponse> => axios.post('/auth/reset-password', { token, password });

export function getApiErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<BackendErrorResponse>;
  return axiosError.response?.data?.error?.message || fallback;
}
