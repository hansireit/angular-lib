import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { DEFAULT_OPTIONS, HttpBaseDaoV2Options } from '../http-base-dao-v2-options';
import { DaoId } from '../dao-id';

export abstract class InternalHttpBaseDaoV2<TI> {
  protected readonly http = inject(HttpClient);
  protected readonly options: HttpBaseDaoV2Options;
  protected readonly routeUrl: string;

  protected constructor(routeUrl: string, options: HttpBaseDaoV2Options = {}) {
    this.routeUrl = routeUrl;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
  }

  protected listInternal(customOptions: HttpBaseDaoV2Options = {}): Observable<TI[]> {
    return this.http.get<TI[]>(this.routeUrl, this.mergeCustomOptions(customOptions));
  }

  protected createInternal(data: object, customOptions: HttpBaseDaoV2Options = {}): Observable<TI> {
    if (!data) {
      throw new Error('Entry must exist to be created');
    }

    return this.http.post<TI>(this.routeUrl, data, this.mergeCustomOptions(customOptions));
  }

  protected updateInternal(id: DaoId, data: object, customOptions: HttpBaseDaoV2Options = {}): Observable<TI> {
    if (!id) {
      throw new Error('Entry must exist to be updated');
    }

    return this.http.put<TI>(this.routeUrl + '/' + id, data, this.mergeCustomOptions(customOptions));
  }

  protected deleteInternal(id: DaoId, customOptions: HttpBaseDaoV2Options = {}): Observable<TI> {
    if (!id) {
      throw new Error('Entry must exist to be deleted');
    }
    return this.http.delete<TI>(this.routeUrl + '/' + id, this.mergeCustomOptions(customOptions));
  }

  protected readInternal(id: DaoId, customOptions: HttpBaseDaoV2Options = {}): Observable<TI> {
    return this.http.get<TI>(this.routeUrl + '/' + id, this.mergeCustomOptions(customOptions));
  }

  private mergeCustomOptions(customOptions: HttpBaseDaoV2Options): HttpBaseDaoV2Options {
    return {
      ...this.options,
      ...customOptions
    };
  }
}
