import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { DEFAULT_OPTIONS, HttpBaseDaoOptions } from '../http-base-dao-options';
import { DaoId } from '../dao-id';

export abstract class InternalHttpBaseDao<TI> {
  protected readonly http = inject(HttpClient);
  protected readonly options: HttpBaseDaoOptions;
  protected readonly routeUrl: string;

  protected constructor(routeUrl: string, options: HttpBaseDaoOptions = {}) {
    this.routeUrl = routeUrl;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
  }

  protected listInternal(customOptions: HttpBaseDaoOptions = {}): Observable<TI[]> {
    return this.http.get<TI[]>(this.routeUrl, this.mergeCustomOptions(customOptions));
  }

  protected createInternal(data: object, customOptions: HttpBaseDaoOptions = {}): Observable<TI> {
    if (!data) {
      throw new Error('Entry must exist to be created');
    }

    return this.http.post<TI>(this.routeUrl, data, this.mergeCustomOptions(customOptions));
  }

  protected updateInternal(id: DaoId, data: object, customOptions: HttpBaseDaoOptions = {}): Observable<TI> {
    if (!id) {
      throw new Error('Entry must exist to be updated');
    }

    return this.http.put<TI>(this.routeUrl + '/' + id, data, this.mergeCustomOptions(customOptions));
  }

  protected deleteInternal(id: DaoId, customOptions: HttpBaseDaoOptions = {}): Observable<TI> {
    if (!id) {
      throw new Error('Entry must exist to be deleted');
    }
    return this.http.delete<TI>(this.routeUrl + '/' + id, this.mergeCustomOptions(customOptions));
  }

  protected readInternal(id: DaoId, customOptions: HttpBaseDaoOptions = {}): Observable<TI> {
    return this.http.get<TI>(this.routeUrl + '/' + id, this.mergeCustomOptions(customOptions));
  }

  private mergeCustomOptions(customOptions: HttpBaseDaoOptions): HttpBaseDaoOptions {
    return {
      ...this.options,
      ...customOptions
    };
  }
}
