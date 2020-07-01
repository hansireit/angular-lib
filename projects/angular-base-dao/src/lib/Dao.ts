import { Identifiable } from './Identifiable';

export interface Dao<T> {
  list(): Promise<T[]>;
  read(id: string): Promise<T>;
  create(t: T): Promise<T>;
  delete(t: T): Promise<T>;
  update(t: T): Promise<T>;
}
