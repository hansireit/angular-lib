# AngularBaseDao
This library is used to reduce the lines of code to implement a DAO-Service layer for your angular application.

## Usage
To use the AngularBaseDao library follow these steps:
1. __npm install angular-base-dao__
2. create a entity-class which implements the **IdentifiableRequestSerializable**-class
3. create a entity-service which extends from the **ApiBaseDao**-class
4. create a authentification-service which implements the **AuthTokenHeader**-class
  - this class must be injected in your **entity-service** and then passed to its super-constructor (ApiBaseDao)
  - this class hold the logic for the login- and register-request
  - it also holds the current auth-token (JWT) for future request of the entity-services

## Server Requirements
- REST server
- http methods are used to differentiate between the different CRUDL request

  - **POST** (CREATE)
    - url: https://api.net/entity
    - request body: **json object**
    - response body: **json object**

  - **GET** (READ)
    - url: https://api.net/entity/:id
    - request body: -
    - response body: **json object**

  - **GET** (LIST)
    - url: https://api.net/entity
    - request body: -
    - response body: **json array**

  - **PUT** (UPDATE)
    - url: https://api.net/entity/:id
    - request body: **json object**
    - response body: **json object**

  - **DELETE** (DELETE)
    - url: https://api.net/entity/:id
    - request body: -
    - response body: **json object**
