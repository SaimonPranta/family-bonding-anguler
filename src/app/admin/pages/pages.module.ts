import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesComponent} from './pages.component';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {SidenavListComponent} from './components/sidenav-list/sidenav-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from "../../material/material.module";
import {CheckAuthAccessGuard} from '../../auth-guard/check-auth-access.guard';
import {PipesModule} from '../../shared/pipes/pipes.module';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
      },
    ]
  },
];

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FlexLayoutModule,
        PipesModule,
    ],
  exports: [],
  providers: [CheckAuthAccessGuard]
})
export class PagesModule {
}
