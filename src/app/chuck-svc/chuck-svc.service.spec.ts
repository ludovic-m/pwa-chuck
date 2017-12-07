import { TestBed, inject } from '@angular/core/testing';

import { ChuckSvcService } from './chuck-svc.service';

describe('ChuckSvcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChuckSvcService]
    });
  });

  it('should be created', inject([ChuckSvcService], (service: ChuckSvcService) => {
    expect(service).toBeTruthy();
  }));
});
