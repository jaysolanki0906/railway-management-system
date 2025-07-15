// header.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordFromComponent } from '../../../features/password/password-from/password-from.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone:true,
  imports:[CommonModule],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  dropdownOpen = false;
  constructor(private token:TokenService,private router:Router,private dialog: MatDialog){
  }
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  userNaviagation(){
    this.router.navigate(['/users']);
  }
  passwordChnage(){
    this.dialog.open(PasswordFromComponent, {
    width: '400px',
    data: { someValue: 'xyz' }
  });
  }
  PNRNaviagation()
  {
    this.router.navigate(['./pnr']);
  }
  myProfile()
  {
    this.router.navigate(['profile']);
  }
  bookingNavigate()
  {
    this.router.navigate(['./searchtrain']);
  }
  dashboardNavigate()
  {
    this.router.navigate(['dashboard']);
  }
  bookTickitNavigate()
  {
    this.router.navigate(['/booking']);
  }
  logout(){
    this.token.clearTokens();
    this.router.navigate(['/login']);
  }
}