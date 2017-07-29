import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { HallOfFrameService } from './hall-of-fame.service';
import { HomeComponent } from './home/home.component';

const providers = [
  HallOfFrameService
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlayerProfileComponent,
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class ComplexFeatureModule {

  public static forRoot(): ModuleWithProviders {

    return { ngModule: ComplexFeatureModule, providers };
  }
}
