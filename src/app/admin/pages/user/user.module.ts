import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {GalleryModule} from '../gallery/gallery.module';
import {AllUserComponent} from './all-user/all-user.component';
import {AddUserComponent} from './add-user/add-user.component';


@NgModule({
  declarations: [
    AllUserComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    GalleryModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule
  ]
})
export class UserModule { }
