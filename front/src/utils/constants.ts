export enum ResponseStatus {
  success = 1,
  error = 0,
}

export type Response<T> = {
  data: T;
  status: ResponseStatus;
  msg: string;
};

export const SDKAPPID = 1400667282;

export const SECRETKEY = '29cc5d85084d738b37faac08adafe84a4cecf71f766d58e1d9cd4d5f1bedb5b9';
