import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferStatementRoutingModule } from './refer-statement-routing.module';
import { ReferStatementComponent } from './refer-statement.component';


@NgModule({
  declarations: [
    ReferStatementComponent
  ],
  imports: [
    CommonModule,
    ReferStatementRoutingModule
  ]
})
export class ReferStatementModule { }
