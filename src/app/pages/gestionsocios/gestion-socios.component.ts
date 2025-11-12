import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionSociosService, Socio } from '../../services/gestion-socios.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-gestion-socios',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './gestion-socios.component.html',
})
export class GestionSociosComponent implements OnInit {
  socios: Socio[] = [];
  socioEditando: Socio | null = null;
  nuevoSocio: Socio = this.inicializarSocio();
  cargando = true;
  error = false;

  constructor(
    private sociosService: GestionSociosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarSocios();
  }

  cargarSocios() {
    this.cargando = true;
    this.error = false;
    this.sociosService.getSocios().subscribe({
      next: (data) => {
        this.socios = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar socios:', err);
        this.error = true;
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });
  }

  inicializarSocio(): Socio {
    return {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      activo: true,
    };
  }

  agregarSocio() {
    if (!this.nuevoSocio.nombre || !this.nuevoSocio.apellido || !this.nuevoSocio.email) {
      alert('Por favor complete los campos obligatorios (nombre, apellido y email)');
      return;
    }

    this.sociosService.crearSocio(this.nuevoSocio).subscribe({
      next: (nuevo) => {
        this.socios.push(nuevo);
        this.nuevoSocio = this.inicializarSocio();
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al agregar socio:', err),
    });
  }

  editarSocio(socio: Socio) {
    this.socioEditando = { ...socio };
  }

  guardarEdicion() {
    if (!this.socioEditando) return;

    this.sociosService.actualizarSocio(this.socioEditando.id, this.socioEditando).subscribe({
      next: (actualizado) => {
        const index = this.socios.findIndex((s) => s.id === actualizado.id);
        if (index !== -1) this.socios[index] = actualizado;
        this.socioEditando = null;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al actualizar socio:', err),
    });
  }

  cancelarEdicion() {
    this.socioEditando = null;
  }

  desactivarSocio(socio: Socio) {
    if (!socio.activo) return;
    if (!confirm(`¿Desea desactivar al socio ${socio.nombre} ${socio.apellido}?`)) return;

    this.sociosService.desactivarSocio(socio.id).subscribe({
      next: () => {
        socio.activo = false;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al desactivar socio:', err),
    });
  }

  eliminarSocio(id: number) {
    if (!confirm('¿Está seguro que desea eliminar este socio?')) return;

    this.sociosService.eliminarSocio(id).subscribe({
      next: () => {
        this.socios = this.socios.filter((s) => s.id !== id);
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al eliminar socio:', err),
    });
  }
}
