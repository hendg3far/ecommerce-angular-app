import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api = inject(ApiService);

  getAllCategories(): Observable<{ data: Category[] }> {
    return this.api.get<{ data: Category[] }>(environment.categories.getAll);
  }


  getCategoryById(id: string): Observable<{ data: Category }> {
    return this.api.get<{ data: Category }>(`${environment.categories.getAll}/${id}`);
  }
}
