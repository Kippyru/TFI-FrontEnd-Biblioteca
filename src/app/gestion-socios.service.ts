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
    { id: 1, nombre: 'Juan Pérez', email: 'juan@mail.com', telefono: '123456789' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@mail.com', telefono: '987654321' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@mail.com', telefono: '555555555' },
  ];

  private sociosSubject = new BehaviorSubject<Socio[]>(this.sociosIniciales);
  socios$ = this.sociosSubject.asObservable();

  get socios(): Socio[] {
    return this.sociosSubject.getValue();
  }

  agregarSocio(nuevo: Omit<Socio, 'id'>) {
    const lista = this.socios;
    const nuevoSocio: Socio = { ...nuevo, id: Date.now() };
    this.sociosSubject.next([...lista, nuevoSocio]);
  }

  eliminarSocio(id: number) {
    this.sociosSubject.next(this.socios.filter((s) => s.id !== id));
  }

  editarSocio(actualizado: Socio) {
    const lista = this.socios.map((s) =>
      s.id === actualizado.id ? actualizado : s
    );
    this.sociosSubject.next(lista);
  }
}
