import { BaseAuthState } from './base-auth-state';
import { LoginState } from './login-state.type';

export class NotLoggedInAuthState implements BaseAuthState<unknown> {
  readonly loginState: LoginState = 'logged-out';
  readonly user = null;
}
