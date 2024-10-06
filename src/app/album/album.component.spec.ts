import { AlbumComponent } from './album.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PhotoStorageService } from '../services/photoStorage.service';
import { Photo } from '../models/photo';

describe('PhotosComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let mockActivatedRoute: any;
  let mockPhotoStorageService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: 1 })
    };

    mockPhotoStorageService = jasmine.createSpyObj('PhotoStorageService', ['getAlbumPhotos']);

    await TestBed.configureTestingModule({
      declarations: [AlbumComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PhotoStorageService, useValue: mockPhotoStorageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch album photos on initialization', () => {
    const mockPhotos: Photo[] = [
      { id: 1, url: 'photo1.jpg' },
      { id: 2, url: 'photo2.jpg' },
      { id: 3, url: 'photo3.jpg' }
    ];
    mockPhotoStorageService.getAlbumPhotos.and.returnValue(of(mockPhotos));

    fixture.detectChanges();

    expect(mockPhotoStorageService.getAlbumPhotos).toHaveBeenCalledWith(1);
    expect(component.photos).toEqual(mockPhotos);
    expect(component.selectedPhotoId).toEqual(1);
  });

  it('should update layout after view initialization', () => {
    spyOn(component, 'updateLayout');

    fixture.detectChanges();

    expect(component.updateLayout).toHaveBeenCalled();
  });

  it('should reorder photos when a photo is clicked', () => {
    const mockPhotos: Photo[] = [
      { id: 1, url: 'photo1.jpg' },
      { id: 2, url: 'photo2.jpg' },
      { id: 3, url: 'photo3.jpg' }
    ];
    component.photos = mockPhotos;

    const photoToReorder: Photo = { id: 2, url: 'photo2.jpg' };
    component.reorderPhotos(photoToReorder);

    expect(component.photos).toEqual([
      { id: 2, url: 'photo2.jpg' },
      { id: 1, url: 'photo1.jpg' },
      { id: 3, url: 'photo3.jpg' }
    ]);
  });
});
