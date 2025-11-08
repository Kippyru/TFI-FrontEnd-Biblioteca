import { Injectable } from '@angular/core';
import { GestionLibrosService, Libro } from './gestion-libros.service';

@Injectable({
  providedIn: 'root',
})
export class GestionPrestamosService {
  constructor(private librosService: GestionLibrosService) {}

  /** 🔹 Observable de libros */
  get libros$() {
    return this.librosService.libros$;
  }

  /** 🔹 Obtener libros actuales */
  getLibros(): Libro[] {
    return this.librosService.libros;
  }

  /** 🔹 Marcar libro como prestado */
  prestarLibro(id: number): void {
    const libro = this.librosService.libros.find((l: Libro) => l.id === id);
    if (libro && libro.disponible) {
      libro.disponible = false;
      this.librosService.actualizar();
    }
  }

  /** 🔹 Marcar libro como devuelto */
  devolverLibro(id: number): void {
    const libro = this.librosService.libros.find((l: Libro) => l.id === id);
    if (libro && !libro.disponible) {
      libro.disponible = true;
      this.librosService.actualizar();
    }
  }
}
