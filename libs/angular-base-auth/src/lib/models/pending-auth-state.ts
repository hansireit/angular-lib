import { BaseAuthState } from './base-auth-state';
import { LoginState } from './login-state.type';

export class PendingAuthState implements BaseAuthState<unknown> {
  readonly loginState: LoginState = 'pending';
  readonly user = null;
}
