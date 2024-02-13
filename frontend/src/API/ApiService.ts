import { IOptions } from '@/types/index';

export default class ApiService {
  public async get(url: string) {
    return fetch(`${url}`);
  }

  public async post(url: string, options: IOptions) {
    return fetch(`${url}`, { ...options, method: 'POST' });
  }

  public async delete(url: string) {
    return fetch(`${url}`, { method: 'DELETE' });
  }

  public async patch(url: string, options: IOptions) {
    return fetch(`${url}`, { ...options, method: 'PATCH' });
  }
}
