import { Component, OnInit } from '@angular/core';
import { AlbumCollection } from '../models/AlbumCollection';
import { PhotoStorageService } from '../services/photoStorage.service';

@Component({
  selector: 'app-album-collections',
  templateUrl: './album-collections.component.html',
  styleUrls: ['./album-collections.component.css']
})
export class AlbumCollectionsComponent implements OnInit {
  albumCollections: AlbumCollection[] = [];

  constructor(private photoStorageService: PhotoStorageService) {}

  ngOnInit(): void {
    this.getCollections();
  }

  
  getCollections() {
    this.photoStorageService.getAlbumCollections()
      .subscribe(result => {
        this.albumCollections.push(...result)
      })
  }
  
  getLink(albumCollection: AlbumCollection) {
    return `/collection/${albumCollection.id}`;
  }

}
