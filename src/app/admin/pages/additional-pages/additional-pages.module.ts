import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdditionalPagesRoutingModule} from './additional-pages-routing.module';
import {PageListComponent} from './page-list/page-list.component';
import {MaterialModule} from '../../../material/material.module';
import {ViewPageComponent} from './page-list/view-page/view-page.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {PipesModule} from '../../../shared/pipes/pipes.module';


@NgModule({
  declarations: [
    PageListComponent,
    ViewPageComponent
  ],
  imports: [
    CommonModule,
    AdditionalPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    QuillModule,
    PipesModule
  ]
})
export class AdditionalPagesModule {
}
