import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopGreatGrandFatherNameWithSurnameComponent } from './top-great-grand-father-name-with-surname.component';

const routes: Routes = [
  { path: '', component: TopGreatGrandFatherNameWithSurnameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopGreatGrandFatherNameWithSurnameRoutingModule {}
