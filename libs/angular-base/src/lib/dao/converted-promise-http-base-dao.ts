import { firstValueFrom, map, Observable } from 'rxjs';
import { HttpBaseDaoOptions } from './http-base-dao-options';
import { DaoId } from './dao-id';
import { InternalHttpBaseDao } from './internal/internal-http-base-dao';
import { Converter } from './converter';

export abstract class ConvertedPromiseHttpBaseDao<TI, TM> extends InternalHttpBaseDao<TI> {
  protected readonly converter: Converter<TI, TM>;
  protected constructor(routeUrl: string, converter: Converter<TI, TM>, options: HttpBaseDaoOptions = {}) {
    super(routeUrl, options);
    this.converter = converter;
  }

  list(customOptions: HttpBaseDaoOptions = {}): Promise<TM[]> {
    return firstValueFrom(this.listInternal(customOptions).pipe(this.mapServerInterfaceListToModelList.bind(this)));
  }

  create(entry: TM, customOptions: HttpBaseDaoOptions = {}): Promise<TM> {
    const createData = this.converter.toJson(entry);
    return firstValueFrom(
      this.createInternal(createData, customOptions).pipe(this.mapServerInterfaceToModel.bind(this)),
    );
  }

  update(id: DaoId, entry: Partial<TM>, customOptions: HttpBaseDaoOptions = {}): Promise<TM> {
    const updateData = this.converter.toJson(entry);
    return firstValueFrom(
      this.updateInternal(id, updateData, customOptions).pipe(this.mapServerInterfaceToModel.bind(this)),
    );
  }

  delete(id: DaoId, customOptions: HttpBaseDaoOptions = {}): Promise<TM> {
    return firstValueFrom(this.deleteInternal(id, customOptions).pipe(this.mapServerInterfaceToModel.bind(this)));
  }

  read(id: DaoId, customOptions: HttpBaseDaoOptions = {}): Promise<TM> {
    return firstValueFrom(this.readInternal(id, customOptions).pipe(this.mapServerInterfaceToModel.bind(this)));
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
