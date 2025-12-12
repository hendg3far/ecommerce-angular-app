import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = inject(ApiService);

  getAllProducts(): Observable<{ data: Product[] }> {
    return this.api.get<{ data: Product[] }>(`${environment.products.getAll}`);
  }

  getProductById(id: string): Observable<{ data: Product }> {
    return this.api.get<{ data: Product }>(`${environment.products.getAll}/${id}`);
  }
}
