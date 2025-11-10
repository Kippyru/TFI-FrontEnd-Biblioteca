import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  disponible: boolean;
  socioId?: number | null;
  fechaPrestamo?: string | null;
  fechaDevolucion?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class GestionLibrosService {
  private librosIniciales: Libro[] = [
    { id: 1, titulo: '1984', autor: 'George Orwell', disponible: true },
    { id: 2, titulo: 'El Quijote', autor: 'Miguel de Cervantes', disponible: false },
    { id: 3, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', disponible: true },
  ];

  private librosSubject = new BehaviorSubject<Libro[]>(this.librosIniciales);
  libros$ = this.librosSubject.asObservable();

  get libros(): Libro[] {
    return this.librosSubject.getValue();
  }

  actualizar() {
    this.librosSubject.next([...this.libros]);
  }

  private obtenerLibros(): Libro[] {
    return this.librosSubject.getValue();
  }

  agregarLibro(nuevo: Omit<Libro, 'id'>) {
    const lista = this.obtenerLibros();
    const nuevoLibro: Libro = { ...nuevo, id: Date.now() };
    this.librosSubject.next([...lista, nuevoLibro]);
  }

  eliminarLibro(id: number) {
    const lista = this.obtenerLibros().filter((l) => l.id !== id);
    this.librosSubject.next(lista);
  }

  editarLibro(actualizado: Libro) {
    const lista = this.obtenerLibros().map((l) =>
      l.id === actualizado.id ? actualizado : l
    );
    this.librosSubject.next(lista);
  }
}