import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation/navigation.service';
import { ModelAction } from './action';
import { Identifiable } from 'angular-base-dao';

export abstract class BaseModelDetailComponent<TM extends Identifiable> {
  model: TM | null = null;

  protected readonly router = inject(Router);
  protected readonly navigationService = inject(NavigationService);

  protected constructor(protected baseRoute: string) {}

  handleModelAction(modelAction: ModelAction<TM>): void {
    switch (modelAction.action) {
      case 'show':
        this.showList();
        break;

      case 'edit':
        this.editModel();
        break;

      case 'delete':
        this.deleteModel();
        break;
    }
  }

  showList(): void {
    this.router.navigate([this.baseRoute]);
  }

  async editModel(): Promise<void> {
    if (!this.model) {
      return;
    }

    await this.router.navigate([`${this.baseRoute}/edit`, this.model.id]);
  }

  async deleteModel(): Promise<void> {
    const model = this.model;

    if (!model) {
      return;
    }

    if (await this.handleDeleteModel(model)) {
      await this.router.navigate([`${this.baseRoute}`]);
    }
  }

  goBack(): void {
    this.navigationService.back(this.baseRoute);
  }

  abstract handleDeleteModel(model: TM): Promise<boolean>;
}
