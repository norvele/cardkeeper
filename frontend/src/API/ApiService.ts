export default class ApiService {
  static async fetching(
    url: string,
    options: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: string },
  ) {
    const response = fetch(`${url}`, options);
    return response;
  }
}
