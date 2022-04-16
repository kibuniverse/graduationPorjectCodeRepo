export const successResponse = (data: any, msg = '', status = 1) => ({
  data,
  msg,
  status,
});

export const failResponse = (data: any = null, msg = '', status = 0) => ({
  data,
  msg,
  status,
});
