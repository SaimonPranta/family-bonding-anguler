import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { RegestrationRoutingModule } from './regestration-routing.module';
import { RegestrationComponent } from './regestration.component';


@NgModule({
  declarations: [
    RegestrationComponent
  ],
  imports: [
    CommonModule,
    RegestrationRoutingModule,
    MatTabsModule
  ]
})
export class RegestrationModule { }
