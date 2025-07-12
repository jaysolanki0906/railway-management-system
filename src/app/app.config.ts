import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { NgxStripeModule } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        httpInterceptor
      ])
    ),
    provideAnimations(),
    importProvidersFrom(
      NgxStripeModule.forRoot('pk_test_51MWbxNJH12xbIgcw68E2zBEaYOxDp9tx4TwJ5kSMqPZBgwRbmLn915yAt4zgAssQmTdO5IpUZ4xfwylQ8XJWH6dG00VwvyVr8I') 
    )
  ]
};