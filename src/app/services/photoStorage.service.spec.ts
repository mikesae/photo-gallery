import { TestBed } from '@angular/core/testing';

import { PhotoStorageService } from './photoStorage.service';

describe('AlbumsService', () => {
  let service: PhotoStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
