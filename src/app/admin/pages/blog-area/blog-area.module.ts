import { BlogList } from './../../../interfaces/core/blog-list.interface';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogAreaRoutingModule } from './blog-area-routing.module';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { AllBlogsComponent } from './blog/all-blogs/all-blogs.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import {QuillModule} from 'ngx-quill';


@NgModule({
  declarations: [
    AddBlogComponent,
    AllBlogsComponent,
  ],
  imports: [
    CommonModule,
    BlogAreaRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    QuillModule
  ]
})
export class BlogAreaModule { }
