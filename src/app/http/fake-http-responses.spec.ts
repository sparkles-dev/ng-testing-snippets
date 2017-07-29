import { TestBed, async, inject } from '@angular/core/testing';
import { Http, HttpModule, XHRBackend, Response, ResponseOptions, Request, RequestOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('FakeHttpResponses', () => {
  let backend: MockBackend;

  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        // DI Token for `MockBackend`: used by tests
        { provide: MockBackend, useClass: MockBackend },
        // DI Token for `XHRBackend`: used by `Http` service and transitive dependents
        { provide: XHRBackend, useExisting: MockBackend }
      ]
    });
    // grab reference to `MockBackend`
    backend = TestBed.get(MockBackend);

    // spying on `http.request()` allows to count number of requests (shown later)
    spyOn(Http.prototype, 'request').and.callThrough();
  });

  afterEach(() => backend.verifyNoPendingRequests());


  it(`should 1) call a http request, 2) verify the request,`
     + `3) respond with fake data, and 4) verify the response`,
    async(inject([ Http, MockBackend ], (http: Http, mockBackend: MockBackend) => {

      // 0. prepare fake response from MockBackend
      mockBackend.connections.subscribe((c: MockConnection) => {
        // 2. expect the test client to make a well-known request
        expect(c.request.url).toBe('/foo/bar');

        // 3. respond to test client with a well-known response
        c.mockRespond(new Response(new ResponseOptions({
          body: 'This is a fake response'
        })));
      });

      // 1. dispatch the request
      http.request(new Request(new RequestOptions({
          url: '/foo/bar',
          method: RequestMethod.Get
        })))
        .subscribe((res: Response) => {
          // 4. oviously, we should receive the fake response
          expect(res.text()).toBe(`This is a fake response`);

          // SANITY: we've made our http request, it should have been dispatched by `Http`
          expect(http.request).toHaveBeenCalledTimes(1);
        });

    })));


});


