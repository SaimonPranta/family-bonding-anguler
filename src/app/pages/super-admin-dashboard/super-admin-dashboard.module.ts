import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { SuperAdminDashboardRoutingModule } from './super-admin-dashboard-routing.module';
import { SuperAdminDashboardComponent } from './super-admin-dashboard.component';


@NgModule({
  declarations: [
    SuperAdminDashboardComponent
  ],
  imports: [
    CommonModule,
    SuperAdminDashboardRoutingModule,
    MaterialModule
  ]
})
export class SuperAdminDashboardModule { }
