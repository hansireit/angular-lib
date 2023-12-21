import { map, Observable } from 'rxjs';
import { HttpBaseDaoOptions } from './http-base-dao-options';
import { DaoId } from './dao-id';
import { InternalHttpBaseDao } from './internal/internal-http-base-dao';
import { Converter } from './converter';

export abstract class ConvertedHttpBaseDao<TI, TM> extends InternalHttpBaseDao<TI> {
  protected readonly converter: Converter<TI, TM>;
  protected constructor(routeUrl: string, converter: Converter<TI, TM>, options: HttpBaseDaoOptions = {}) {
    super(routeUrl, options);
    this.converter = converter;
  }

  list(customOptions: HttpBaseDaoOptions = {}): Observable<TM[]> {
    return this.listInternal(customOptions).pipe(this.mapServerInterfaceListToModelList);
  }

  create(entry: TM, customOptions: HttpBaseDaoOptions = {}): Observable<TM> {
    const createData = this.converter.toJson(entry);
    return this.createInternal(createData, customOptions).pipe(this.mapServerInterfaceToModel);
  }

  update(id: DaoId, entry: Partial<TM>, customOptions: HttpBaseDaoOptions = {}): Observable<TM> {
    const updateData = this.converter.toJson(entry);
    return this.updateInternal(id, updateData, customOptions).pipe(this.mapServerInterfaceToModel);
  }

  delete(id: DaoId, customOptions: HttpBaseDaoOptions = {}): Observable<TM> {
    return this.deleteInternal(id, customOptions).pipe(this.mapServerInterfaceToModel);
  }

  read(id: DaoId, customOptions: HttpBaseDaoOptions = {}): Observable<TM> {
    return this.readInternal(id, customOptions).pipe(this.mapServerInterfaceToModel);
  }

  private mapServerInterfaceListToModelList(source$: Observable<TI[]>): Observable<TM[]> {
    return source$.pipe(
      map((list) => {
        if (!list?.length) {
          return [];
        }

        return list.map((elem) => this.converter.fromJson(elem));
      }),
    );
  }

  private mapServerInterfaceToModel(source$: Observable<TI>): Observable<TM> {
    return source$.pipe(map((element) => this.converter.fromJson(element)));
  }
}
