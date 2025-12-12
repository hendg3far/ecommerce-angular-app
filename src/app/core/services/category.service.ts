import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Product } from '../models/product';

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

  getProductsByCategory(id: string): Observable<{ data: Product[] }> {
    return this.api.get<{ data: Product[] }>(`${environment.products.getAll}?category=${id}`);
  }

}
