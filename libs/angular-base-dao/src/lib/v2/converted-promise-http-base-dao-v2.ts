import { firstValueFrom, map, Observable } from 'rxjs';
import { HttpBaseDaoV2Options } from './http-base-dao-v2-options';
import { DaoId } from './dao-id';
import { InternalHttpBaseDaoV2 } from './internal/internal-http-base-dao-v2';
import { ConverterV2 } from './converter-v2';
import { IPromiseDao } from './i-promise-dao';

export abstract class ConvertedPromiseHttpBaseDaoV2<TI, TM>
  extends InternalHttpBaseDaoV2<TI>
  implements IPromiseDao<TI, TM>
{
  protected readonly converter: ConverterV2<TI, TM>;
  protected constructor(routeUrl: string, converter: ConverterV2<TI, TM>, options: HttpBaseDaoV2Options = {}) {
    super(routeUrl, options);
    this.converter = converter;
  }

  list(customOptions: HttpBaseDaoV2Options = {}): Promise<TM[]> {
    return firstValueFrom(this.listInternal(customOptions).pipe(this.mapServerInterfaceListToModelList.bind(this)));
  }

  create(entry: TI, customOptions: HttpBaseDaoV2Options = {}): Promise<TM> {
    return firstValueFrom(this.createInternal(entry, customOptions).pipe(this.mapServerInterfaceToModel.bind(this)));
  }

  update(id: string | number, entry: Partial<TI>, customOptions: HttpBaseDaoV2Options = {}): Promise<TM> {
    return firstValueFrom(
      this.updateInternal(id, entry, customOptions).pipe(this.mapServerInterfaceToModel.bind(this)),
    );
  }

  delete(id: DaoId, customOptions: HttpBaseDaoV2Options = {}): Promise<TM> {
    return firstValueFrom(this.deleteInternal(id, customOptions).pipe(this.mapServerInterfaceToModel.bind(this)));
  }

  read(id: DaoId, customOptions: HttpBaseDaoV2Options = {}): Promise<TM> {
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
