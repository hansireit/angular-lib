/**
 * Component used for all pages that can directly navigate back to the home page if no other route was found
 */
import { inject } from '@angular/core';
import { NavigationService } from '../navigation/navigation.service';

export abstract class BaseComponent {
  backRoute = '/';

  protected readonly navigationService = inject(NavigationService);

  goBack(): void {
    this.navigationService.back(this.backRoute);
  }
}
