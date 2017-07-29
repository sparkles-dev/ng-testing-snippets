import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NumberComponent } from './number.component';

describe('NumberComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberComponent ],
    }).compileComponents();
  }));

  describe(`value`, () => {
    it(`shows the value in an <input>`, () => {
      // 1. Create an instance of `NumberComponent`
      const fixture = TestBed.createComponent(NumberComponent);
      // 2. Set its `@Input() value: number` property
      fixture.componentInstance.value = 12;
      // 3. Render the component to DOM
      fixture.changeDetectorRef.detectChanges();
      // 4. Verify that rendering produced the expected result
      expect(fixture.debugElement.nativeElement.querySelector('input').value).toEqual('12');
    });
  });

  describe(`onValueChanges`, () => {
    it(`emits the selected value`, fakeAsync(() => {
      // 1. Create an instance of `NumberComponent`
      const fixture = TestBed.createComponent(NumberComponent);
      const component = fixture.componentInstance;
      // 2. Subscribe to its `@Output() onValueChanges: EventEmitter<number>`
      component.onValueChanges.subscribe((value: number) => {
        // 4. Verify that the event has expected payload
        expect(value).toBe(7);
      });
      // 3a. Manipulate the component's DOM tree and...
      const input = fixture.nativeElement.querySelector('input');
      input.value = 7;
      // 3b. ..trigger a faked user-input event
      input.dispatchEvent(new Event('change'));
      tick(); // XX: make sure to call `tick()` for event processing
    }));
  });
});
