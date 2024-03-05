import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Album } from '../models/album';

const BASE_URL = 'https://api.flickr.com/services/rest'
const GET_LIST_METHOD = 'flickr.photosets.getList'
const USER_ID = import.meta.env['NG_APP_FLICKR_USER_ID']
const API_KEY = import.meta.env['NG_APP_FLICKR_API_KEY']
  
@Injectable({
  providedIn: 'root'
})

export class AlbumsService {
  method = 'albums'
  headers: any;
  
  constructor(private http: HttpClient) { 
  }

  all(): Observable<Album[]> {
    return this.http
      .get(`${this.getUrl()}&method=${GET_LIST_METHOD}`)
      .pipe(
        map((response: any) => {
          const photosets = response.photosets.photoset
          return photosets.map((photoset: any) => ({
            title: photoset.title._content,
            description: photoset.description._content,
            id: photoset.id,
            photoCount: photoset.count_photos
          }))
        }))
  }

  find(id:string) {
    return this.http.get(this.getUrlWithID(id))
  }

  private getUrl() {
    return `${BASE_URL}?user_id=${USER_ID}&api_key=${API_KEY}&format=json&nojsoncallback=1`
  }

  private getUrlWithID(id:string) {
    return `${this.getUrl()}/${id}`;
  }

}