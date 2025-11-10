import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionLibrosService, Libro } from '../../services/gestion-libros.service';

@Component({
  selector: 'app-gestion-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-libros.component.html',
})
export class GestionLibrosComponent implements OnInit {
  libros: Libro[] = [];

  libroEditando: Libro = { id: 0, titulo: '', autor: '', disponible: true };

  nuevoLibro: Partial<Libro> = {};

  constructor(private librosService: GestionLibrosService) {}

  ngOnInit() {
    this.librosService.libros$.subscribe((data) => (this.libros = data));
  }

  agregarLibro() {
    if (!this.nuevoLibro.titulo || !this.nuevoLibro.autor) return;
    this.librosService.agregarLibro(this.nuevoLibro as Omit<Libro, 'id'>);
    this.nuevoLibro = {};
  }

  eliminarLibro(id: number) {
    this.librosService.eliminarLibro(id);
  }

  editarLibro(libro: Libro) {
    this.libroEditando = { ...libro };
  }

  guardarEdicion() {
    if (this.libroEditando && this.libroEditando.id !== 0) {
      this.librosService.editarLibro(this.libroEditando);
    }
    this.cancelarEdicion();
  }

  cancelarEdicion() {
    this.libroEditando = { id: 0, titulo: '', autor: '', disponible: true };
  }
}
