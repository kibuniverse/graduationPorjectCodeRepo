import axios from 'axios';
import { Response } from './constants';

export async function get<T>(url, params = {}) {
  return new Promise<Response<T>>((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function post<T>({ url, data }) {
  return new Promise<Response<T>>((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
