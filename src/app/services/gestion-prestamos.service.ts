import { Injectable } from '@angular/core';
import { GestionLibrosService, Libro } from './gestion-libros.service';
import { GestionSociosService, Socio } from './gestion-socios.service';

@Injectable({
  providedIn: 'root',
})
export class GestionPrestamosService {
  constructor(
    private librosService: GestionLibrosService,
    private sociosService: GestionSociosService
  ) {}

  get libros$() {
    return this.librosService.libros$;
  }

  getLibros(): Libro[] {
    return this.librosService.libros;
  }

  prestarLibro(idLibro: number, idSocio: number): void {
    const libros = this.librosService.libros;
    const libro = libros.find((l) => l.id === idLibro);
    const socio = this.sociosService.socios.find((s) => s.id === idSocio);

    if (libro && socio && libro.disponible) {
      const hoy = new Date();
      const devolucion = new Date(hoy);
      devolucion.setDate(hoy.getDate() + 7); // plazo de 7 días

      libro.disponible = false;
      libro.socioId = socio.id;
      libro.fechaPrestamo = hoy.toLocaleDateString();
      libro.fechaDevolucion = devolucion.toLocaleDateString();

      this.librosService.actualizar();
    }
  }

  devolverLibro(idLibro: number): void {
    const libros = this.librosService.libros;
    const libro = libros.find((l) => l.id === idLibro);

    if (libro && !libro.disponible) {
      libro.disponible = true;
      libro.socioId = null;
      libro.fechaPrestamo = null;
      libro.fechaDevolucion = null;

      this.librosService.actualizar();
    }
  }
}