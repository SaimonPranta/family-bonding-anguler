import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegesterBnComponent } from './regester-bn.component';

const routes: Routes = [
  {path: '', component: RegesterBnComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegesterBnRoutingModule { }
