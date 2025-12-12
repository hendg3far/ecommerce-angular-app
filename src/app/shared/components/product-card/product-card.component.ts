import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  getStarFill(rating: number, starNumber: number): string {
    const fill = Math.min(Math.max(rating - (starNumber - 1), 0), 1);
    return `${fill * 100}%`;
  }

}
