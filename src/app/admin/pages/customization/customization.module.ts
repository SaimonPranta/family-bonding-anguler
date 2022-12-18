import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomizationRoutingModule } from './customization-routing.module';
import { AllCarouselsComponent } from './carousel/all-carousels/all-carousels.component';
import { AddCarouselComponent } from './carousel/add-carousel/add-carousel.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import { ShopInformationComponent } from './shop-information/shop-information.component';
import {CategoryMenuComponent} from './category-menu/category-menu.component';
import {AddCategoryMenuComponent} from './category-menu/add-category-menu/add-category-menu.component';
import {MenuHoverContentComponent} from './category-menu/menu-hover-content/menu-hover-content.component';
import {AllStoryComponent} from './story/all-story/all-story.component';
import {AddStoryComponent} from './story/add-story/add-story.component';
import {AddPopupComponent} from './popup/add-popup/add-popup.component';
import {AllPopupComponent} from './popup/all-popup/all-popup.component';


@NgModule({
  declarations: [
    AllCarouselsComponent,
    AddCarouselComponent,
    ShopInformationComponent,
    CategoryMenuComponent,
    AddCategoryMenuComponent,
    MenuHoverContentComponent,
    AllStoryComponent,
    AddStoryComponent,
    AddPopupComponent,
    AllPopupComponent
  ],
  imports: [
    CommonModule,
    CustomizationRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule
  ]
})
export class CustomizationModule { }
