import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Socio {
  id: number;
  nombre: string;
  email: string;
}

export interface Prestamo {
  libro: string;
  fechaPrestamo: string;
  devuelto: boolean;
}

@Injectable({ providedIn: 'root' })
export class SociosService {
  private apiUrl = 'https://localhostacio/api/socios'; // poner bien la urllllll

  constructor(private http: HttpClient) {}

  getSocios(): Observable<Socio[]> {
    return this.http.get<Socio[]>(this.apiUrl);
  }

  getPrestamosDeSocio(id: number): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/${id}/prestamos`);
  }
}
