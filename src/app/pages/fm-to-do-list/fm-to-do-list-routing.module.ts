import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FmToDoListComponent } from './fm-to-do-list.component';

const routes: Routes = [
  {path: '', component: FmToDoListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FmToDoListRoutingModule { }
