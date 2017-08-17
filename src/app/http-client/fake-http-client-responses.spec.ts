import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe(`FakeHttpClientResponses`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  it(`should expect a GET /foo/bar`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.get('/foo/bar').subscribe();

      backend.expectOne({
        url: '/foo/bar',
        method: 'GET'
      });
  })));

  it(`should respond with fake data`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.get('/foo/bar').subscribe((next) => {
        expect(next).toEqual({ baz: '123' });
      });

      backend.match({
        url: '/foo/bar',
        method: 'GET'
      })[0].flush({ baz: '123' });
  })));

  it(`should not issue a PUT request`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.post('/allez', { value: 123 }).subscribe();
      http.get('/allez').subscribe();
      http.delete('/allez').subscribe();

      backend.expectNone((req: HttpRequest<any>) => {
        return req.method === 'PUT';
      });
  })));

  it(`should NOT fail when sending an un-matched request`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.get('/foo/bar').subscribe();

      backend.match('/foo');
  })));

  it(`should fail when verifying an un-matched request`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.get('/foo/bar').subscribe();

      backend.match('/foo');
      backend.verify();
  })));

  it(`should fail when not sending an expected request`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.get('/foo/bar').subscribe();

      backend.expectOne('/foo');
  })));

  it(`should fail when sending an non-expected request`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.get('/foo/bar').subscribe();

      backend.expectNone('/foo/bar');
  })));

});
