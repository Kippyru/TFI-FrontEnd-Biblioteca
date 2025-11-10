import { Injectable } from '@angular/core';
import { GestionLibrosService } from './gestion-libros.service';

export interface Prestamo {
  id: number;
  libroId: number;
  socio: string;
  fecha: Date;
  devuelto: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GestionPrestamosService {
  private prestamos: Prestamo[] = [];

  constructor(private librosService: GestionLibrosService) {}

  obtenerPrestamos(): Prestamo[] {
    return this.prestamos;
  }

  agregarPrestamo(libroId: number, socio: string) {
    const libro = this.librosService.libros.find(l => l.id === libroId);
    if (libro && libro.disponible) {
      libro.disponible = false;
      this.librosService.actualizar();

      const nuevo: Prestamo = {
        id: Date.now(),
        libroId,
        socio,
        fecha: new Date(),
        devuelto: false,
      };

      this.prestamos.push(nuevo);
    }
  }

  devolverLibro(idPrestamo: number) {
    const prestamo = this.prestamos.find(p => p.id === idPrestamo);
    if (prestamo && !prestamo.devuelto) {
      prestamo.devuelto = true;

      const libro = this.librosService.libros.find(l => l.id === prestamo.libroId);
      if (libro) {
        libro.disponible = true;
        this.librosService.actualizar();
      }
    }
  }
}
