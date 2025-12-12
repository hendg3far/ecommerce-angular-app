import { Component } from '@angular/core';
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products: Product[] = [];
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        console.log('Fetched products:', this.products);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching products:', err);
      }
    });
  }
}
