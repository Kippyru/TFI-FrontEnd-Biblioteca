import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionLibrosService, Libro } from '../../services/gestion-libros.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-libros',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './gestion-libros.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionLibrosComponent implements OnInit {
  libros: Libro[] = [];
  libroEditando: Libro | null = null;
  nuevoLibro: Libro = this.resetLibro();
  cargando = true;
  error = false;

  constructor(
    private gestionLibrosService: GestionLibrosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.gestionLibrosService.getLibros().subscribe({
      next: (datos) => {
        this.libros = datos;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al obtener libros:', err);
        this.error = true;
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });
  }

  resetLibro(): Libro {
    return {
      titulo: '',
      autor: '',
      isbn: '',
      editorial: '',
      añoPublicacion: undefined,
      genero: '',
      cantidadDisponible: 0,
      cantidadTotal: 0,
    };
  }

  guardarLibro() {
    if (!this.nuevoLibro.titulo || !this.nuevoLibro.autor) {
      alert('⚠️ Título y Autor son requeridos.');
      return;
    }

    this.gestionLibrosService.crearLibro(this.nuevoLibro).subscribe({
      next: () => {
        this.cargarLibros();
        this.nuevoLibro = this.resetLibro();
      },
      error: (err) => console.error('Error al crear libro:', err),
    });
  }

  editarLibro(libro: Libro) {
    this.libroEditando = { ...libro };
  }

  actualizarLibro() {
    if (!this.libroEditando || !this.libroEditando.id) return;

    this.gestionLibrosService
      .actualizarLibro(this.libroEditando.id, this.libroEditando)
      .subscribe({
        next: () => {
          this.cargarLibros();
          this.libroEditando = null;
        },
        error: (err) => console.error('Error al actualizar libro:', err),
      });
  }

  eliminarLibro(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este libro?')) return;

    this.gestionLibrosService.eliminarLibro(id).subscribe({
      next: () => this.cargarLibros(),
      error: (err) => console.error('Error al eliminar libro:', err),
    });
  }

  cancelarEdicion() {
    this.libroEditando = null;
  }
}
