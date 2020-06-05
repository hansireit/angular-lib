import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthentificationResponse } from './AuthentificationResponse';
import { LoginResult } from './LoginResult';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private static apiLoginRoute = 'http://localhost:4001/login';
  private static apiUserDetailRoute = 'http://localhost:4001/user';
  private static localTokenKey = 'auth-token';
  private static appBaseDomain = 'localhost';

  public isLoggedIn = false;

  public headers: HttpHeaders;
  private authToken: string;
  private saveCredentials: boolean = false;
  private user: any;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public static initData(
    apiLoginRoute: string,
    apiUserDetailRoute: string
  ): void {}

  public login(
    email: string,
    password: string,
    captchaToken: string = '',
    saveCredentials: boolean
  ): Promise<LoginResult> {
    this.saveCredentials = saveCredentials;

    const body = {
      email: email,
      password: password
    };

    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return new Promise<LoginResult>((resolve, reject) => {
      this.http
        .post<AuthentificationResponse>(
          AuthentificationService.apiLoginRoute,
          JSON.stringify(body),
          { headers: this.headers }
        )
        .subscribe(
          data => {
            this.setAuthToken(data.token);
            this.isLoggedIn = true;

            this.getUserDetailByToken().then(isLogged => {
              if (isLogged) {
                resolve(LoginResult.SUCCESS);
              } else {
                resolve(LoginResult.INTERNAL_ERROR);
              }
            });
          },
          err => {
            if (err.status == 401) {
              resolve(LoginResult.EMAIL_TAKEN);
            } else if (err.status == 403 || err.status == 404) {
              resolve(LoginResult.INCORRECT_CREDENTIALS);
            } else {
              resolve(LoginResult.INTERNAL_ERROR);
            }
          }
        );
    });
  }

  private getUserDetailByToken(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.authToken != null) {
        this.http
          .get<any>(AuthentificationService.apiUserDetailRoute, {
            headers: this.headers
          })
          .subscribe(
            data => {
              this.user = data;
              this.isLoggedIn = true;
              resolve(true);
            },
            error => {
              console.warn(error);
              resolve(false);
            }
          );
      } else {
        console.warn('Token variable is null');
        resolve(false);
      }
    });
  }

  public activeateTokenCookie() {
    const expireDate = new Date();

    if (this.saveCredentials) {
      expireDate.setFullYear(expireDate.getFullYear() + 10);
    } else {
      // Only valid for 10 minutes
      expireDate.setMinutes(expireDate.getMinutes() + 10);
    }
    this.cookieService.set(
      AuthentificationService.localTokenKey,
      this.authToken,
      expireDate,
      '/',
      AuthentificationService.appBaseDomain
    );
  }

  private setAuthToken(token: string): void {
    this.authToken = token;
    this.headers = new HttpHeaders({ 'auth-token': this.authToken.toString() });
    this.activeateTokenCookie();
  }

  public getAuthToken(): string {
    return this.authToken;
  }

  public tryLoginWithLocalToken(): void {
    let token = this.cookieService.get(AuthentificationService.localTokenKey);
    if (token == null || token === '') {
      token = sessionStorage.getItem(AuthentificationService.localTokenKey);
    }

    if (token != null) {
      this.setAuthToken(token);
      this.getUserDetailByToken().then(result => {
        if (!result) {
          this.isLoggedIn = false;
        }
      });
    }
  }

  public logoutUser(): void {
    this.isLoggedIn = false;
    this.authToken = '';
    this.cookieService.delete(
      AuthentificationService.localTokenKey,
      '/',
      AuthentificationService.appBaseDomain
    );
    sessionStorage.removeItem(AuthentificationService.localTokenKey);
  }
}
