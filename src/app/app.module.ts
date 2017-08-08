import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ComplexFeatureModule } from './complex-feature/complex-feature.module';
import { AppComponent } from './app.component';
import { FeatureService } from './http/http-feature.service';
import { NumberModule } from './component/number.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ComplexFeatureModule.forRoot(),
    NumberModule
  ],
  providers: [
    FeatureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
