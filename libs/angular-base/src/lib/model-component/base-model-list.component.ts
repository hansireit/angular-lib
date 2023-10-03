import { BaseModelComponent } from './base-model.component';
import { MatTableDataSource } from '@angular/material/table';
import { Identifiable } from '../interfaces/identifiable';
import { ModelAction } from './action';

export abstract class BaseModelListComponent<TM extends Identifiable> extends BaseModelComponent<TM> {
  readonly dataSource = new MatTableDataSource<TM>([]);

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

  showDetail(id: string | number): void {
    this.router.navigate([this.baseRoute, id]);
  }

  editModel(id: string | number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }

  createModel(): void {
    this.router.navigate([`${this.baseRoute}/add`]);
  }

  async deleteModel(model: TM): Promise<void> {
    const [deleted, newList] = await this.handleModelDelete(model);
    if (deleted && newList) {
      this.dataSource.data = newList;
    }
  }

  abstract handleModelDelete(model: TM): Promise<[boolean, TM[]]>;
}
