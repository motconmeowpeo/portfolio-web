import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCode } from './http.enum';

export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IHttpErrorResponse extends HttpErrorResponse {
  error: {
    path: string;
    status: HttpStatusCode;
    code?: string;
    message: string;
  };
}

export interface HttpOptions {
  headers: any;
  params: any;
  observe: any;
  responseType: any;
  reportProgress: boolean;
  withCredentials: boolean;
  isRawUrl?: boolean;
}

export interface HttpRequestOptions extends HttpOptions {
  body: any;
}
