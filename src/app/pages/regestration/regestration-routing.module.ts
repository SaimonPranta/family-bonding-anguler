import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegestrationComponent } from './regestration.component';

const routes: Routes = [
  {path: '', component: RegestrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegestrationRoutingModule { }
