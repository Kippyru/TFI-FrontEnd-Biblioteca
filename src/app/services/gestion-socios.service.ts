import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Socio {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root',
})
export class GestionSociosService {
  private sociosIniciales: Socio[] = [
    { id: 4, nombre: 'Juan Pérez', email: 'juan@example.com', telefono: '1123456789' },
    { id: 5, nombre: 'Ana Gómez', email: 'ana@example.com', telefono: '1198765432' },
  ];

  private sociosSubject = new BehaviorSubject<Socio[]>(this.sociosIniciales);
  socios$ = this.sociosSubject.asObservable();

  private obtenerSocios(): Socio[] {
    return this.sociosSubject.getValue();
  }

  agregarSocio(nuevo: Omit<Socio, 'id'>) {
    const lista = this.obtenerSocios();
    const nuevoSocio: Socio = { ...nuevo, id: Date.now() };
    this.sociosSubject.next([...lista, nuevoSocio]);
  }

  eliminarSocio(id: number) {
    const lista = this.obtenerSocios().filter((s) => s.id !== id);
    this.sociosSubject.next(lista);
  }

  editarSocio(actualizado: Socio) {
    const lista = this.obtenerSocios().map((s) => (s.id === actualizado.id ? actualizado : s));
    this.sociosSubject.next(lista);
  }
}
