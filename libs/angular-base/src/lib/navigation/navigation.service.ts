import { NavigationEnd, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private history: string[] = [];
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  reset(): void {
    this.history = [];
  }

  back(fallbackRoute = '/'): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigate([fallbackRoute]);
    }
  }
}
