import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IIdentifiable } from './interfaces/i-identifiable';
import { inject } from '@angular/core';
import { ConverterV2 } from './interfaces/converter-v2';
import { DEFAULT_OPTIONS, HttpBaseDaoV2Options } from './http-base-dao-v2-options';

export abstract class HttpBaseDaoV2<TI, TM extends IIdentifiable> {
  protected readonly http = inject(HttpClient);
  protected readonly converter: ConverterV2<TI, TM> = inject(ConverterV2<TI, TM>);
  private readonly options: HttpBaseDaoV2Options;
  private readonly routeUrl: string;

  protected constructor(routeUrl: string, options: HttpBaseDaoV2Options = {}) {
    this.routeUrl = routeUrl;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  async list(customOptions: HttpBaseDaoV2Options = {}): Promise<TM[]> {
    const optionsToUse = {
      ...this.options,
      ...customOptions,
    };

    const result$ = this.http.get<TI[]>(this.routeUrl, optionsToUse);
    const result = await firstValueFrom(result$);

    return result.map((modelInterface) => this.createModel(modelInterface));
  }

  async create(entry: TM, customOptions: HttpBaseDaoV2Options = {}): Promise<TM> {
    if (!entry) {
      throw new Error('Entry must exist to be created');
    }

    const data = this.converter.toJson(entry);
    const optionsToUse = {
      ...this.options,
      ...customOptions,
    };

    const result$ = this.http.post<TI>(this.routeUrl, data, optionsToUse);

    const result = await firstValueFrom(result$);

    return this.createModel(result);
  }

  async update(id: string | number, entry: Partial<TM>, customOptions: HttpBaseDaoV2Options = {}): Promise<TM> {
    if (!entry) {
      throw new Error('Entry must exist to be updated');
    }

    const data = this.converter.toJson(entry);
    const optionsToUse = {
      ...this.options,
      ...customOptions,
    };
    const result$ = this.http.put<TI>(this.routeUrl + '/' + id, data, optionsToUse);

    const result = await firstValueFrom(result$);

    return this.createModel(result);
  }

  async delete(id: string | number, customOptions: HttpBaseDaoV2Options = {}): Promise<TM> {
    if (!id) {
      throw new Error('Entry must exist to be deleted');
    }
    const optionsToUse = {
      ...this.options,
      ...customOptions,
    };
    const result$ = this.http.delete<TI>(this.routeUrl + '/' + id, optionsToUse);
    const result = await firstValueFrom(result$);
    return this.createModel(result);
  }

  async read(id: string, customOptions: HttpBaseDaoV2Options = {}): Promise<TM> {
    const optionsToUse = {
      ...this.options,
      ...customOptions,
    };
    const result$ = this.http.get<TI>(this.routeUrl + '/' + id, optionsToUse);
    const result = await firstValueFrom(result$);

    return this.createModel(result);
  }

  protected createModel(propertyData: TI): TM {
    return this.converter.fromJson(propertyData);
  }
}
