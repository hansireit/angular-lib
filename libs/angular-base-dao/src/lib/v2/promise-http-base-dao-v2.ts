import { firstValueFrom } from 'rxjs';
import { HttpBaseDaoV2Options } from './http-base-dao-v2-options';
import { DaoId } from './dao-id';
import { InternalHttpBaseDaoV2 } from './internal/internal-http-base-dao-v2';

export abstract class PromiseHttpBaseDaoV2<TI> extends InternalHttpBaseDaoV2<TI> {
  protected constructor(routeUrl: string, options: HttpBaseDaoV2Options = {}) {
    super(routeUrl, options);
  }

  list(customOptions: HttpBaseDaoV2Options = {}): Promise<TI[]> {
    return firstValueFrom(this.listInternal(customOptions));
  }

  create(data: object, customOptions: HttpBaseDaoV2Options = {}): Promise<TI> {
    return firstValueFrom(this.createInternal(data, customOptions));
  }

  update(id: DaoId, data: object, customOptions: HttpBaseDaoV2Options = {}): Promise<TI> {
    return firstValueFrom(this.updateInternal(id, data, customOptions));
  }

  delete(id: DaoId, customOptions: HttpBaseDaoV2Options = {}): Promise<TI> {
    return firstValueFrom(this.deleteInternal(id, customOptions));
  }

  read(id: DaoId, customOptions: HttpBaseDaoV2Options = {}): Promise<TI> {
    return firstValueFrom(this.readInternal(id, customOptions));
  }
}
