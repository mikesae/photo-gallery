import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { PhotoStorageService } from '../services/photoStorage.service';

@Component({
  selector: 'album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css'],
})
export class AlbumCardComponent implements OnInit {
  theAlbum: Album = {};
  url: string = '';

  constructor(private service: PhotoStorageService) {}

  ngOnInit(): void {
    this.setAlbumUrl();
  }

  setAlbumUrl(): void {
    this.service
      .getAlbumPhotoUrl(String(this.theAlbum.id))
      .subscribe((url: string) => {
        this.url = url;
      });
  }

  @Input() set album(value: Album) {
    if (value) {
      this.theAlbum = { ...value };
    }
  }
}
