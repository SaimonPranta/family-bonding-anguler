import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsLetterRoutingModule } from './news-letter-routing.module';
import { NewsLetterComponent } from './news-letter.component';
import {MaterialModule} from '../../material/material.module';


@NgModule({
  declarations: [
    NewsLetterComponent
  ],
  imports: [
    CommonModule,
    NewsLetterRoutingModule,
    MaterialModule
  ]
})
export class NewsLetterModule { }
