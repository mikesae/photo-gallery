import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AlbumCollectionsComponent } from './album-collections/album-collections.component';
import { AlbumComponent } from './album/album.component';
import { AlbumCollectionComponent } from './album-collection/album-collection.component';

const routes: Routes = [
  { path: '', component: AlbumCollectionsComponent },
  { path: 'collection/:id', component: AlbumCollectionComponent},
  { path: 'album/:id', component: AlbumComponent },
  { path: '**', component: AlbumCollectionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

