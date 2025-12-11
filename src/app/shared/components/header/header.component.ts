import { Component } from '@angular/core';
import { AuthRoutingModule } from "../../../features/auth/auth-routing.module";
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category';
import { CommonModule } from '@angular/common';
import { AuthStorageService } from '../../../core/services/auth/auth-storage.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AuthRoutingModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  categories: Category[] = [];
  isLoggedIn = false;

  constructor(private catService: CategoryService,
    private storage: AuthStorageService,
    private auth: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.getCategories();
    this.storage.authState$.subscribe(state => {
      this.isLoggedIn = state;
    });
  }

  getCategories() {
    this.catService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      }, error: (err) => {
        console.error('Error fetching categories', err);
      }
    })
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
