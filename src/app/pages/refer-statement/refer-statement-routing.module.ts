import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferStatementComponent } from './refer-statement.component';

const routes: Routes = [
  {path: '', component: ReferStatementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferStatementRoutingModule { }
