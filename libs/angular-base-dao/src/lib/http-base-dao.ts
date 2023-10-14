import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Dao } from './dao';
import { IConverter } from './interfaces/i-converter';
import { IIdentifiable } from './interfaces/i-identifiable';

/**
 * Please use ConvertedPromiseHttpBaseDaoV2 instead
 * @deprecated
 */
export abstract class HttpBaseDao<TI, TM extends IIdentifiable> implements Dao<TM> {
  protected readonly routeUrl: string;
  protected readonly http: HttpClient;
  protected readonly httpWithCredentials;
  protected readonly converter: IConverter<TI, TM>;

  protected constructor(routeUrl: string, http: HttpClient, converter: IConverter<TI, TM>, httpWithCredentials = true) {
    this.routeUrl = routeUrl;
    this.http = http;
    this.converter = converter;
    this.httpWithCredentials = httpWithCredentials;
  }

  async list(withCredentials = this.httpWithCredentials, headers?: HttpHeaders): Promise<TM[]> {
    const result$ = this.http.get<TI[]>(this.routeUrl, {
      withCredentials: withCredentials,
      headers: headers,
    });
    const result = await firstValueFrom(result$);

    return result.map((modelInterface) => this.createModel(modelInterface));
  }

  async create(entry: TM, withCredentials = this.httpWithCredentials, headers?: HttpHeaders): Promise<TM> {
    if (!entry) {
      throw new Error('Entry must exist to be created');
    }

    const data = this.converter.toJson(entry);

    const result$ = this.http.post<TI>(this.routeUrl, data, {
      withCredentials: withCredentials,
      headers: headers,
    });

    const result = await firstValueFrom(result$);

    return this.createModel(result);
  }

  async update(entry: TM, withCredentials = this.httpWithCredentials, headers?: HttpHeaders): Promise<TM> {
    if (!entry) {
      throw new Error('Entry must exist to be updated');
    }

    const data = this.converter.toJson(entry);

    const result$ = this.http.put<TI>(this.routeUrl + '/' + entry.id, data, {
      withCredentials: withCredentials,
      headers: headers,
    });

    const result = await firstValueFrom(result$);

    return this.createModel(result);
  }

  async delete(entry: TM, withCredentials = this.httpWithCredentials, headers?: HttpHeaders): Promise<void> {
    if (!entry) {
      throw new Error('Entry must exist to be deleted');
    }

    const result$ = this.http.delete<TI>(this.routeUrl + '/' + entry.id, {
      withCredentials: withCredentials,
      headers: headers,
    });
    await firstValueFrom(result$);
  }

  async read(id: string, withCredentials = this.httpWithCredentials, headers?: HttpHeaders): Promise<TM> {
    const result$ = this.http.get<TI>(this.routeUrl + '/' + id, {
      withCredentials: withCredentials,
      headers: headers,
    });
    const result = await firstValueFrom(result$);

    return this.createModel(result);
  }

  protected createModel(propertyData: TI): TM {
    return this.converter.fromJson(propertyData);
  }
}
