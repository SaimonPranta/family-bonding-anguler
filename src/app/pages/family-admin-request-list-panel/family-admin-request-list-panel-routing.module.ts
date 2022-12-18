import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyAdminRequestListPanelComponent } from './family-admin-request-list-panel.component';

const routes: Routes = [
  {path: '', component: FamilyAdminRequestListPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyAdminRequestListPanelRoutingModule { }
