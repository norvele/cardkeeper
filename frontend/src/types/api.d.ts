export interface IOptions {
  headers: {
    'Content-Type': string;
  };
  body: string;
}

export interface IApiService {
  get: (_url: string) => Promise<Response>;
  post: (_url: string, _options: IOptions) => Promise<Response>;
  delete: (_url: string) => Promise<Response>;
  patch: (_url: string, _options: IOptions) => Promise<Response>;
}
