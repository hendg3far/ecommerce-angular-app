import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthStorageService } from './auth-storage.service';
import { AuthResponse } from '../../models/auth/auth-response';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from '../../models/auth/login-request';
import { RegisterRequest } from '../../models/auth/register-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private storage = inject(AuthStorageService);

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(environment.auth.login, data).pipe(
      tap((response) => {
        this.storage.setToken(response.token);
        this.storage.setUser(response.user);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(environment.auth.register, data).pipe(
      tap((response) => {
        this.storage.setToken(response.token);
        this.storage.setUser(response.user);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  logout() {
    this.storage.clear();
  }

}
