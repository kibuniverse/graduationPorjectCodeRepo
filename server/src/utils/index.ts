import { ResponseStatus, Response } from './types';

export function genResponse<T>({
  status,
  message,
  data = {} as T,
}: Response<T>): Response<T> {
  return { status, message, data };
}

export function genSuccess<T>({
  message = '',
  data = {} as T,
}: {
  message?: string | undefined;
  data?: T | undefined;
}): Response<T> {
  return genResponse({ status: ResponseStatus.Success, message, data });
}
