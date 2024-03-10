import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoStorageService } from '../services/photoStorage.service';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private route: ActivatedRoute, private photoStorageService: PhotoStorageService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.photoStorageService.getAlbumPhotos(params.id).subscribe(result => {
        this.photos = [];
        this.photos.push(...result)
      }) 
    })
  }
}
