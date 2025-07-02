import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports:[CommonModule],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser = {
    name: 'John Smith',
    role: 'Station Manager',
    avatar: 'assets/images/default-avatar.png'
  };

  notifications = [
    { id: 1, message: 'Train TRN-001 delayed by 15 minutes', type: 'warning', time: '2 min ago' },
    { id: 2, message: 'Platform 3 maintenance completed', type: 'success', time: '10 min ago' },
    { id: 3, message: 'New booking received for Route R-205', type: 'info', time: '15 min ago' }
  ];

  isNotificationDropdownOpen = false;
  isUserDropdownOpen = false;
  isMobileMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleNotifications(): void {
    this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
    this.isUserDropdownOpen = false;
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    this.isNotificationDropdownOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
    this.isMobileMenuOpen = false;
  }

  logout(): void {
    // Implement logout logic
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }

  clearNotification(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  }
}