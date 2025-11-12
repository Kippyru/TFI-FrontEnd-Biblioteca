import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { SociosService, Socio, Prestamo } from '../../services/socios.service';

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink],
  templateUrl: './socios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SociosComponent implements OnInit {
  socios: Socio[] = [];
  prestamos: Prestamo[] = [];
  socioSeleccionado: Socio | null = null;
  filtro = '';
  cargando = true;
  error = false;

  constructor(
    private sociosService: SociosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarSocios();
  }

  cargarSocios() {
    this.sociosService.getSocios().subscribe({
      next: (data) => {
        this.socios = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.warn('⚠️ No se pudo conectar al backend, usando datos mock:', err);
        this.error = true;
        this.cargando = false;
        this.socios = [
          { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', activo: true },
          { id: 2, nombre: 'María Gómez', email: 'maria@example.com', activo: true },
          { id: 3, nombre: 'Carlos Ruiz', email: 'carlos@example.com', activo: false },
        ];
        this.cdr.markForCheck();
      },
    });
  }

  get sociosFiltrados(): Socio[] {
    if (!this.filtro.trim()) return this.socios;
    const term = this.filtro.toLowerCase();
    return this.socios.filter(
      (s) =>
        s.nombre.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.id.toString().includes(term)
    );
  }

  seleccionarSocio(socio: Socio) {
    this.socioSeleccionado = socio;
    this.prestamos = [];
    this.cargando = true;
    this.cdr.markForCheck();

    this.sociosService.getPrestamosDeSocio(socio.id).subscribe({
      next: (data) => {
        this.prestamos = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.warn('⚠️ No se pudieron cargar los préstamos, usando mock:', err);
        this.error = true;
        this.cargando = false;
        this.prestamos = [
          { id: 1, libro: '1984', fechaPrestamo: '2025-11-01', devuelto: false },
          { id: 2, libro: 'El Quijote', fechaPrestamo: '2025-10-10', fechaDevolucion: '2025-10-20', devuelto: true },
        ];
        this.cdr.markForCheck();
      },
    });
  }

  volver() {
    this.socioSeleccionado = null;
    this.prestamos = [];
    this.cdr.markForCheck();
  }
}
