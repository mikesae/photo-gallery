import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { Album } from '../models/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  selectedAlbum: Album = {};

  constructor(private albumsService: AlbumsService) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.albumsService.all()
      .subscribe(result => {
        this.albums.push(...result)
      })
  }
  
  selectAlbum(album: Album) {
    this.selectedAlbum = { ...album };
  }

  getLink(album: Album) {
    return `/album/${album.id}`;
  }
}