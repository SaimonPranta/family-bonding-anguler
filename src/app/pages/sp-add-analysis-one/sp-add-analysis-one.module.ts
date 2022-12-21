import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import { SpAdAnalysisOneRoutingModule } from './sp-add-analysis-one-routing.module';
import { SpAdAnalysisOneComponent } from './sp-add-analysis-one.component';


@NgModule({
  declarations: [
    SpAdAnalysisOneComponent
  ],
  imports: [
    CommonModule,
    SpAdAnalysisOneRoutingModule,
    NgApexchartsModule
  ]
})
export class SpAdAnalysisOneModule { }
