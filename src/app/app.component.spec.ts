import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AppComponent } from './app.component';
import { ComplexFeatureModule } from './complex-feature/complex-feature.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComplexFeatureModule.forRoot(),
        HttpModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        MockBackend,
        { provide: XHRBackend, useExisting: MockBackend }
      ]
    }).compileComponents();
  }));

  beforeEach(async(inject([MockBackend], (mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((c: MockConnection) => {
        // 2. expect the test client to make a well-known request
        expect(c.request.url).toBe('api/players');

        // 3. respond to test client with a well-known response
        c.mockRespond(new Response(new ResponseOptions({
          body: [{id: 'tony', name: 'Tony Parker'}]
        })));
    });
  })));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
