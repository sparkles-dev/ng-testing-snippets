import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ComplexFeatureModule } from './complex-feature/complex-feature.module';
import { AppComponent } from './app.component';
import { FeatureService } from './http/http-feature.service';
import { NumberComponent } from './component/number.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ComplexFeatureModule.forRoot()
  ],
  providers: [
    FeatureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
