import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxMasonryComponent } from 'ngx-masonry';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; // Import MatDialog module
import { Photo } from '../models/photo';
import { PhotoStorageService } from '../services/photoStorage.service';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';
import { firstValueFrom } from 'rxjs';

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

  async onImageClick(photo: Photo) {
    const photoUrl = await this.getLargePhotoUrl(photo);
    this.matDialog.open(PhotoModalComponent, {
      data: {
        photoUrl
      },
    });
  }

  private async getLargePhotoUrl(photo: Photo) {
    const id = photo.id?.toString();

    if (id) {
      return await firstValueFrom(this.photoStorageService.largePhotoUrl(id));
    }
    return null;
  }
}
