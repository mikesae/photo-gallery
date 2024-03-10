import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCollectionComponent } from './album-collection.component';

describe('AlbumCollectionComponent', () => {
  let component: AlbumCollectionComponent;
  let fixture: ComponentFixture<AlbumCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
