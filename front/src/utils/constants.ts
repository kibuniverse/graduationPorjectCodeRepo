export enum ResponseStatus {
  success = 1,
  error = 0,
}

export type Response<T> = {
  data: T;
  status: ResponseStatus;
  msg: string;
};
