import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DownloadJsonDialogComponent} from './download-json-dialog.component';
import {MaterialModule} from '../../../material/material.module';
import {SharedModule} from '../../shared.module';


@NgModule({
  declarations: [
    DownloadJsonDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    DownloadJsonDialogComponent
  ]
})
export class DownloadJsonDialogModule {
}
