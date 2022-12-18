import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyMemberRequestListPanelRoutingModule } from './family-member-request-list-panel-routing.module';
import { FamilyMemberRequestListPanelComponent } from './family-member-request-list-panel.component';


@NgModule({
  declarations: [
    FamilyMemberRequestListPanelComponent
  ],
  imports: [
    CommonModule,
    FamilyMemberRequestListPanelRoutingModule
  ]
})
export class FamilyMemberRequestListPanelModule { }
