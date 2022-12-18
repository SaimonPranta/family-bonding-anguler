import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpressionInterestTableDataRoutingModule } from './expression-interest-table-data-routing.module';
import { ExpressionInterestTableDataComponent } from '../expression-interest-table-data/expression-interest-table-data.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    ExpressionInterestTableDataComponent
  ],
  imports: [
    CommonModule,
    ExpressionInterestTableDataRoutingModule,
    MaterialModule
  ]
})
export class ExpressionInterestTableDataModule { }
