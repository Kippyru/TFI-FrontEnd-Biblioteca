import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Socio {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  activo?: boolean;
}

export interface Prestamo {
  id: number;
  libro: string;
  fechaPrestamo: string;
  fechaDevolucion?: string;
  devuelto: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SociosService {
  private apiUrl = 'https://localhost:7063/api/Socios';

  constructor(private http: HttpClient) {}

  /** Listar todos los socios */
  getSocios(): Observable<Socio[]> {
    return this.http.get<Socio[]>(this.apiUrl);
  }

  /** Obtener socio por ID */
  getSocioPorId(id: number): Observable<Socio> {
    return this.http.get<Socio>(`${this.apiUrl}/${id}`);
  }

  /** Listar socios activos */
  getSociosActivos(): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.apiUrl}/activos`);
  }

  /** Obtener préstamos de un socio */
  getPrestamosDeSocio(id: number): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/${id}/prestamos`);
  }
}
