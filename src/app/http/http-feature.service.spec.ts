import { Injector } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { Http, HttpModule, Request, RequestMethod, RequestOptions, Response,
  ResponseOptions, URLSearchParams, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FeatureService } from './http-feature.service';

describe('FeatureService', () => {
  let backend: MockBackend;

  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        { provide: MockBackend, useClass: MockBackend },
        { provide: XHRBackend, useExisting: MockBackend },
        FeatureService
      ]
    });
    backend = TestBed.get(MockBackend);

    spyOn(Http.prototype, 'request').and.callThrough();
  });

  afterEach(() => backend.verifyNoPendingRequests());

   it(`should emit 'false' for 401 Unauthorized`,
    async(inject([ FeatureService, MockBackend ],
                 (service: FeatureService, mockBackend: MockBackend) => {

      // 0. prepare fake response from `MockBackend`
      mockBackend.connections.subscribe((c: MockConnection) => {
        // 2a. expect `FeatureSerivice` to make a proper request
        expect(c.request.url).toBe('auth/login');
        expect(c.request.method).toBe(RequestMethod.Post);
        expect(c.request.headers.get('Content-Type'))
          .toBe('application/x-www-form-urlencoded');

        // 2b. expect request body to contain form data
        // expect(c.request.getBody()).toBe(/* ... */);

        // 3. respond to `FeatureService` with a 401 Unauthorized
        c.mockRespond(new Response(new ResponseOptions({
          body: '',
          status: 401
        })));
      });

      // 1. dispatch the http request
      service.login('foo', 'bar')
        .subscribe((status: boolean) => {
          // 4. ensure that `FeatureService` reports login failure
          expect(status).toBeFalsy();
        });

    })));

     it(`should emit 'true' for 200 Ok`,
    async(inject([ FeatureService, MockBackend ],
                 (service: FeatureService, mockBackend: MockBackend) => {

      // 1. prepare fake response from `MockBackend`
      mockBackend.connections.subscribe((c: MockConnection) => {

        // 3. respond to `FeatureService` with a 200 Ok
        c.mockRespond(new Response(new ResponseOptions({
          body: '',
          status: 200
        })));
      });

      // 2. dispatch the http request
      service.login('foo', 'bar')
        .subscribe((status: boolean) => {
          // 4. ensure that `FeatureService` reports login success
          expect(status).toBeTruthy();
        });

    })));

});
