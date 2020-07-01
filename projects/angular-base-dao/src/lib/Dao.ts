import { Identifiable } from './Identifiable';

export interface Dao<T> {
    list(): Promise<T[]>;
    read(entity: Identifiable): Promise<T>;
    create(t: T): Promise<T>;
    delete(t: T): Promise<T>;
    update(t: T): Promise<T>;
}
