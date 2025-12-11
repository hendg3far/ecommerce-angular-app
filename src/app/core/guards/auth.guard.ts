import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStorageService } from '../services/auth/auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private storage: AuthStorageService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const token = this.storage.getToken();

    if (token) {
      return true; // User is logged in, allow route
    }

    // Not logged in, redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
