import { DaoId } from '../dao-id';

export interface Identifiable<T extends DaoId = DaoId> {
  id: T;
}
