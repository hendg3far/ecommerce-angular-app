import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserResolver } from './core/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'account',
    loadComponent: () => import('./features/account/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [AuthGuard],
    resolve: { user: UserResolver }
  },
  {
    path: 'category/:id',
    loadComponent: () =>
      import('./features/categories/category-details/category-details.component')
        .then(m => m.CategoryDetailsComponent)
  }
];
