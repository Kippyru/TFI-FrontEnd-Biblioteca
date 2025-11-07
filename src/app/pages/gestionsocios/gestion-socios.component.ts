import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionSociosService, Socio } from '../../services/gestion-socios.service';

@Component({
  selector: 'app-gestion-socios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-socios.component.html',
})
export class GestionSociosComponent implements OnInit {
  socios: Socio[] = [];

  socioEditando: Socio = { id: 0, nombre: '', email: '', telefono: '' };

  nuevoSocio: Partial<Socio> = {};

  constructor(private sociosService: GestionSociosService) {}

  ngOnInit() {
    this.sociosService.socios$.subscribe((data) => (this.socios = data));
  }

  agregarSocio() {
    if (!this.nuevoSocio.nombre || !this.nuevoSocio.email || !this.nuevoSocio.telefono) return;
    this.sociosService.agregarSocio(this.nuevoSocio as Omit<Socio, 'id'>);
    this.nuevoSocio = {};
  }

  eliminarSocio(id: number) {
    this.sociosService.eliminarSocio(id);
  }

  editarSocio(socio: Socio) {
    this.socioEditando = { ...socio };
  }

  guardarEdicion() {
    if (this.socioEditando && this.socioEditando.id !== 0) {
      this.sociosService.editarSocio(this.socioEditando);
    }
    this.cancelarEdicion();
  }

  cancelarEdicion() {
    this.socioEditando = { id: 0, nombre: '', email: '', telefono: '' };
  }
}
