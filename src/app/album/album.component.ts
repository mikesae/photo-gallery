import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../services/albums.service';
import { Photo } from '../models/Photo';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private route: ActivatedRoute, private albumsService: AlbumsService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.albumsService.find(params.id).subscribe(result => {
        this.photos = [];
        this.photos.push(...result)
      }) 
    })
  }
}
