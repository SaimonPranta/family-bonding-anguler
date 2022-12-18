import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCategoriesComponent } from './category/all-categories/all-categories.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {AddBrandComponent} from './brand/add-brand/add-brand.component';
import {AllBrandsComponent} from './brand/all-brands/all-brands.component';
import {CatalogRoutingModule} from './catalog-routing.module';
import {AllSubCategoriesComponent} from './sub-category/all-sub-categories/all-sub-categories.component';
import {AddSubCategoryComponent} from './sub-category/add-sub-category/add-sub-category.component';
import {AllTagsComponent} from './tag/all-tags/all-tags.component';
import {AddTagComponent} from './tag/add-tag/add-tag.component';
import { AllVariationsComponent } from './variants/all-variations/all-variations.component';
import { AddVariationsComponent } from './variants/add-variations/add-variations.component';


@NgModule({
  declarations: [
    AllCategoriesComponent,
    AddCategoryComponent,
    AllBrandsComponent,
    AddBrandComponent,
    AllCategoriesComponent,
    AddCategoryComponent,
    AllSubCategoriesComponent,
    AddSubCategoryComponent,
    AllTagsComponent,
    AddTagComponent,
    AllVariationsComponent,
    AddVariationsComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule
  ]
})
export class CatalogModule { }
