import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseAuthService } from '../base-auth.service';

export const loggedOutGuardFn: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  return inject(BaseAuthService).readyLoginState$.pipe(
    map((state) => {
      if (state !== 'logged-in') {
        return true;
      }

      return router.createUrlTree(['/']);
    }),
  );
};
