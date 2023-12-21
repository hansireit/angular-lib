# AngularBaseDao

This library helps you to create dao-services that include all **CURDL** methods out of the box without needing to implement them by your own.
Complex models that are received from the REST requests can simply be **converted/mapped** using the provided **HttpBaseDao** and **IConverter**.

> **CURLD** => **C**reate **R**ead **U**pdate **D**elete **L**ist

## Basic Usage

To create a service that provides all CRUDL functions out of the box follow these steps:

**Step 1: Create an entity-class which implements the **IIdentifiable** interface**

```ts
export interface UserModel implements IIdentifiable {
  id: string;
  name: string;
}
```

**Step 2: Create an entity-dao-service, which extends from the NoConversionHttpBaseDao-class**

By default, the service will set **withCredentials** to true, to make use of http-only cookie authentication.
If this is not wanted, you can specify it in the super-constructor call.

If you prefer a different kind of authentication method, you can pass custom http-headers to the affected **CRUDL** method. (`this.dao.list(false, { ...httpOptions })`)

```ts
@Injectable({ providedIn: 'root' })
export class UserDaoService extends NoConversionHttpBaseDao<UserModel> {
  constructor() {
    super('https://api.net/user');
  }
}
```

**Step 3: Use the service**

```ts
@Component(...)
export class AppComponent {
  private readonly userDao = inject(UserDaoService);

  constructor() {
    this.userDao.create({ name: 'Max' }); // returns Promise<UserModel>
    this.userDao.read('my-id'); // returns Promise<UserModel>
    this.userDao.update({ id: 'max-id', name: 'Max' }); // returns Promise<UserModel>
    this.userDao.delete({ id: 'max-id', name: 'Max' }); // returns Promise<void>
    this.userDao.list(); // returns Promise<UserModel[]>
  }
}
```

### Using converters to convert http body to models (optional)

**Step 1: Create the request interface that the server sends back to the client**

```ts
export interface UserResponse implements IIdentifiable {
  id: string;
  creationDateString: string; // ISO string
}
```

**Step 2: Create the interface that the dao-service should return**

```ts
export interface UserModel implements IIdentifiable {
  id: string;
  creationDate: Date; // Real date object
}
```

**Step 3: Create a mapper-service that maps between those two models**

```ts
@Injectable({ providedIn: 'root' })
export class PersonConverterService implements IConverter<UserResponse, UserModel> {
  // Converts the model that was returned by the server to the model that should be used in the applciation
  fromJson(response: UserResponse): UserModel {
    return {
      id: response.id,
      creationDate: new Date(response.creationDateString), // Converts the date-string to a date
    };
  }

  // Prepares the object that will be sent to the server for CREATE or UPDATE
  toJson(model: UserModel): unknown {
    return {
      id: model.id,
      creationDate: model.creationDate.toISOString(),
    };
  }
}
```

**Step 4: Create the entity-dao-service and provide the created converter-service**

```ts
@Injectable({ providedIn: 'root' })
export class UserDaoService extends HttpBaseDao<UserResponse, PersonModel> {
  constructor() {
    super('https://api.net/user', inject(HttpClient), inject(PersonConverterService));
  }
}
```

## Server Requirements

- REST server
- HTTP methods are used to differentiate between the different CRUDL request

  - **POST** (CREATE)

    - url: https://api.net/entity
    - request body: **json object**
    - response body: **json object**

  - **GET** (READ)

    - url: https://api.net/entity/:id
    - request body: -
    - response body: **json object**

  - **PUT** (UPDATE)

    - url: https://api.net/entity/:id
    - request body: **json object**
    - response body: **json object**

  - **DELETE** (DELETE)

    - url: https://api.net/entity/:id
    - request body: -
    - response body: -

  - **GET** (LIST)

    - url: https://api.net/entity
    - request body: -
    - response body: **json array**

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

# angular-base

Library with different abstract components and utilities that come in handy for simple angular-applications.

# model-component

A collection of abstract classes(components) that can reflect the different action pages(list/add/edit) for a subject(model).

# navigation-service

Keeps track of visited pages and navigates back to the previous page if 'back' is called. If back is called on the initial page, the fallback route is used.
For example if the user is on the route '/users/edit' and clicks on the back button, the router will navigate to '/users'.
These base paths can be defined in the implementation of the base-model-components.
