import { BehaviorSubject, filter, Observable } from 'rxjs';
import { BaseAuthState, LoggedInAuthState, LoginState, NotLoggedInAuthState, PendingAuthState } from './models';
import { map } from 'rxjs/operators';

export abstract class BaseAuthService<T> {
  private readonly authStateSubject = new BehaviorSubject<BaseAuthState<T>>(new PendingAuthState());
  private readonly _authState$: Observable<BaseAuthState<T>>;
  private readonly _loginState$: Observable<LoginState>;
  private readonly _readyLoginState$: Observable<LoginState>;
  private readonly _readyAuthState$: Observable<BaseAuthState<T>>;
  private readonly _user$: Observable<T | null>;
  private readonly _readyUser$: Observable<T | null>;
  private readonly _isLoggedIn$: Observable<boolean>;
  private readonly defaultLoginRoute = '/auth/login';

  get authState$(): Observable<BaseAuthState<T>> {
    return this._authState$;
  }

  get loginState$(): Observable<LoginState> {
    return this._loginState$;
  }

  get readyLoginState$(): Observable<LoginState> {
    return this._readyLoginState$;
  }

  get readyAuthState$(): Observable<BaseAuthState<T>> {
    return this._readyAuthState$;
  }

  get user$(): Observable<T | null> {
    return this._user$;
  }

  get readyUser$(): Observable<T | null> {
    return this._readyUser$;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$;
  }

  get loginRoute(): string {
    return this.defaultLoginRoute;
  }

  protected constructor() {
    this._authState$ = this.authStateSubject.asObservable();
    this._user$ = this._authState$.pipe(map((elem) => elem.user));
    this._loginState$ = this._authState$.pipe(map((elem) => elem.loginState));
    this._isLoggedIn$ = this._loginState$.pipe(map((state) => state === 'logged-in'));

    this._readyAuthState$ = this._authState$.pipe(filter((elem) => elem.loginState !== 'pending'));
    this._readyLoginState$ = this._readyAuthState$.pipe(map((elem) => elem.loginState));
    this._readyUser$ = this._readyAuthState$.pipe(map((elem) => elem.user));
  }

  protected userLoggedIn(user: T): void {
    this.authStateSubject.next(new LoggedInAuthState<T>(user));
  }

  protected userLoggedOut(): void {
    this.authStateSubject.next(new NotLoggedInAuthState());
  }
}
