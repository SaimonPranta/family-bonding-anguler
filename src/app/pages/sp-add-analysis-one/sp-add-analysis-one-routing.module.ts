import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpAdAnalysisOneComponent } from './sp-add-analysis-one.component';

const routes: Routes = [
  {path: '', component: SpAdAnalysisOneComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpAdAnalysisOneRoutingModule { }
