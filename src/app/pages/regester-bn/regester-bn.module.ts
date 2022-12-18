import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegesterBnRoutingModule } from './regester-bn-routing.module';
import { RegesterBnComponent } from './regester-bn.component';


@NgModule({
  declarations: [
    RegesterBnComponent
  ],
  imports: [
    CommonModule,
    RegesterBnRoutingModule
  ]
})
export class RegesterBnModule { }
