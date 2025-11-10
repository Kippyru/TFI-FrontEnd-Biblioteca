import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosService, Libro } from '../../services/libros.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: '../libros/libros.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,        // sacar si los datos no se actualizan automaticamente 
})
export class LibrosComponent implements OnInit {
  libros: Libro[] = [];
  filtro: 'todos' | 'disponibles' = 'todos';
  cargando = true;
  error = false;

    constructor(private librosService: LibrosService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.librosService.getLibros().subscribe({
      next: (datos) => {
        this.libros = datos;
        this.cargando = false;
        this.cdr.markForCheck();      // deberia hacer que todo se actualice automaticamente 
      },
      error: (err) => {
        console.warn('⚠️ No se pudo conectar al backend, usando datos mock:', err);
        this.libros = [
          { titulo: 'El Quijote', autor: 'Cervantes', disponible: true },
          { titulo: 'Demian', autor: 'Hermann Hesse', disponible: false },
          { titulo: '1984', autor: 'George Orwell', disponible: true },
        ];
        this.error = true;
        this.cargando = false;
        this.cdr.markForCheck();     // deberia hacer que todo se actualice automaticamente 
      },
    });
  }

  get librosFiltrados() {
    return this.filtro === 'disponibles'
      ? this.libros.filter((libro) => libro.disponible)
      : this.libros;
  }

  get total() {
    return this.libros.length;
  }

  get disponibles() {
    return this.libros.filter((libro) => libro.disponible).length;
  }

  get prestados() {
    return this.libros.filter((libro) => !libro.disponible).length;
  }

  filtrar(filtro: 'todos' | 'disponibles') {
    this.filtro = filtro;
  }
}
