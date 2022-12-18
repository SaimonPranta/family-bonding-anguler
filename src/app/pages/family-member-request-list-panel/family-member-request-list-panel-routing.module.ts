import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyMemberRequestListPanelComponent } from './family-member-request-list-panel.component';

const routes: Routes = [
  {path: '', component: FamilyMemberRequestListPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyMemberRequestListPanelRoutingModule { }
