import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { AlbumsService } from './services/albums.service';
import { Album } from './models/album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = '';

  constructor(private router: Router, private albumsService: AlbumsService) { }
  
  ngOnInit() {
        this.router.events.pipe(
       filter((e: any): e is RouterEvent => e instanceof NavigationEnd)
        ).subscribe((e: RouterEvent) => {
          if (e.url === '/') {
            this.title = 'Portfolio'
          } else {
            const id = e.url.replace('/album/', '');
            this.albumsService.getAlbum(id).subscribe((album: Album) => {
              this.title = e.url.replace('/album/', 'Portfolio > ');
              this.title = this.title.replace(id, album.title ?? '');
            })
          }

    })
  }
}
  