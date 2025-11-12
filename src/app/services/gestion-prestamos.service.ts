import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prestamo {
  id: number;
  libroId: number;
  libroTitulo: string;
  socioId: number;
  fechaDevolucionEstimada: string;
  atrasado?: boolean;
}
export interface NuevoPrestamo {
  libroId: number | null;
  socioId: number | null;
  fechaDevolucionEstimada: string;
}

@Injectable({
  providedIn: 'root',
})
export class GestionPrestamosService {
  private apiUrl = 'https://localhost:7063/api/Prestamos';

  constructor(private http: HttpClient) {}

  getPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }

  getPrestamosActivos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/activos`);
  }

  getPrestamosAtrasados(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/atrasados`);
  }

  crearPrestamo(prestamo: NuevoPrestamo) {
  return this.http.post<Prestamo>(`${this.apiUrl}`, prestamo);
}

  devolverLibro(id: number, observaciones: string = ''): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/devolver`, observaciones, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  renovarPrestamo(id: number, dias: number): Observable<void> {
    const params = new HttpParams().set('dias', dias.toString());
    return this.http.put<void>(`${this.apiUrl}/${id}/renovar`, null, { params });
  }

  eliminarPrestamo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
