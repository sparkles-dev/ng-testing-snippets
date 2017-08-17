import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/** This class implements some features that should be tested. */
@Injectable()
export class HttpClientFeatureService {

  constructor(
    private http: HttpClient
  ) {}

  login(user: string, password: string): Observable<boolean> {
    const body = new HttpParams();
    body.set(`user`, user);
    body.set(`password`, password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`auth/login`, body.toString, { headers, observe: 'response' })
      .map((res: HttpResponse<Object>) => res.ok)
      .catch((err: any) => Observable.of(false));
  }

}
