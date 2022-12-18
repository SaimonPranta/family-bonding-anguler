import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyAdminDashboardRoutingModule } from './family-admin-dashboard-routing.module';
import { FamilyAdminDashboardComponent } from './family-admin-dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    FamilyAdminDashboardComponent
  ],
  imports: [
    CommonModule,
    FamilyAdminDashboardRoutingModule,
    MaterialModule
  ]
})
export class FamilyAdminDashboardModule { }
