import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCollectionsComponent } from './album-collections.component';

describe('AlbumCollectionsComponent', () => {
  let component: AlbumCollectionsComponent;
  let fixture: ComponentFixture<AlbumCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumCollectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
