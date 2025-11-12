import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro {
  id?: number;
  titulo: string;
  autor: string;
  isbn?: string;
  editorial?: string;
  añoPublicacion?: number;
  genero?: string;
  cantidadDisponible: number;
  cantidadTotal: number;
  fechaRegistro?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class GestionLibrosService {
  private apiUrl = 'https://localhost:7063/api/libros';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  crearLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  actualizarLibro(id: number, libro: Libro): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, libro);
  }

  eliminarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
