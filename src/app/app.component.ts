import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './shared/header/header/header.component';
import { LoaderService } from './core/services/loader.service';
import { TrainLoaderComponent } from './shared/loader/train-loader/train-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,HeaderComponent,TrainLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showHeader = true;
  title = 'train-management';
  constructor(private router: Router,public loaderService: LoaderService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeader = !(event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/register');
    });
  }
}
