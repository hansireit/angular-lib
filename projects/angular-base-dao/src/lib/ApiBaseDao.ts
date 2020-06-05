import { Dao } from './Dao';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from './authentification-service.service'
import { IdentifiableRequestSerializable } from './IdentifiableRequestSerializable';
import { DataUpdate } from './DataUpdate';

export abstract class ApiBaseDao<T extends IdentifiableRequestSerializable> implements Dao<T>{
    protected observers: DataUpdate<T>[] = [];
    protected dataList: T[];
    protected routeUrl: string;
    protected http: HttpClient;
    protected authService: AuthentificationService;

    constructor(
        routeUrl: string,
        http: HttpClient,
        authService: AuthentificationService
    ) {
        this.routeUrl = routeUrl;
        this.http = http;
        this.authService = authService;
    }

    public list(onUpdate: DataUpdate<T> = null): Promise<T[]> {
        if (onUpdate) {
            this.observers.push(onUpdate);
        }

        return new Promise((resolve, reject) => {
            if (this.dataList) {
                if (onUpdate) {
                    onUpdate(this.dataList);
                }
                resolve(this.dataList);
            }
            else {
                this.http.get<T[]>(this.routeUrl, { headers: this.authService.headers }).subscribe(
                    data => {
                        this.dataList = data.map(value => this.createModel(value));

                        if (onUpdate) {
                            onUpdate(this.dataList);
                        }
                        resolve(this.dataList);
                    },
                    error => {
                        reject(error);
                    }
                );
            }
        });
    }

    public create(item: T): Promise<T> {        
        return new Promise<T>((resolve, reject) => {
            if (!item) {
                reject('Could not create game (null)');
            }
            else {
                this.http.post<T>(this.routeUrl, item.toJsonRequestBody(), { headers: this.authService.headers }).subscribe(
                    data => {
                        data = this.createModel(data);
                        this.dataList.push(data);
                        this.notifyDataChange();
                        resolve(data);
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
                reject('Could not update game (null)');
            }
            else {
                this.http.put<T>(this.routeUrl + '/' + item._id, item.toJsonRequestBody(), { headers: this.authService.headers }).subscribe(
                    data => {
                        data = this.createModel(data);
                        this.notifyDataChange();
                        resolve(data);
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
                reject('Could not delte T (null)');
            }
            else {
                this.http.delete<T>(this.routeUrl + '/' + item._id, { headers: this.authService.headers }).subscribe(
                    data => {
                        data = this.createModel(data);
                        this.dataList = this.dataList.filter(obj => obj._id !== item._id);
                        this.notifyDataChange();
                        resolve(data);
                    },
                    error => {
                        reject(error);
                    }
                );
            }
        });
    }

    protected notifyDataChange(): void {
        this.observers.forEach(observer => observer(this.dataList));
    }

    protected abstract createModel(propertyData: T) : T;
}