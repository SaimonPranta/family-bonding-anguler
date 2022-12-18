import {BrowserModule, Meta, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FacebookModule} from 'ngx-facebook';
import {QuillModule} from 'ngx-quill';
import {SharedModule} from "./shared/shared.module";
import {AuthAdminInterceptor} from "./auth-interceptor/auth-admin.interceptor";
import {ErrorHandleInterceptor} from './error-handler/error-handle.interceptor';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    HttpClientModule,
    // Ngx Facebook
    FacebookModule.forRoot(),
    QuillModule.forRoot(),
    SharedModule,
  ],
  providers: [
    Title,
    Meta,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandleInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthAdminInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
