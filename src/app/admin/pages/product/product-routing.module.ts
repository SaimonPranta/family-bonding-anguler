import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllProductsComponent} from './all-products/all-products.component';
import {AddProductComponent} from './add-product/add-product.component';
import {TestPdfComponent} from './test-pdf/test-pdf.component';
import {TestVariationsProductComponent} from './test-variations-product/test-variations-product.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-categories'},
  {path: 'all-categories', component: AllProductsComponent},
  {path: 'add-category', component: AddProductComponent},
  {path: 'edit-product/:id', component: AddProductComponent},
  {path: 'test-variation', component: TestVariationsProductComponent},
  {path: 'test-pdf', component: TestPdfComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
