import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosService, Libro } from '../../services/libros.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule],
  templateUrl: '../libros/libros.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrosComponent implements OnInit {
  libros: Libro[] = [];
  filtro: 'todos' | 'disponibles' = 'todos';
  terminoBusqueda = '';

  cargando = true;
  error = false;

  constructor(
    private librosService: LibrosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarLibros();
  }

  /** 📦 Carga los libros desde el backend */
  cargarLibros() {
    this.cargando = true;
    const obs =
      this.filtro === 'disponibles'
        ? this.librosService.getLibrosDisponibles()
        : this.librosService.getLibros();

    obs.subscribe({
      next: (datos) => {
        this.libros = datos;
        this.cargando = false;
        this.error = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('⚠️ Error al cargar libros:', err);
        this.cargando = false;
        this.error = true;
        this.cdr.markForCheck();
      },
    });
  }

  /** 🔍 Buscar libros en el backend */
  buscar() {
    const termino = this.terminoBusqueda.trim();

    if (!termino) {
      this.cargarLibros(); // si está vacío, vuelve a cargar todo
      return;
    }

    this.cargando = true;
    this.librosService.buscarLibros(termino).subscribe({
      next: (datos) => {
        this.libros = datos;
        this.cargando = false;
        this.error = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al buscar libros:', err);
        this.cargando = false;
        this.error = true;
        this.cdr.markForCheck();
      },
    });
  }

  /** 🔄 Cambiar filtro (todos/disponibles) */
  filtrar(filtro: 'todos' | 'disponibles') {
    this.filtro = filtro;
    this.cargarLibros();
  }

  /** 📊 Getters para mostrar totales */
  get total() {
    return this.libros.length;
  }

  get disponibles() {
    return this.libros.filter((libro) => libro.disponible).length;
  }

  get prestados() {
    return this.libros.filter((libro) => !libro.disponible).length;
  }
}
