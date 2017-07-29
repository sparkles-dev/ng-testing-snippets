import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerProfileComponent } from './player-profile.component';

describe('PlayerProfileComponent', () => {
  let component: PlayerProfileComponent;
  let fixture: ComponentFixture<PlayerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProfileComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should display the person's name in a h4`, () => {
    component.who = {
      id: 'tony',
      name: 'Tony Parker'
    };
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h4').innerText)
      .toBe('Tony Parker');
  });
});
