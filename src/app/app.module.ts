import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbDatepickerModule,
  NbSidebarModule,
  NbDialogModule,
  NbToastrModule,
  NbMenuModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { CoreModule } from './core/core.module';
import { GlobalErrorHandler } from './core/handlers/error.handler';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    MainModule,
    CoreModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    HttpClientModule,
    NbDatepickerModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot()
  ],
  providers: [
    GlobalErrorHandler,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
