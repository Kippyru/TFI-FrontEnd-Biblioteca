import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'libros',
    loadComponent: () => import('./pages/libros/libros.component').then(m => m.LibrosComponent)
  }
];

