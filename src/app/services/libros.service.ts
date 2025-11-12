import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro {
  id?: number;
  titulo: string;
  autor: string;
  disponible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private apiUrl = 'https://localhost:7063/api/Libros'; 

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  getLibroPorId(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  getLibrosDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/disponibles`);
  }

  buscarLibros(termino: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/buscar?termino=${termino}`);
  }
}
