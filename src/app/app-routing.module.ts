import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {environment} from "../environments/environment";
import {AdminAuthStateGuard} from "./auth-guard/admin-auth-state.guard";
import {AdminAuthGuard} from "./auth-guard/admin-auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  // ADMIN
  {
    path: environment.adminLoginUrl,
    // canActivate: [AdminAuthStateGuard],
    loadChildren: () => import('./admin/admin-auth/admin-auth.module').then(m => m.AdminAuthModule)
  },
  {
    path: environment.adminBaseUrl,
    // canActivate: [AdminAuthGuard],
    loadChildren: () => import('./admin/pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy',
    // initialNavigation: 'enabled',
    anchorScrolling: 'enabled'
  })],
  providers: [AdminAuthGuard, AdminAuthStateGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
