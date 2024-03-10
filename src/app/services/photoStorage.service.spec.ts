import { TestBed } from '@angular/core/testing';

import { PhotoStorageService } from './albums.service';

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
