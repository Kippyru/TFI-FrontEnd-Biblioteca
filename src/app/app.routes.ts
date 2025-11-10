import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'libros',
    loadComponent: () =>
      import('./pages/libros/libros.component').then((m) => m.LibrosComponent),
  },
  {
    path: 'socios',
    loadComponent: () =>
      import('./pages/socios/socios.component').then((m) => m.SociosComponent),
  },
  {
    path: 'editar-socios',
    loadComponent: () =>
      import('./pages/gestionsocios/gestion-socios.component').then((m) => m.GestionSociosComponent),
  },
  {
    path: 'editar-libros',
    loadComponent: () =>
      import('./pages/gestionlibros/gestion-libros.component').then((m) => m.GestionLibrosComponent),
  },
  {
    path: 'prestamos', 
    loadComponent: () =>
      import('./pages/prestamos/prestamos-libros.component').then((m) => m.PrestamosLibrosComponent),
  },
  {
    path: 'reportes', 
    loadComponent: () =>
      import('./pages/reportes/reportes.component').then((m) => m.ReportesComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];