import { DaoId } from './dao-id';

export interface IPromiseDao<TI, TM> {
  list(): Promise<TM[]>;
  read(id: DaoId): Promise<TM>;
  create(t: TI): Promise<TM>;
  delete(id: DaoId): Promise<TM>;
  update(id: DaoId, data: Partial<TI>): Promise<TM>;
}
