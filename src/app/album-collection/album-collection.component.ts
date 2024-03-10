import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { PhotoStorageService } from '../services/photoStorage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-collection',
  templateUrl: './album-collection.component.html',
  styleUrls: ['./album-collection.component.css']
})
export class AlbumCollectionComponent  implements OnInit {
  albums: Album[] = [];

  constructor(private route: ActivatedRoute, private photoStorageService: PhotoStorageService) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.route.params.subscribe((params:any) => {
      this.photoStorageService.getAlbumsInCollection(params.id).subscribe(result => {
        this.albums = [];
        this.albums.push(...result)
      }) 
    })
  }
  
  getLink(album: Album) {
    return `/album/${album.id}`;
  }
}
