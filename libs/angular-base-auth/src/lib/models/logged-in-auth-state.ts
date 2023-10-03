import { BaseAuthState } from './base-auth-state';
import { LoginState } from './login-state.type';

export class LoggedInAuthState<T> implements BaseAuthState<T> {
  readonly loginState: LoginState = 'logged-in';
  readonly user: T;

  constructor(user: T) {
    this.user = user;
  }
}
