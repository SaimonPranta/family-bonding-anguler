import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReRegestrationComponent } from './re-regestration.component';

const routes: Routes = [
  {path: '', component: ReRegestrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReRegestrationRoutingModule { }
