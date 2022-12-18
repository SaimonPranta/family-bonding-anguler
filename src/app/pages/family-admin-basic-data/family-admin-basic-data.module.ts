import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FamilyAdminBasicDataRoutingModule } from './family-admin-basic-data-routing.module';
import { FamilyAdminBasicDataComponent } from './family-admin-basic-data.component';


@NgModule({
  declarations: [
    FamilyAdminBasicDataComponent
  ],
  imports: [
    CommonModule,
    FamilyAdminBasicDataRoutingModule,
    MaterialModule
  ]
})
export class FamilyAdminBasicDataModule { }
