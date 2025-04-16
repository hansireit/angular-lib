import { BaseModelComponent } from './base-model.component';
import { ModelAction } from './action';
import { DaoId, Identifiable } from 'angular-base-dao';

export abstract class BaseModelListComponent<TM extends Identifiable> extends BaseModelComponent<TM> {
  protected constructor(baseRoute: string) {
    super(baseRoute);

    this.backRoute = '/';
  }

  override handleModelAction(modelAction: ModelAction<TM>): void {
    switch (modelAction.action) {
      case 'show':
        this.showDetail(modelAction.model.id);
        break;

      case 'edit':
        this.editModel(modelAction.model.id);
        break;

      case 'delete':
        this.deleteModel(modelAction.model);
        break;
    }
  }

  showDetail(id: DaoId): void {
    this.router.navigate([this.baseRoute, id]);
  }

  editModel(id: DaoId): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }

  createModel(): void {
    this.router.navigate([`${this.baseRoute}/add`]);
  }

  abstract deleteModel(model: TM): Promise<boolean>;
}
