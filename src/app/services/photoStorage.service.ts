import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Album } from '../models/album';
import { Photo } from '../models/photo';
import { AlbumCollection } from '../models/albumCollection';

const BASE_URL = 'https://api.flickr.com/services/rest';
const GET_LIST_METHOD = 'flickr.photosets.getList';
const GET_PHOTOS_METHOD = 'flickr.photosets.getPhotos';
const GET_COLLECTIONS_METHOD = 'flickr.collections.getTree';
const GET_PHOTO_INFO = 'flickr.photos.getInfo';
const USER_ID = import.meta.env['NG_APP_FLICKR_USER_ID'];
const API_KEY = import.meta.env['NG_APP_FLICKR_API_KEY'];

@Injectable({
  providedIn: 'root',
})
export class PhotoStorageService {
  method = 'albums';
  headers: any;

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get(`${this.getUrl()}&method=${GET_LIST_METHOD}`).pipe(
      map((response: any) => {
        const photosets = response.photosets.photoset;
        return photosets.map((photoset: any) => ({
          title: photoset.title._content,
          description: photoset.description._content,
          id: photoset.id,
          photoCount: photoset.count_photos,
        }));
      })
    );
  }

  private photoUrl(photo: any): string {
    // Sizes from https://www.flickr.com/services/api/misc.urls.html.
    // Match these with .grid-item width.
    // n - small, longest edge of 320px
    return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`;
  }


  largePhotoUrl(photoId: string): Observable<string> {
    return this.http
      .get(`${this.getUrl()}&method=${GET_PHOTO_INFO}&photo_id=${photoId}`)
      .pipe(
        map((response: any) => {
          const photo = response.photo;
          return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
        })
      );
  }

  getAlbumPhotos(id: string): Observable<Photo[]> {
    const extras = 'description, date_taken';
    return this.http
      .get(`${this.getUrlWithID(id)}&method=${GET_PHOTOS_METHOD}&extras=${extras}`)
      .pipe(
        map((response: any) => {
          const photos = response.photoset.photo;
          return photos.map((photo: any) => ({
            id: photo.id,
            title: photo.title,
            url: this.photoUrl(photo),
            description: photo.description?._content ?? '',
            dateTaken: photo.datetaken ?? '',
          }));
        })
      );
  }

  getAlbumPhotoUrl(id: string): Observable<string> {
    return this.http
      .get(`${this.getUrlWithID(id)}&method=${GET_PHOTOS_METHOD}`)
      .pipe(
        map((response: any) => {
          const firstPhoto = response.photoset.photo[0];
          return this.photoUrl(firstPhoto);
        })
      );
  }

  getAlbum(id: string): Observable<Album> {
    return this.http
      .get(`${this.getUrlWithID(id)}&method=${GET_PHOTOS_METHOD}`)
      .pipe(
        map((response: any) => {
          return {
            id: Number(id),
            title: response.photoset.title,
          };
        })
      );
  }

  getAlbumCollections(): Observable<AlbumCollection[]> {
    return this.http
      .get(`${this.getUrl()}&method=${GET_COLLECTIONS_METHOD}`)
      .pipe(
        map((response: any) => {
          const collections = response.collections.collection;
          return collections.map((collection: any) => ({
            id: collection.id,
            title: collection.title,
            description: collection.description,
          }));
        })
      );
  }

  getAlbumCollection(collectionId: string): Observable<AlbumCollection> {
    return this.http
      .get(
        `${this.getUrl()}&collection_id=${collectionId}&method=${GET_COLLECTIONS_METHOD}`
      )
      .pipe(
        map((response: any) => {
          const collection = response.collections.collection[0];
          return {
            id: collection.id,
            title: collection.title,
            description: collection.description,
          };
        })
      );
  }

  getAlbumsInCollection(collectionId: string): Observable<Album[]> {
    return this.http
      .get(
        `${this.getUrl()}&collection_id=${collectionId}&method=${GET_COLLECTIONS_METHOD}`
      )
      .pipe(
        map((response: any) => {
          const albums = response.collections.collection[0].set;
          return albums.map((album: any) => ({
            id: album.id,
            title: album.title,
            description: album.description,
          }));
        })
      );
  }

  private getUrl() {
    return `${BASE_URL}?user_id=${USER_ID}&api_key=${API_KEY}&format=json&nojsoncallback=1`;
  }

  private getUrlWithID(id: string) {
    return `${this.getUrl()}&photoset_id=${id}`;
  }
}
