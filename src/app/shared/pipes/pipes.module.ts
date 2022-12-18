import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafeHtmlCustomPipe} from './safe-html.pipe';
import {SortPipe} from './sort.pipe';
import {NumberMinDigitPipe} from './number-min-digit.pipe';
import {SlugToNormalPipe} from './slug-to-normal.pipe';
import {ArrayStringPipe} from './array-string.pipe';
import {TextWrapPipe} from './text-wrap.pipe';
import {FormatBytesPipe} from './format-bytes.pipe';
import {MomentDatePipe} from "./moment-date.pipe";
import { CharacterCountPipe } from './character-count.pipe';
import {CheckNullPipe} from "./check-null.pipe";
import {PricePipe} from './price.pipe';
import {OrderStatusPipe} from './order-status.pipe';
import {VariationNormalizePipe} from './variation-normalize.pipe';
import {ProductDiscountViewPipe} from './product-discount-view.pipe';
import {BnDatePipe} from './bn-date.pipe';


@NgModule({
  declarations: [
    SafeHtmlCustomPipe,
    SortPipe,
    NumberMinDigitPipe,
    SlugToNormalPipe,
    ArrayStringPipe,
    TextWrapPipe,
    CheckNullPipe,
    FormatBytesPipe,
    MomentDatePipe,
    CharacterCountPipe,
    PricePipe,
    OrderStatusPipe,
    VariationNormalizePipe,
    ProductDiscountViewPipe,
    BnDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafeHtmlCustomPipe,
    SortPipe,
    NumberMinDigitPipe,
    SlugToNormalPipe,
    TextWrapPipe,
    CheckNullPipe,
    FormatBytesPipe,
    MomentDatePipe,
    CharacterCountPipe,
    PricePipe,
    OrderStatusPipe,
    VariationNormalizePipe,
    ProductDiscountViewPipe,
    BnDatePipe
  ]
})
export class PipesModule {
}
