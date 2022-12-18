import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GalleryRoutingModule} from './gallery-routing.module';
import {AllFoldersComponent} from './folder/all-folders/all-folders.component';
import {AddFolderComponent} from './folder/add-folder/add-folder.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import { AllImagesComponent } from './image/all-images/all-images.component';
import {UploadImageComponent} from './image/upload-image/upload-image.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {EditImageInfoComponent} from './image/edit-image-info/edit-image-info.component';
import {SwiperModule} from 'swiper/angular';
import {AllImagesDialogComponent} from './image/all-images-dialog/all-images-dialog.component';


@NgModule({
  declarations: [
    AllFoldersComponent,
    AddFolderComponent,
    AllImagesComponent,
    UploadImageComponent,
    EditImageInfoComponent,
    AllImagesDialogComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    NgxDropzoneModule,
    SwiperModule
  ]
})
export class GalleryModule {
}
