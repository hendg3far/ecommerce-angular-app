import { Injectable } from "@angular/core";
import { User } from "../../models/auth/user";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private authState = new BehaviorSubject<boolean>(this.hasToken());

  authState$ = this.authState.asObservable();


  setToken(token: string, remember: boolean = true) {
    if (remember) {
      localStorage.setItem(this.TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  setUser(user: User, remember: boolean = true) {
    const data = JSON.stringify(user);
    if (remember) {
      localStorage.setItem(this.USER_KEY, data);
    } else {
      sessionStorage.setItem(this.USER_KEY, data);
    }
  }

  getUser(): User | null {
    const data = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  clear() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }


  signOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.authState.next(false);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

}
