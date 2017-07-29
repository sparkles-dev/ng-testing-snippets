import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from '../entity.interfaces';

/**
 * A presentational component showing a player's profile.
 */
@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerProfileComponent {

  @Input() public who: Player;

}
