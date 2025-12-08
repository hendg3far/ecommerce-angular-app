import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthStorageService } from './auth-storage.service';
import { AuthResponse } from '../models/auth-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);
  private storage = inject(AuthStorageService);

  login(email: string, password: string) {
    return this.api
      .post<AuthResponse>(environment.auth.login, { email, password })
      .pipe();
  }
}
