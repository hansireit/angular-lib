import { Router } from '@angular/router';
import { BaseComponent } from './base.component';
import { inject } from '@angular/core';
import { ModelAction } from './action';

export abstract class BaseModelComponent<TM> extends BaseComponent {
  protected readonly router = inject(Router);

  protected constructor(protected baseRoute: string) {
    super();
    this.backRoute = this.baseRoute;
  }

  showList(): void {
    this.router.navigate([this.baseRoute]);
  }

  handleModelAction(modelAction: ModelAction<TM>): void {
    switch (modelAction.action) {
      case 'back_to-list':
        this.showList();
        break;
    }
  }
}
