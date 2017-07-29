import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/** This class implements some features that should be tested. */
@Injectable()
export class FeatureService {

  constructor(
    private http: Http
  ) {}

  login(user: string, password: string): Observable<boolean> {
    const body = new URLSearchParams();
    body.set(`user`, user);
    body.set(`password`, password);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`auth/login`, body, { headers })
      .map((res: Response) => res.ok)
      .catch((err) => Observable.of(false));
  }

}
