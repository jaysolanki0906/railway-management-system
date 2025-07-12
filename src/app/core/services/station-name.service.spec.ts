import { TestBed } from '@angular/core/testing';

import { StationNameService } from './station-name.service';

describe('StationNameService', () => {
  let service: StationNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
