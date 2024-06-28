import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { InternalHttpBaseDaoV2 } from './internal-http-base-dao-v2';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { HttpBaseDaoV2Options } from '../http-base-dao-v2-options';

interface Entity {
  name: string;
}
const entityUrl = 'https://my-url.com/entity';
const mockedHeaders = { foo: 'bar' } as unknown as HttpHeaders;

@Injectable()
class InternalHttpBaseDaoV2Impl extends InternalHttpBaseDaoV2<Entity> {
  constructor() {
    super(entityUrl, {
      headers: mockedHeaders
    });
  }

  list(customOptions: HttpBaseDaoV2Options = {}): Observable<Entity[]> {
    return super.listInternal(customOptions);
  }
}

describe('InternalHttpBaseDaoV2', () => {
  let service: InternalHttpBaseDaoV2Impl;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternalHttpBaseDaoV2Impl, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(InternalHttpBaseDaoV2Impl);
    http = TestBed.inject(HttpClient);
  });

  it('should use the default options for the http-client', async () => {
    http.get = jest.fn().mockReturnValue(of({ name: 'Whats up' }));
    await firstValueFrom(service.list());
    expect(http.get).toHaveBeenCalledWith(entityUrl, { withCredentials: true, headers: mockedHeaders });
  });

  it('should use the overwritten options passed by to the list function', async () => {
    http.get = jest.fn().mockReturnValue(of({ name: 'Whats up' }));
    await firstValueFrom(service.list({ withCredentials: false }));
    expect(http.get).toHaveBeenCalledWith(entityUrl, { withCredentials: false, headers: mockedHeaders });
  });
});
