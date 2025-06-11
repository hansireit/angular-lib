import { Directive, HostListener, inject } from '@angular/core';
import { NavigationService } from './navigation.service';

@Directive({
  selector: '[ngBackButton]',
  standalone: true
})
export class BackButtonDirective {
  private readonly navigation = inject(NavigationService);

  @HostListener('click')
  onClick(): void {
    this.navigation.back();
  }
}
