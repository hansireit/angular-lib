import { firstValueFrom } from 'rxjs';
import { HttpBaseDaoOptions } from './http-base-dao-options';
import { DaoId } from './dao-id';
import { InternalHttpBaseDao } from './internal/internal-http-base-dao';

export abstract class PromiseHttpBaseDao<TI> extends InternalHttpBaseDao<TI> {
  protected constructor(routeUrl: string, options: HttpBaseDaoOptions = {}) {
    super(routeUrl, options);
  }

  list(customOptions: HttpBaseDaoOptions = {}): Promise<TI[]> {
    return firstValueFrom(this.listInternal(customOptions));
  }

  create(data: object, customOptions: HttpBaseDaoOptions = {}): Promise<TI> {
    return firstValueFrom(this.createInternal(data, customOptions));
  }

  update(id: DaoId, data: object, customOptions: HttpBaseDaoOptions = {}): Promise<TI> {
    return firstValueFrom(this.updateInternal(id, data, customOptions));
  }

  delete(id: DaoId, customOptions: HttpBaseDaoOptions = {}): Promise<TI> {
    return firstValueFrom(this.deleteInternal(id, customOptions));
  }

  read(id: DaoId, customOptions: HttpBaseDaoOptions = {}): Promise<TI> {
    return firstValueFrom(this.readInternal(id, customOptions));
  }
}
