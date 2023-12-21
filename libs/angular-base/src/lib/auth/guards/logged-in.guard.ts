import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseAuthService } from '../base-auth.service';
export const loggedInGuardFn: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  return inject(BaseAuthService).readyAuthState$.pipe(
    map((state) => {
      if (state.loginState === 'logged-in') {
        return true;
      }

      return router.createUrlTree(['/auth/login']);
    }),
  );
};
