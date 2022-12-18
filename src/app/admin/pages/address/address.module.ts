
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import {QuillModule} from 'ngx-quill';
import {AddCountryComponent} from './country/add-country/add-country.component';
import {AllCountriesComponent} from './country/all-countries/all-countries.component';
import {AddDivisionComponent} from './division/add-division/add-division.component';
import {AllDivisionsComponent} from './division/all-divisions/all-divisions.component';
import {AddDistrictComponent} from './district/add-district/add-district.component';
import {AllDistrictsComponent} from './district/all-districts/all-districts.component';
import {AddSubSubDistrictComponent} from './sub-district/add-sub-district/add-sub-district.component';
import {AllSubDistrictComponent} from './sub-district/all-sub-districts/all-sub-districts.component';
import {AddUnionComponent} from './union/add-union/add-union.component';
import {AllUnionsComponent} from './union/all-unions/all-unions.component';
import {AddContinentComponent} from './continent/add-continent/add-continent.component';
import {AllContinentComponent} from './continent/all-continent/all-countries.component';


@NgModule({
  declarations: [
    AddCountryComponent,
    AllCountriesComponent,

    AddDivisionComponent,
    AllDivisionsComponent,

    AddDistrictComponent,
    AllDistrictsComponent,

    AddSubSubDistrictComponent,
    AllSubDistrictComponent,

    AddUnionComponent,
    AllUnionsComponent,

    AddContinentComponent,
    AllContinentComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    PipesModule,
    FlexLayoutModule,
    DirectivesModule,
    DigitOnlyModule,
    QuillModule
  ]
})
export class AddressModule { }
