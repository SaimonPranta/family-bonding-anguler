import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyMemberBasicDataRoutingModule } from './family-member-basic-data-routing.module';
import { FamilyMemberBasicDataComponent } from './family-member-basic-data.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    FamilyMemberBasicDataComponent
  ],
  imports: [
    CommonModule,
    FamilyMemberBasicDataRoutingModule,
    MaterialModule
  ]
})
export class FamilyMemberBasicDataModule { }
