import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * A very dumb replacement for `<input type="number">`.
 *
 * Usage: `<my-number [value]="99" (onValueChanges)="changed($event)></my-number>
 */
@Component({
  selector: 'my-number',
  template: '<input type="text" [value]="value" (change)="onChange($event.target.value)">'
})
export class NumberComponent {

  /** Sets the current value of the input. */
  @Input()
  public value: number;

  /** Notifies when the value of the input changes. */
  @Output()
  public onValueChanges: EventEmitter<number> = new EventEmitter<number>();

  public onChange(value: any) {
    const numValue: number = Number.parseInt(value);
    this.onValueChanges.emit(numValue);
    this.value = numValue;
  }
}
