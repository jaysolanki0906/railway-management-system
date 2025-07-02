import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { HeaderComponent } from './shared/header/header/header.component';

export const routes: Routes = [
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: localStorage.getItem('access_token') ? 'dashboard' : 'login'
//   },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'header', component: HeaderComponent },
  { path: '**', redirectTo: 'login' } // <-- WILDCARD ROUTE
];