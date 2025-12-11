import { Resolve, ResolveFn, Router } from '@angular/router';
import { AuthStorageService } from '../services/auth/auth-storage.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserResolver implements Resolve<any> {
  constructor(private storage: AuthStorageService, private router: Router) { }

  resolve(): Observable<any> {
    const user = this.storage.getUser();
    if (user) {
      return of(user);
    }
    // Not logged in, redirect
    this.router.navigate(['/login']);
    return of(null);
  }
}