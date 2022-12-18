import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpressionInterestTableDataComponent } from './expression-interest-table-data.component';

const routes: Routes = [
  {path: '', component: ExpressionInterestTableDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpressionInterestTableDataRoutingModule { }
