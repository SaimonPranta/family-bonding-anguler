import { FamilyMemberBasicDataComponent } from './family-member-basic-data.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: FamilyMemberBasicDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyMemberBasicDataRoutingModule { }
