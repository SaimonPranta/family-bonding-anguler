import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {NewsletterComponent} from './newsletter/newsletter.component';
import {ContactComponent} from './contact/contact.component';


@NgModule({
  declarations: [
    NewsletterComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule
  ]
})
export class ContactUsModule { }
