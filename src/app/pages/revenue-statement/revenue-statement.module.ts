import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenueStatementRoutingModule } from './revenue-statement-routing.module';
import { RevenueStatementComponent } from './revenue-statement.component';


@NgModule({
  declarations: [
    RevenueStatementComponent
  ],
  imports: [
    CommonModule,
    RevenueStatementRoutingModule
  ]
})
export class RevenueStatementModule { }
