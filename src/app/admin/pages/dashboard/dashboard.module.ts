import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GraphComponent} from './graph/graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DonutComponent } from './donut/donut.component';
import { LineComponent } from './line/line.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


const routes: Routes = [
  {path: '', component: DashboardComponent}
];


@NgModule({
  declarations: [
    DashboardComponent,
    GraphComponent,
    DonutComponent,
    LineComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    NgApexchartsModule,
    PipesModule
  ]
})
export class DashboardModule {
}
