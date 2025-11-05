import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro {
  titulo: string;
  autor: string;
  disponible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private apiUrl = 'https://localhost/api/libros'; // Poner la url bien carajo!

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }
}
