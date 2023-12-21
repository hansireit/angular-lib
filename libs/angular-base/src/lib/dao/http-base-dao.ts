import { Observable } from 'rxjs';
import { HttpBaseDaoOptions } from './http-base-dao-options';
import { DaoId } from './dao-id';
import { InternalHttpBaseDao } from './internal/internal-http-base-dao';

export abstract class HttpBaseDao<TI> extends InternalHttpBaseDao<TI> {
  protected constructor(routeUrl: string, options: HttpBaseDaoOptions = {}) {
    super(routeUrl, options);
  }

  list(customOptions: HttpBaseDaoOptions = {}): Observable<TI[]> {
    return this.listInternal(customOptions);
  }

  create(entry: Partial<TI>, customOptions: HttpBaseDaoOptions = {}): Observable<TI> {
    return this.createInternal(entry, customOptions);
  }

  update(id: DaoId, entry: Partial<TI>, customOptions: HttpBaseDaoOptions = {}): Observable<TI> {
    return this.updateInternal(id, entry, customOptions);
  }

  delete(id: DaoId, customOptions: HttpBaseDaoOptions = {}): Observable<TI> {
    return this.deleteInternal(id, customOptions);
  }

  read(id: DaoId, customOptions: HttpBaseDaoOptions = {}): Observable<TI> {
    return this.readInternal(id, customOptions);
  }
}
