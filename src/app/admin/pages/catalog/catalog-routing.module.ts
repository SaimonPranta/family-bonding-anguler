import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllCategoriesComponent} from './category/all-categories/all-categories.component';
import {AddCategoryComponent} from './category/add-category/add-category.component';
import {AddSubCategoryComponent} from './sub-category/add-sub-category/add-sub-category.component';
import {AllSubCategoriesComponent} from './sub-category/all-sub-categories/all-sub-categories.component';
import {AllBrandsComponent} from './brand/all-brands/all-brands.component';
import {AddBrandComponent} from './brand/add-brand/add-brand.component';
import {AllTagsComponent} from './tag/all-tags/all-tags.component';
import {AddTagComponent} from './tag/add-tag/add-tag.component';
import {AllVariationsComponent} from './variants/all-variations/all-variations.component';
import {AddVariationsComponent} from './variants/add-variations/add-variations.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-categories'},
  {path: 'all-categories', component: AllCategoriesComponent},
  {path: 'add-category', component: AddCategoryComponent},
  {path: 'edit-category/:id', component: AddCategoryComponent},
  {path: 'all-sub-categories', component: AllSubCategoriesComponent},
  {path: 'add-sub-category', component: AddSubCategoryComponent},
  {path: 'edit-sub-category/:id', component: AddSubCategoryComponent},
  {path: 'all-brands', component: AllBrandsComponent},
  {path: 'add-brand', component: AddBrandComponent},
  {path: 'edit-brand/:id', component: AddBrandComponent},
  {path: 'all-tags', component: AllTagsComponent},
  {path: 'add-tag', component: AddTagComponent},
  {path: 'edit-tag/:id', component: AddTagComponent},
  {path: 'all-variations', component: AllVariationsComponent},
  {path: 'add-variation', component: AddVariationsComponent},
  {path: 'edit-variation/:id', component: AddVariationsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {
}
