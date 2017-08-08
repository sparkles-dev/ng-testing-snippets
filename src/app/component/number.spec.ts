import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { NumberModule } from './number.module';
import { NumberComponent } from './number.component';

describe(`NumberComponent + NumberModule (integration)`, () => {

  @Component({})
  class NumberTestingComponent {

    @ViewChild(NumberComponent)
    public number: NumberComponent;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NumberModule ],
      declarations: [ NumberTestingComponent ]
    });
  }));

  it(`should do something`, async(() => {
    const fixture = TestBed.overrideTemplate(
        NumberTestingComponent,
        `<my-number [value]="20"></my-number>`)
        .createComponent(NumberTestingComponent)

      const myNumber = fixture.debugElement.children.find(node => node.name === 'my-number');
      expect(myNumber).toBeTruthy();

      expect(fixture.componentInstance.number.value).toBe(20);
  }));

});
