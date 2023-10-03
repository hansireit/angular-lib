import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Dao } from './dao';
import { IIdentifiable } from './interfaces/i-identifiable';
import { inject } from '@angular/core';

export abstract class NoConversionHttpBaseDao<TI extends IIdentifiable> implements Dao<TI> {
  protected readonly routeUrl: string;
  protected readonly http = inject(HttpClient);
  protected readonly httpWithCredentials;

  protected constructor(routeUrl: string, httpWithCredentials = true) {
    this.routeUrl = routeUrl;
    this.httpWithCredentials = httpWithCredentials;
  }

  async list(withCredentials = this.httpWithCredentials, headers?: HttpHeaders): Promise<TI[]> {
    const result$ = this.http.get<TI[]>(this.routeUrl, {
      withCredentials: withCredentials,
      headers: headers,
    });
    return await firstValueFrom(result$);
  }

  async create(entry: TI, withCredentials = this.httpWithCredentials, headers?: HttpHeaders): Promise<TI> {
    if (!entry) {
      throw new Error('Entry must exist to be created');
    }

    const result$ = this.http.post<TI>(this.routeUrl, entry, {
      withCredentials: withCredentials,
      headers: headers,
    });

    return await firstValueFrom(result$);
  }

  async update(entry: TI, withCredentials = this.httpWithCredentials, headers?: HttpHeaders): Promise<TI> {
    if (!entry) {
      throw new Error('Entry must exist to be updated');
    }

    const result$ = this.http.put<TI>(this.routeUrl + '/' + entry.id, entry, {
      withCredentials: withCredentials,
      headers: headers,
    });

    return await firstValueFrom(result$);
  }

  async delete(entry: TI, withCredentials = this.httpWithCredentials, headers?: HttpHeaders): Promise<void> {
    if (!entry) {
      throw new Error('Entry must exist to be deleted');
    }

    const result$ = this.http.delete<TI>(this.routeUrl + '/' + entry.id, {
      withCredentials: withCredentials,
      headers: headers,
    });
    await firstValueFrom(result$);
  }

  async read(id: string, withCredentials = this.httpWithCredentials, headers?: HttpHeaders): Promise<TI> {
    const result$ = this.http.get<TI>(this.routeUrl + '/' + id, {
      withCredentials: withCredentials,
      headers: headers,
    });
    return await firstValueFrom(result$);
  }
}
