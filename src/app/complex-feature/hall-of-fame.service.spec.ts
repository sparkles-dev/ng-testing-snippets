import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { HallOfFrameService } from './hall-of-fame.service';

describe('HallOfFameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ HallOfFrameService ]
    });
  });

  it('should be created', inject([HallOfFrameService], (service: HallOfFrameService) => {
    expect(service).toBeTruthy();
  }));
});
