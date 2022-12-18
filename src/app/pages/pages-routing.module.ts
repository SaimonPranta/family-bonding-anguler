import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from "./pages.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./news-letter/news-letter.module').then(m => m.NewsLetterModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'regester',
        loadChildren: () => import('./register/register-routing.module').then(m => m.RegisterRoutingModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'regester-bn',
        loadChildren: () => import('./regester-bn/regester-bn.module').then(m => m.RegesterBnModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'regestration',
        loadChildren: () => import('./regestration/regestration.module').then(m => m.RegestrationModule),
        data: {preload: true, delay: false}
      },
      {
        path: 're-regestration',
        loadChildren: () => import('./re-regestration/re-regestration.module').then(m => m.ReRegestrationModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'family-admin-basic-data',
        loadChildren: () => import('./family-admin-basic-data/family-admin-basic-data.module').then(m => m.FamilyAdminBasicDataModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'family-member-basic-data',
        loadChildren: () => import('./family-member-basic-data/family-member-basic-data.module').then(m => m.FamilyMemberBasicDataModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'expression-interest-table-data',
        loadChildren: () => import('./expression-interest-table-data/expression-interest-table-data.module').then(m => m.ExpressionInterestTableDataModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'family-admin-request-list-panel',//
        loadChildren: () => import('./family-admin-request-list-panel/family-admin-request-list-panel.module').then(m => m.FamilyAdminRequestListPanelModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'family-member-request-list-panel',//
        loadChildren: () => import('./family-member-request-list-panel/family-member-request-list-panel.module').then(m => m.FamilyMemberRequestListPanelModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'refer-statement',//
        loadChildren: () => import('./refer-statement/refer-statement.module').then(m => m.ReferStatementModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'revenue-statement',//
        loadChildren: () => import('./revenue-statement/revenue-statement.module').then(m => m.RevenueStatementModule),
        data: {preload: true, delay: false}
      },



      {
        path: 'top-great-grand-father-name-with-surname',
        loadChildren: () => import('./top-great-grand-father-name-with-surname/top-great-grand-father-name-with-surname.module').then(m => m.TopGreatGrandFatherNameWithSurnameModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'super-admin-dashboard',
        loadChildren: () => import('./super-admin-dashboard/super-admin-dashboard.module').then(m => m.SuperAdminDashboardModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'family-admin-dashboard',
        loadChildren: () => import('./family-admin-dashboard/family-admin-dashboard.module').then(m => m.FamilyAdminDashboardModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'poll',
        loadChildren: () => import('./poll/poll.module').then(m => m.PollModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'fm-survey-req',
        loadChildren: () => import('./fm-survey-req/fm-survey-req.module').then(m => m.FMSurveyReqModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'fm-event-al-attendence',
        loadChildren: () => import('./fm-event-al-attendence/fm-event-al-attendence.module').then(m => m.FmEventAlAttendenceModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'fm-to-do-list',
        loadChildren: () => import('./fm-to-do-list/fm-to-do-list.module').then(m => m.FmToDoListModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'test',
        loadChildren: () => import('./test/test.module').then(m => m.TestModule),
        data: {preload: false, delay: false}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PagesRoutingModule {
}
