import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private base_url = environment.apiUrl;

  get<T>(endPoints: string, params?: any) {
    const url = this.buildUrl(endPoints);
    return this.http.get<T>(url, { params });
  }

  post<T>(endPoints: string, body: any) {
    const url = this.buildUrl(endPoints);
    return this.http.post<T>(url, body);
  }

  put<T>(endpoint: string, body: any) {
    const url = this.buildUrl(endpoint);
    return this.http.put<T>(url, body);
  }

  delete<T>(endpoint: string) {
    const url = this.buildUrl(endpoint);
    return this.http.delete<T>(url);
  }

  private buildUrl(endpoint: string): string {
    return `${this.base_url}/${endpoint}`;
  }
}
