import { DataUpdate } from './DataUpdate';

export interface Dao<T> {
    list(onUpdate: DataUpdate<T>): Promise<T[]>;
    create(t: T): Promise<T>;
    delete(t: T): Promise<T>;
    update(t: T): Promise<T>;
}
