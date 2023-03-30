import { IIdentifiable } from './interfaces/i-identifiable';

export interface Dao<T extends IIdentifiable> {
  list(): Promise<T[]>;
  read(id: string): Promise<T>;
  create(t: T): Promise<T>;
  delete(t: T): Promise<void>;
  update(t: T): Promise<T>;
}
