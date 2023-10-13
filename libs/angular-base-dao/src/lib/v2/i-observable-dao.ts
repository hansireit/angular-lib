import { DaoId } from './dao-id';
import { Observable } from 'rxjs';

export interface IObservableDao<TI, TM> {
  list(): Observable<TM[]>;
  read(id: DaoId): Observable<TM>;
  create(t: TI): Observable<TM>;
  delete(id: DaoId): Observable<TM>;
  update(id: DaoId, data: Partial<TI>): Observable<TM>;
}
