import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientFeatureService } from './http-client-feature.service';

describe(`HttpClientFeatureService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpClientFeatureService
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should send an expected login request`, async(inject([HttpClientFeatureService, HttpTestingController],
    (service: HttpClientFeatureService, backend: HttpTestingController) => {
      service.login('foo', 'bar').subscribe();

      backend.expectOne((req: HttpRequest<any>) => {
        const body = new HttpParams({ fromString: req.body });

        return req.url === 'auth/login'
          && req.method === 'POST'
          && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
          && body.get('user') === 'foo'
          && body.get('password') === 'bar';
      }, `POST to 'auth/login' with form-encoded user and password`);
  })));

  it(`should emit 'false' for 401 Unauthorized`, async(inject([HttpClientFeatureService, HttpTestingController],
    (service: HttpClientFeatureService, backend: HttpTestingController) => {
      service.login('foo', 'bar').subscribe((next) => {
        expect(next).toBeFalsy();
      });

      backend.expectOne('auth/login').flush(null, { status: 401, statusText: 'Unauthorized' });
  })));

  it(`should emit 'true' for 200 Ok`, async(inject([HttpClientFeatureService, HttpTestingController],
    (service: HttpClientFeatureService, backend: HttpTestingController) => {
      service.login('foo', 'bar').subscribe((next) => {
        expect(next).toBeTruthy();
      });

      backend.expectOne('auth/login').flush(null, { status: 200, statusText: 'Ok' });
  })));

});
