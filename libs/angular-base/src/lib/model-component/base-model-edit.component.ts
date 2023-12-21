import { BaseModelComponent } from './base-model.component';
import { Identifiable } from 'angular-base-dao';

export abstract class BaseModelEditComponent<TM extends Identifiable> extends BaseModelComponent<TM> {
  model: TM | null = null;
}
