import { TestBed, inject } from '@angular/core/testing';

import { PushSvcService } from './push-svc.service';

describe('PushSvcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PushSvcService]
    });
  });

  it('should be created', inject([PushSvcService], (service: PushSvcService) => {
    expect(service).toBeTruthy();
  }));
});
