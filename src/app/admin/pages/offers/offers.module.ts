import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OffersRoutingModule} from './offers-routing.module';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {ProductListModule} from '../../../shared/dialog-view/product-list/product-list.module';
import {OrderTimelineModule} from '../../../shared/lazy/order-timeline/order-timeline.module';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {AddPromoOfferComponent} from './promo-offer/add-promo-offer/add-promo-offer.component';
import {AllPromoOfferComponent} from './promo-offer/all-promo-offer/all-promo-offer.component';
import {AddCouponComponent} from './coupon/add-coupon/add-coupon.component';
import {AllCouponsComponent} from './coupon/all-coupons/all-coupons.component';
import {QuillModule} from 'ngx-quill';


@NgModule({
  declarations: [
    AddPromoOfferComponent,
    AllPromoOfferComponent,
    AddCouponComponent,
    AllCouponsComponent
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    ProductListModule,
    OrderTimelineModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    QuillModule,
  ]
})
export class OffersModule {
}
