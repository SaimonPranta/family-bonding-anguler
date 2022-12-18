import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyAdminBasicDataComponent } from './family-admin-basic-data.component';

const routes: Routes = [
  {path: '', component: FamilyAdminBasicDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyAdminBasicDataRoutingModule { }
