import { Dao } from './Dao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IdentifiableRequestSerializable } from './IdentifiableRequestSerializable';

export abstract class ApiBaseDao<T extends IdentifiableRequestSerializable>
  implements Dao<T> {
  protected routeUrl: string;
  protected http: HttpClient;
  protected headers: HttpHeaders;
  protected httpWithCredentials: boolean = false;

  constructor(
    routeUrl: string,
    http: HttpClient,
    headers: HttpHeaders,
    httpWithCredentials: boolean = false
  ) {
    this.routeUrl = routeUrl;
    this.http = http;
    this.headers = headers;
    this.httpWithCredentials = httpWithCredentials;
  }

  public list(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<T[]>(this.routeUrl, {
          headers: this.headers,
          withCredentials: this.httpWithCredentials
        })
        .subscribe(
          data => {
            resolve(data.map(elem => this.createModel(elem)));
          },
          error => {
            reject(error);
          }
        );
    });
  }

  public create(item: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!item) {
        reject('Could not create item (null)');
      } else {
        this.http
          .post<T>(this.routeUrl, item.toJsonRequestBody(), {
            headers: this.headers,
            withCredentials: this.httpWithCredentials
          })
          .subscribe(
            data => {
              resolve(this.createModel(data));
            },
            error => {
              reject(error);
            }
          );
      }
    });
  }

  public update(item: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!item) {
        reject('Could not update entity. (null)');
      } else {
        this.http
          .put<T>(this.routeUrl + '/' + item._id, item.toJsonRequestBody(), {
            headers: this.headers,
            withCredentials: this.httpWithCredentials
          })
          .subscribe(
            data => {
              resolve(this.createModel(data));
            },
            error => {
              reject(error);
            }
          );
      }
    });
  }

  public delete(item: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!item) {
        reject('Could not delte entity. (null)');
      } else {
        this.http
          .delete<T>(this.routeUrl + '/' + item._id, {
            headers: this.headers,
            withCredentials: this.httpWithCredentials
          })
          .subscribe(
            data => {
              resolve(this.createModel(data));
            },
            error => {
              reject(error);
            }
          );
      }
    });
  }

  read(id: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http
        .get<T>(this.routeUrl + '/' + id, {
          headers: this.headers,
          withCredentials: this.httpWithCredentials
        })
        .subscribe(
          data => {
            resolve(this.createModel(data));
          },
          error => {
            reject(error);
          }
        );
    });
  }

  protected abstract createModel(propertyData: T): T;
}
