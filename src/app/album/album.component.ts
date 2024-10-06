import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxMasonryComponent } from 'ngx-masonry';
import { Photo } from '../models/photo';
import { PhotoStorageService } from '../services/photoStorage.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, AfterViewInit {
  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

  photos: Photo[] = [];
  selectedPhoto: Photo | null = null;

  constructor(private route: ActivatedRoute, private photoStorageService: PhotoStorageService) { }

  ngAfterViewInit(): void {
    this.updateLayout();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.photoStorageService.getAlbumPhotos(params.id).subscribe(result => {
        this.photos = [];
        this.photos.push(...result);
        if (this.photos.length > 0) {
          this.selectPhoto(this.photos[0]);
        }
      })
    })
  }
  updateLayout(): void {
    if (this.masonry) {
      this.masonry.layout();
    }
  }

  onImageClick(photo: Photo): void {
    this.selectPhoto(photo);
  }

  private selectPhoto(photo: Photo) {
    this.selectedPhoto = { ...photo };
    const id = photo.id?.toString();

    if (id) {
      this.photoStorageService.largePhotoUrl(id!).subscribe(url => {
        if (this.selectedPhoto) {
          this.selectedPhoto.url = url;
          this.updateLayout();
        }
      });
    }
  }
}
