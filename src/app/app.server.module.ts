import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
// import {NgxSsrCacheModule} from '@ngx-ssr/cache';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

@NgModule({
  imports: [
    AppModule,
    FlexLayoutServerModule,
    // NgxSsrCacheModule.configLruCache({ maxAge: 10 * 60_000, maxSize: 50 }),
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
