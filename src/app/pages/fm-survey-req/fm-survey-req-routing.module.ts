import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FMSurveyReqComponent } from './fm-survey-req.component';

const routes: Routes = [{
  path:'',
  component:FMSurveyReqComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FMSurveyReqRoutingModule { }
