import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BaseAuthService } from './base-auth.service';
import { LoggedInAuthState, NotLoggedInAuthState, PendingAuthState } from './models';
import { provideHttpClient } from '@angular/common/http';

interface User {
  name: string;
}

@Injectable()
class TestingAuthService extends BaseAuthService<User> {
  async login(username: string): Promise<void> {
    const user = await this.fakeUserRequest(username);
    if (user) {
      this.userLoggedIn(user);
    } else {
      this.userLoggedOut();
    }
  }

  private fakeUserRequest(username: string): Promise<User | null> {
    return username === 'admin' ? Promise.resolve({ name: username }) : Promise.resolve(null);
  }
}

describe('BaseAuthService', () => {
  let service: TestingAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestingAuthService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TestingAuthService);
  });

  it('should have the correct initial pending state', async () => {
    expect(await firstValueFrom(service.user$)).toBe(null);
    expect(await firstValueFrom(service.loginState$)).toBe('pending');
    expect(await firstValueFrom(service.authState$)).toEqual(new PendingAuthState());
    expect(await firstValueFrom(service.isLoggedIn$)).toBe(false);
  });

  it('should have the correct state after successfully logging in', async () => {
    await service.login('admin');

    expect(await firstValueFrom(service.user$)).toEqual({ name: 'admin' });
    expect(await firstValueFrom(service.loginState$)).toBe('logged-in');
    expect(await firstValueFrom(service.authState$)).toEqual(new LoggedInAuthState({ name: 'admin' }));
    expect(await firstValueFrom(service.isLoggedIn$)).toBe(true);

    expect(await firstValueFrom(service.readyUser$)).toEqual({ name: 'admin' });
    expect(await firstValueFrom(service.readyLoginState$)).toBe('logged-in');
    expect(await firstValueFrom(service.readyAuthState$)).toEqual(new LoggedInAuthState({ name: 'admin' }));
  });

  it('should have the correct state after logging out', async () => {
    await service.login('user');

    expect(await firstValueFrom(service.user$)).toBe(null);
    expect(await firstValueFrom(service.loginState$)).toBe('logged-out');
    expect(await firstValueFrom(service.authState$)).toEqual(new NotLoggedInAuthState());
    expect(await firstValueFrom(service.isLoggedIn$)).toBe(false);

    expect(await firstValueFrom(service.readyUser$)).toBe(null);
    expect(await firstValueFrom(service.readyLoginState$)).toBe('logged-out');
    expect(await firstValueFrom(service.readyAuthState$)).toEqual(new NotLoggedInAuthState());
  });
});
