import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenueStatementComponent } from './revenue-statement.component';

const routes: Routes = [
  {path: '', component: RevenueStatementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevenueStatementRoutingModule { }
