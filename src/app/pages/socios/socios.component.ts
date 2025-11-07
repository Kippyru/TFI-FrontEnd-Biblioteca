import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { SociosService, Socio, Prestamo } from '../../services/socios.service';

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './socios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SociosComponent implements OnInit {
  socios: Socio[] = [];
  filtro = '';
  socioSeleccionado: Socio | null = null;
  prestamos: Prestamo[] = [];
  cargando = true;
  error = false;

  constructor(private sociosService: SociosService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.sociosService.getSocios().subscribe({
      next: (datos) => {
        this.socios = datos;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        console.warn('No se pudo conectar al backend, usando datos de prueba');
        this.socios = [
          { id: 1, nombre: 'Kevin', email: 'kevin@example.com' },
          { id: 2, nombre: 'Alberto Wesker', email: 'AlbertoElW@example.com' },
          { id: 3, nombre: 'Leon Kennedy', email: 'LKennedy@example.com' },
        ];
        this.cargando = false;
        this.error = true;
        this.cdr.markForCheck();
      },
    });
  }

  get sociosFiltrados() {
    const filtro = this.filtro.toLowerCase();
    return this.socios.filter(
      (s) =>
        s.nombre.toLowerCase().includes(filtro) ||
        s.email.toLowerCase().includes(filtro) ||
        s.id.toString().includes(filtro)
    );
  }

  seleccionarSocio(socio: Socio) {
    this.socioSeleccionado = socio;

    // Se deberia poner al backend: this.sociosService.getPrestamosDeSocio(socio.id)
    // Por ahora, datos de prueba:
    this.prestamos = [
      { libro: '1984', fechaPrestamo: '2025-10-01', devuelto: true },
      { libro: 'El Quijote', fechaPrestamo: '2025-10-15', devuelto: false },
    ];
  }

  volver() {
    this.socioSeleccionado = null;
  }
}
