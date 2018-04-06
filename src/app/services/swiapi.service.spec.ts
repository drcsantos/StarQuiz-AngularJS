import { TestBed, inject } from '@angular/core/testing';

import { SwiapiService } from './swiapi.service';

describe('SwimageapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwiapiService]
    });
  });

  it('should be created', inject([SwiapiService], (service: SwiapiService) => {
    expect(service).toBeTruthy();
  }));
});
