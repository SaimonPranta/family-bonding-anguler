import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AllProductsComponent } from './all-products/all-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import { TestPdfComponent } from './test-pdf/test-pdf.component';
import { TestVariationsProductComponent } from './test-variations-product/test-variations-product.component';


@NgModule({
  declarations: [
    AllProductsComponent,
    AddProductComponent,
    TestPdfComponent,
    TestVariationsProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule
  ]
})
export class ProductModule { }
