import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoStorageService } from '../services/photoStorage.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  imgSrc: string = '';

  constructor(private route: ActivatedRoute, private photoStorageService: PhotoStorageService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getLargePhotoUrl(id);
    });
  }

  getLargePhotoUrl(id: string) {
    this.photoStorageService.largePhotoUrl(id).subscribe(url => {
      this.imgSrc = url;
    });
  }
}
