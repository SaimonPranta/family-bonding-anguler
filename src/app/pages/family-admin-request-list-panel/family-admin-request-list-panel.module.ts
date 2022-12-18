import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyAdminRequestListPanelRoutingModule } from './family-admin-request-list-panel-routing.module';
import { FamilyAdminRequestListPanelComponent } from './family-admin-request-list-panel.component';


@NgModule({
  declarations: [
    FamilyAdminRequestListPanelComponent
  ],
  imports: [
    CommonModule,
    FamilyAdminRequestListPanelRoutingModule
  ]
})
export class FamilyAdminRequestListPanelModule { }
