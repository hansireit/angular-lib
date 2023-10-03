import { LoginState } from './login-state.type';

export interface BaseAuthState<T> {
  loginState: LoginState;
  user: T | null;
}
