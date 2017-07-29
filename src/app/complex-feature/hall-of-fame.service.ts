import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Player } from './entity.interfaces';

@Injectable()
export class HallOfFrameService {

  constructor(
    private http: Http
  ) {}

  public fetchAll(): Observable<Player[]> {

    return this.http.get(`api/players`)
      .map((res: Response) => res.json());
  }

  public fetchUser(id: string): Observable<Player> {

    return this.http.get(`api/players/${id}`)
      .map((res: Response) => res.json());
  }

}
