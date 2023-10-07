import { HttpHeaders } from '@angular/common/http';

export interface HttpBaseDaoV2Options {
  httpWithCredentials?: boolean;
  headers?: HttpHeaders;
}

export const DEFAULT_OPTIONS: HttpBaseDaoV2Options = {
  httpWithCredentials: true,
};
