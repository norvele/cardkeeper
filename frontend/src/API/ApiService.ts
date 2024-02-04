export default class ApiService {
  public async get(url: string) {
    return fetch(`${url}`);
  }

  public async post(
    url: string,
    options: {
      headers: {
        'Content-Type': string;
      };
      body: string;
    },
  ) {
    return fetch(`${url}`, { ...options, method: 'POST' });
  }

  public async delete(url: string) {
    return fetch(`${url}`, { method: 'DELETE' });
  }

  public async patch(
    url: string,
    options: {
      headers: {
        'Content-Type': string;
      };
      body: string;
    },
  ) {
    return fetch(`${url}`, { ...options, method: 'PATCH' });
  }
}
