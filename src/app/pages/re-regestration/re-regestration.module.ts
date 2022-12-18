import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { ReRegestrationRoutingModule } from './re-regestration-routing.module';
import { ReRegestrationComponent } from './re-regestration.component';


@NgModule({
  declarations: [
    ReRegestrationComponent
  ],
  imports: [
    CommonModule,
    ReRegestrationRoutingModule,
    MatTabsModule
  ]
})
export class ReRegestrationModule { }
