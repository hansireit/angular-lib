import { ModelActionType } from './model-action.type';

export interface ModelAction<T> {
  readonly action: ModelActionType;
  readonly model: T;
}
