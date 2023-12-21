import { HttpHeaders } from '@angular/common/http';

export interface HttpBaseDaoOptions {
  withCredentials?: boolean;
  headers?: HttpHeaders;
}

export const DEFAULT_OPTIONS: HttpBaseDaoOptions = {
  withCredentials: true,
};
