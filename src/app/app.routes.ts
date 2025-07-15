import { RedirectCommand, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { HeaderComponent } from './shared/header/header/header.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RedirectGuard } from './core/guards/redirect.guard';
import { DisplayComponent } from './features/pnr/display/display.component';
import { SearchTrainByStationComponent } from './features/train-booking/search-train-by-station/search-train-by-station.component';
import { BookingModule } from './features/booking/booking.module';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent,canActivate:[RedirectGuard]},
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[AuthGuard]
    },
    { path: 'password', loadChildren:()=>import('./features/password/password.module').then(m=>m.PasswordModule),canActivate:[AuthGuard]},
    { path: 'users', loadChildren:()=>import('./features/users/users.module').then(m=>m.UsersModule),canActivate:[AuthGuard]},
    {path:'pnr',component:DisplayComponent},
    {path:'searchtrain',component:SearchTrainByStationComponent},
    {path:'booking',loadChildren:()=>import('./features/booking/booking.module').then(m=>m.BookingModule),canActivate:[AuthGuard]},
    {path:'profile',loadChildren:()=>import('./features/profile/profile.module').then(m=>m.ProfileModule),canActivate:[AuthGuard]}
];