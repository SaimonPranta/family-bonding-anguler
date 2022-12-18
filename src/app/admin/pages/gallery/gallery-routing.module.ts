import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllFoldersComponent} from './folder/all-folders/all-folders.component';
import {AllImagesComponent} from './image/all-images/all-images.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-folders'},
  {path: 'all-folders', component: AllFoldersComponent},
  {path: 'all-images', component: AllImagesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {
}
