import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllPromoOfferComponent} from './promo-offer/all-promo-offer/all-promo-offer.component';
import {AddPromoOfferComponent} from './promo-offer/add-promo-offer/add-promo-offer.component';
import {AllCouponsComponent} from './coupon/all-coupons/all-coupons.component';
import {AddCouponComponent} from './coupon/add-coupon/add-coupon.component';

const routes: Routes = [
  {path: '', redirectTo: ''},
  {path: 'promo-offer', component: AllPromoOfferComponent},
  {path: 'add-promo-offer', component: AddPromoOfferComponent},
  {path: 'view-promo-offer/:id', component: AddPromoOfferComponent},
  {path: 'edit-promo-offer/:id', component: AddPromoOfferComponent},
  {path: 'coupons', component: AllCouponsComponent},
  {path: 'add-coupon', component: AddCouponComponent},
  {path: 'edit-coupon/:id', component: AddCouponComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule {
}
