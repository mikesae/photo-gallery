import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumComponent } from './album/album.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxMasonryModule } from 'ngx-masonry';
import { AlbumCollectionsComponent } from './album-collections/album-collections.component';
import { AlbumCollectionComponent } from './album-collection/album-collection.component';
import { AlbumCardComponent } from './album-card/album-card.component';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    AlbumCollectionsComponent,
    AlbumCollectionComponent,
    AlbumCardComponent,
    ImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgxMasonryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
