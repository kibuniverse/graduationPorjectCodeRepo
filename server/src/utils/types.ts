export enum ResponseStatus {
  fail = 0,
  Success = 1,
}

export type Response<T> = {
  status: ResponseStatus;
  message: string | null;
  data: T;
};
