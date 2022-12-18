import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyAdminDashboardComponent } from './family-admin-dashboard.component';

const routes: Routes = [
  {path: '', component: FamilyAdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyAdminDashboardRoutingModule { }
