import { firstValueFrom } from 'rxjs';
import { HttpBaseDaoV2Options } from './http-base-dao-v2-options';
import { DaoId } from './dao-id';
import { InternalHttpBaseDaoV2 } from './internal/internal-http-base-dao-v2';
import { IPromiseDao } from './i-promise-dao';

export abstract class PromiseHttpBaseDaoV2<TI> extends InternalHttpBaseDaoV2<TI> implements IPromiseDao<TI, TI> {
  protected constructor(routeUrl: string, options: HttpBaseDaoV2Options = {}) {
    super(routeUrl, options);
  }

  list(customOptions: HttpBaseDaoV2Options = {}): Promise<TI[]> {
    return firstValueFrom(this.listInternal(customOptions));
  }

  create(entry: TI, customOptions: HttpBaseDaoV2Options = {}): Promise<TI> {
    return firstValueFrom(this.createInternal(entry, customOptions));
  }

  update(id: string | number, entry: Partial<TI>, customOptions: HttpBaseDaoV2Options = {}): Promise<TI> {
    return firstValueFrom(this.updateInternal(id, entry, customOptions));
  }

  delete(id: DaoId, customOptions: HttpBaseDaoV2Options = {}): Promise<TI> {
    return firstValueFrom(this.deleteInternal(id, customOptions));
  }

  read(id: DaoId, customOptions: HttpBaseDaoV2Options = {}): Promise<TI> {
    return firstValueFrom(this.readInternal(id, customOptions));
  }
}
