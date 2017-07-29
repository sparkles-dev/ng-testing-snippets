import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { HallOfFrameService } from '../hall-of-fame.service';
import { Player } from '../entity.interfaces';

export function GET(path: string) {
  const args = arguments;

  return function (target, property) {
    console.log(args);
    console.log(arguments);
  };
}

@Component({
  selector: 'app-home',
  template: `
<h2>Pick your favourite!</h2>
<ul>
  <li *ngFor="let who of (list$ | async)">
    <a [id]="'link_' + who.id" href="javascript: void(0);" (click)="fetch(who.id)">{{ who.name }}</a>
  </li>
</ul>

<app-player-profile *ngIf="selected" [who]="selected">
</app-player-profile>
`
})
export class HomeComponent implements OnInit, OnDestroy {

  public selected: Player;

  @GET('/foo/bar')
  public list$: Observable<Player[]>;

  private subscription: Subscription;

  constructor(
    private userInfo: HallOfFrameService
  ) {}

  ngOnInit() {
    this.list$ = this.userInfo.fetchAll();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetch(who: string) {
    this.subscription = this.userInfo.fetchUser(who)
      .subscribe((res: Player) => {
        this.selected = res;
      });
  }

}
