import { client } from '../lib/http-client';

import { SERVICE_BASEURL } from './config';

export const register = (data: any) => {
  return client.post(`${SERVICE_BASEURL}/register`, data);
}

export const list = () => {
  return client.get(`${SERVICE_BASEURL}/list`);
}

export const remove = (id: string | number) => {
  return client.del(`${SERVICE_BASEURL}/remove?id=${id}`);
}

export const info = (id: string | number) => {
  return client.get(`${SERVICE_BASEURL}/info?id=${id}`);
};
