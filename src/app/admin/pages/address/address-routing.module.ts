import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCountryComponent} from './country/add-country/add-country.component';
import {AllCountriesComponent} from './country/all-countries/all-countries.component';
import {AllDivisionsComponent} from './division/all-divisions/all-divisions.component';
import {AddDivisionComponent} from './division/add-division/add-division.component';
import {AllDistrictsComponent} from './district/all-districts/all-districts.component';
import {AddDistrictComponent} from './district/add-district/add-district.component';
import {AllSubDistrictComponent} from './sub-district/all-sub-districts/all-sub-districts.component';
import {AddSubSubDistrictComponent} from './sub-district/add-sub-district/add-sub-district.component';
import {AllUnionsComponent} from './union/all-unions/all-unions.component';
import {AddUnionComponent} from './union/add-union/add-union.component';
import {AddContinentComponent} from './continent/add-continent/add-continent.component';
import {AllContinentComponent} from './continent/all-continent/all-countries.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-countries'},
  {path: 'all-countries', component: AllCountriesComponent},
  {path: 'add-country', component: AddCountryComponent},
  {path: 'edit-country/:id', component: AddCountryComponent},


  {path: 'all-divisions', component: AllDivisionsComponent},
  {path: 'add-division', component: AddDivisionComponent},
  {path: 'edit-division/:id', component: AddDivisionComponent},


  {path: 'all-districts', component: AllDistrictsComponent},
  {path: 'add-district', component: AddDistrictComponent},
  {path: 'edit-district/:id', component: AddDistrictComponent},


  {path: 'all-sub-districts', component: AllSubDistrictComponent},
  {path: 'add-sub-district', component: AddSubSubDistrictComponent},
  {path: 'edit-sub-district/:id', component: AddSubSubDistrictComponent},


  {path: 'all-unions', component: AllUnionsComponent},
  {path: 'add-union', component: AddUnionComponent},
  {path: 'edit-union/:id', component: AddUnionComponent},


  {path: 'all-continents', component: AllContinentComponent},
  {path: 'add-continent', component: AddContinentComponent},
  {path: 'edit-continent/:id', component: AddContinentComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule {
}
