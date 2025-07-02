import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Added HTTP providers
import { provideAnimations } from '@angular/platform-browser/animations'; // Added for animations
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zone.js change detection
    provideZoneChangeDetection({ 
      eventCoalescing: true 
    }), 
    // Router configuration
    provideRouter(routes),
    // HTTP client configuration
    provideHttpClient(
      withInterceptors([

      ])
    ),
    // Animations support
    provideAnimations()
  ]
};