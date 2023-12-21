import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InternalHttpBaseDao } from './internal-http-base-dao';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { HttpBaseDaoOptions } from '../http-base-dao-options';

interface Entity {
  name: string;
}
const entityUrl = 'https://my-url.com/entity';
const mockedHeaders = { foo: 'bar' } as unknown as HttpHeaders;

@Injectable()
class InternalHttpBaseDaoImpl extends InternalHttpBaseDao<Entity> {
  constructor() {
    super(entityUrl, {
      headers: mockedHeaders,
    });
  }

  list(customOptions: HttpBaseDaoOptions = {}): Observable<Entity[]> {
    return super.listInternal(customOptions);
  }
}

describe('InternalHttpBaseDao', () => {
  let service: InternalHttpBaseDaoImpl;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InternalHttpBaseDaoImpl],
    });
    service = TestBed.inject(InternalHttpBaseDaoImpl);
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
