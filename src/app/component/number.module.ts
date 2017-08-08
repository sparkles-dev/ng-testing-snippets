import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberComponent } from './number.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ NumberComponent ],
  exports: [ NumberComponent ]
})
export class NumberModule {}
