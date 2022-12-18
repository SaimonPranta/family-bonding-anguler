import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllCarouselsComponent} from './carousel/all-carousels/all-carousels.component';
import {AddCarouselComponent} from './carousel/add-carousel/add-carousel.component';
import {ShopInformationComponent} from './shop-information/shop-information.component';
import {AddCategoryMenuComponent} from './category-menu/add-category-menu/add-category-menu.component';
import {CategoryMenuComponent} from './category-menu/category-menu.component';
import {AllStoryComponent} from './story/all-story/all-story.component';
import {AddStoryComponent} from './story/add-story/add-story.component';
import {AllPopupComponent} from './popup/all-popup/all-popup.component';
import {AddPopupComponent} from './popup/add-popup/add-popup.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-categories'},
  {path: 'all-carousels', component: AllCarouselsComponent},
  {path: 'add-carousel', component: AddCarouselComponent},
  {path: 'edit-carousel/:id', component: AddCarouselComponent},
  {path: 'shop-information', component: ShopInformationComponent},
  {path: 'all-category-menu', component: CategoryMenuComponent},
  {path: 'add-category-menu', component: AddCategoryMenuComponent},
  {path: 'edit-category-menu/:id', component: AddCategoryMenuComponent},
  {path: 'all-story', component: AllStoryComponent},
  {path: 'add-story', component: AddStoryComponent},
  {path: 'edit-story/:id', component: AddStoryComponent},
  {path: 'all-popup', component: AllPopupComponent},
  {path: 'add-popup', component: AddPopupComponent},
  {path: 'edit-popup/:id', component: AddPopupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizationRoutingModule {
}
