import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FmToDoListRoutingModule } from './fm-to-do-list-routing.module';
import { FmToDoListComponent } from './fm-to-do-list.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    FmToDoListComponent
  ],
  imports: [
    CommonModule,
    FmToDoListRoutingModule,
    MaterialModule,
  ]
})
export class FmToDoListModule { }
