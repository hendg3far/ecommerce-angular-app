import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Params, ɵEmptyOutletComponent } from '@angular/router';
import { Category } from '../../core/models/category';
import { Product } from '../../core/models/product';
import { CategoryService } from '../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faStar as faStarSolid, faStarHalfStroke, faStar as faStarRegular } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryDetailsComponent {

  category!: Category;
  products: Product[] = [];

  faStarFull = faStarSolid;
  faStarHalf = faStarHalfStroke;
  faStarEmpty = faStarRegular;


  constructor(
    private categoryService: CategoryService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.router.params.subscribe((params: Params) => {
      const categoryId = params['id'];
      if (categoryId) {
        this.getCategoryDetails(categoryId);
        this.getProductsByCategory(categoryId);
      }
    })
  }

  getCategoryDetails(categoryId: string): void {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (response) => {
        console.log('Category details:', response.data);
        this.category = response.data;
      },
      error: (err) => {
        console.error('Error fetching category details:', err);
      }
    });
  }

  getProductsByCategory(categoryId: string): void {
    this.categoryService.getProductsByCategory(categoryId).subscribe({
      next: (response) => {
        this.products = response.data;
        console.log('Products in category:', this.products);
      },
      error: (err) => {
        console.error('Error fetching products by category:', err);
      }
    });
  }

}
