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
If this is not wanted, you can specify it super-constructor call.

If you want to prefer a different kind of authentication method, you can pass custom http-headers to the affected **CRUDL** method. (`this.dao.list(false, { ...httpOptions })`)

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
