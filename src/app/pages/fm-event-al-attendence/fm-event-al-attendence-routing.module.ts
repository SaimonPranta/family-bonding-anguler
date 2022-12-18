import { FmEventAlAttendenceComponent } from './fm-event-al-attendence.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",component:FmEventAlAttendenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FmEventAlAttendenceRoutingModule { }
