# Angular Base Authentication
This library contains an abstract auth-service and guards that can be used out of the box, by just extending the `BaseAuthService<TUSER>`.

## Usage

**Step 1: Create a user model**

```js
interface UserModel {
  id: string;
  email: string;
  isAdmin: boolean;
}
```

**Step 2: Extend the base-auth-service using the user-model**

```js
@Injectable({ providedIn: 'root' })
export class MyOwnAuthService extends BaseAuthService<UserModel>...
```

**Step 3: Set the initial login state inside the constructor**

With local auth-cookie:
```js
constructor() {
  const user = loginUsingAuthCookie(); // Validate and check your local auth-cookie
  if (user) {
    this.userLoggedIn(user); // Sets the login state to logged-in
  } else {
    this.userLoggedOut(); // Sets the login state to logged-out
  }
}
```

Without local tokens:
```js
constructor() {
  this.userLoggedOut(); // Sets the initial login state to logged-out
}
```

> Important: Make sure the initial login state is set right after the application is started by calling `userLoggedIn`or `userLoggedOut`. If you do NOT do this the login-state will be `pending` and the provided auth-guards be waiting for the 'readyLoginState$' forever. 

****

```js
constructor() {
  this.userLoggedOut(); // If you do not do this, the login-state will be pending
}
```

**Step 4: Implement the login-logout functions and call the provided functions of the base-class**

```js
async login(loginData): Promise<void> {
  try {
    const result$ = this.http.post<UserModel>(login, loginData);
    const user = await firstValueFrom(result$);
    this.userLoggedIn(user); // Sets the login state to logged-in
  } catch (ex) {
    this.userLoggedOut(); // Sets the login state to logged-out
    return ex;
  }
}
```

**Step 5: Provide your service implementation as `BaseAuthService`**
app.config.ts
```js
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: BaseAuthService,
      useExisting: MyOwnAuthService
    },
    ...
  ]
};
```

**Step 6: Use it**

Now you can use the provided route-guards without any configuration.
```js
{  
  ...
  path: 'login',
  canActivate: [loggedOutGuardFn], //Only allow when logged-out
  ...
},
{
  ...
  path: 'account',
  canActivate: [loggedInGuardFn], // Only allow when logged-in
  ...
},
```

The `BaseAuthService` also provides a list of handy observables that represent the current auth-state like:
```js
loginState$(): Observable<LoginState>
readyLoginState$(): Observable<LoginState>
readyAuthState$(): Observable<BaseAuthState<T>>
user$(): Observable<T | null>
isLoggedIn$(): Observable<boolean>
loginRoute(): string
```

### loginState$ vs readyLoginState$

#### loginState$

Emits all login states. Initial value will be `{ loginState: 'pending', user: null }`

#### readyLoginState$

Only emits non `pending` auth-states. Therefor handy for auth-guards.

#### Explanation

When a page is initially loaded, and the user is logged in using the stored auth-cookie. The auth state will be `pending` until the cookie is verified, until this the auth guard should not check if the route can be activated. Only if `this.userLoggedOut()` or `this.userLoggedIn(user)` was called, the auth guard will check the access. This prevents the application from blocking a page from the user because login-state is not settled jet.
