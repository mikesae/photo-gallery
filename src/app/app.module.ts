import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
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
import { PhotoModalComponent } from './photo-modal/photo-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import * as Hammer from 'hammerjs';

export class HammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    AlbumCollectionsComponent,
    AlbumCollectionComponent,
    AlbumCardComponent,
    PhotoModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule,
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
    MatDialogModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
