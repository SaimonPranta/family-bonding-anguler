import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminDashboardComponent } from './super-admin-dashboard.component';

const routes: Routes = [
  {path: '', component: SuperAdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminDashboardRoutingModule { }
