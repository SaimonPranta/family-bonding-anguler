import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopGreatGrandFatherNameWithSurnameRoutingModule } from './top-great-grand-father-name-with-surname-routing.module';
import { TopGreatGrandFatherNameWithSurnameComponent } from './top-great-grand-father-name-with-surname.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [TopGreatGrandFatherNameWithSurnameComponent],
  imports: [
    CommonModule,
    TopGreatGrandFatherNameWithSurnameRoutingModule,
    MaterialModule,
  ],
})
export class TopGreatGrandFatherNameWithSurnameModule {}
