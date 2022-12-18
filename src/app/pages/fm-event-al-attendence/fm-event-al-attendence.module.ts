import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FmEventAlAttendenceRoutingModule } from './fm-event-al-attendence-routing.module';
import { FmEventAlAttendenceComponent } from './fm-event-al-attendence.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    FmEventAlAttendenceComponent
  ],
  imports: [
    CommonModule,
    FmEventAlAttendenceRoutingModule,
    MaterialModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  exports:[
    FmEventAlAttendenceComponent
  ]
})
export class FmEventAlAttendenceModule { }
