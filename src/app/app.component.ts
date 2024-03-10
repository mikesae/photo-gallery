import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { PhotoStorageService } from './services/photoStorage.service';
import { Album } from './models/album';
import { AlbumCollection } from './models/albumCollection';

type Link = {
  title: string;
  url: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  links: Link[] = [];

  constructor(
    private router: Router,
    private photoStorageService: PhotoStorageService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((e: any): e is RouterEvent => e instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        if (e.url === '/') {
          this.links = [];
          this.links.push({ title: 'Portfolio', url: '/' });
        } else if (e.url.startsWith('/collection/')) {
          const id = e.url.replace('/collection/', '');
          this.photoStorageService
            .getAlbumCollection(id)
            .subscribe((collection: AlbumCollection) => {
              this.links = [];
              this.links.push({ title: 'Portfolio', url: '/' });
              this.links.push({
                title: `> ${collection.title}` ?? ' > ',
                url: `/collection/${id}`,
              });
            });
        } else if (e.url.includes('/album/')) {
          const id = e.url.replace('/album/', '');
          this.photoStorageService.getAlbum(id).subscribe((album: Album) => {
            this.links.push({
              title: ` > ${album.title}` ?? ' > ',
              url: `/collection/${id}`,
            });
          });
        }
      });
  }
}
