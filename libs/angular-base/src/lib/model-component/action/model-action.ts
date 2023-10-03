import { ModelActionType } from './model-action.type';

export class ModelAction<T> {
  constructor(
    public readonly action: ModelActionType,
    public readonly model: T,
  ) {}
}
