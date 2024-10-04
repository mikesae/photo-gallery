import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import the Router module
import { PhotoStorageService } from '../services/photoStorage.service';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private route: ActivatedRoute, private photoStorageService: PhotoStorageService, private router: Router) { 
    this.router = router;
  } 
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.photoStorageService.getAlbumPhotos(params.id).subscribe(result => {
        this.photos = [];
        this.photos.push(...result)
      }) 
    })
  }

  handleImageClick(photo: any) {
      this.router.navigate(['/image', photo.id]); // Use the router property instead of 'router'
      console.log('Clicked on photo:', photo);
  }
}
