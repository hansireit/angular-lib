import { HttpHeaders } from '@angular/common/http';

export interface HttpBaseDaoV2Options {
  withCredentials?: boolean;
  headers?: HttpHeaders;
}

export const DEFAULT_OPTIONS: HttpBaseDaoV2Options = {
  withCredentials: true,
};
