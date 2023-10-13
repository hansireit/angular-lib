import { Observable } from 'rxjs';
import { HttpBaseDaoV2Options } from './http-base-dao-v2-options';
import { DaoId } from './dao-id';
import { InternalHttpBaseDaoV2 } from './internal/internal-http-base-dao-v2';

export abstract class HttpBaseDaoV2<TI> extends InternalHttpBaseDaoV2<TI> {
  protected constructor(routeUrl: string, options: HttpBaseDaoV2Options = {}) {
    super(routeUrl, options);
  }

  list(customOptions: HttpBaseDaoV2Options = {}): Observable<TI[]> {
    return this.listInternal(customOptions);
  }

  create(entry: TI, customOptions: HttpBaseDaoV2Options = {}): Observable<TI> {
    return this.createInternal(entry, customOptions);
  }

  update(id: string | number, entry: Partial<TI>, customOptions: HttpBaseDaoV2Options = {}): Observable<TI> {
    return this.updateInternal(id, entry, customOptions);
  }

  delete(id: DaoId, customOptions: HttpBaseDaoV2Options = {}): Observable<TI> {
    return this.deleteInternal(id, customOptions);
  }

  read(id: DaoId, customOptions: HttpBaseDaoV2Options = {}): Observable<TI> {
    return this.readInternal(id, customOptions);
  }
}
