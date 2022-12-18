import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FMSurveyReqRoutingModule } from './fm-survey-req-routing.module';
import { FMSurveyReqComponent } from '../fm-survey-req/fm-survey-req.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    FMSurveyReqComponent
  ],
  imports: [
    CommonModule,
    FMSurveyReqRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule
  ]
})
export class FMSurveyReqModule { }
