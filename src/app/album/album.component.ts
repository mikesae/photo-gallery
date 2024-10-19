import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog module
import { ActivatedRoute } from '@angular/router';
import { NgxMasonryComponent } from 'ngx-masonry';
import { Photo } from '../models/photo';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';
import { PhotoStorageService } from '../services/photoStorage.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, AfterViewInit {
  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

  photos: Photo[] = [];

  constructor(private route: ActivatedRoute, private photoStorageService: PhotoStorageService, private matDialog: MatDialog) { } // Inject MatDialog module

  ngAfterViewInit(): void {
    this.updateLayout();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.photoStorageService.getAlbumPhotos(params.id).subscribe(result => {
        this.photos = [];
        this.photos.push(...result);
      })
    })
  }
  updateLayout(): void {
    if (this.masonry) {
      this.masonry.layout();
    }
  }

  onImageClick(photo: Photo) {
    this.matDialog.open(PhotoModalComponent, {
      data: {
        photos: this.photos,
        idxSelectedPhoto: this.photos.indexOf(photo)
      },
    });
  }
}
