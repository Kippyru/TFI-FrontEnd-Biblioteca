import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionPrestamosService, Prestamo } from '../../services/gestion-prestamos.service';
import { GestionSociosService, Socio } from '../../services/gestion-socios.service';
import { LibrosService, Libro } from '../../services/libros.service';

@Component({
  selector: 'app-prestamos-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamos-libros.component.html',
})
export class PrestamosLibrosComponent implements OnInit {
  prestamos: Prestamo[] = [];
  socios: Socio[] = [];
  librosDisponibles: Libro[] = [];
  nuevoPrestamo = {
    libroId: null as number | null,
    socioId: null as number | null,
    fechaDevolucionEstimada: ''
  };

  constructor(
    private prestamosService: GestionPrestamosService,
    private librosService: LibrosService,       // ✅ CORRECTO
    private sociosService: GestionSociosService // ✅ CORRECTO
  ) {}

  ngOnInit() {
    this.cargarPrestamosActivos();
    this.cargarSocios();
    this.cargarLibrosDisponibles();
  }

  cargarPrestamosActivos() {
    this.prestamosService.getPrestamosActivos().subscribe({
      next: (data) => {
        this.prestamos = data;
      },
      error: (err) => console.error('Error cargando préstamos activos:', err),
    });
  }

  cargarSocios() {
    this.sociosService.getSocios().subscribe({
      next: (data) => {
        this.socios = data;
      },
      error: (err) => console.error('Error cargando socios:', err),
    });
  }

  cargarLibrosDisponibles() {
    this.librosService.getLibrosDisponibles().subscribe({
      next: (data) => (this.librosDisponibles = data),
      error: (err) => console.error('Error cargando libros disponibles:', err),
    });
  }

  prestarLibro() {
    if (!this.nuevoPrestamo.libroId || !this.nuevoPrestamo.socioId || !this.nuevoPrestamo.fechaDevolucionEstimada) {
      alert('Por favor, completa todos los campos para prestar un libro.');
      return;
    }

    this.prestamosService.crearPrestamo(this.nuevoPrestamo).subscribe({
      next: (prestamoNuevo) => {
        alert('Préstamo creado con éxito.');
        this.nuevoPrestamo = { libroId: null, socioId: null, fechaDevolucionEstimada: '' };
        this.cargarPrestamosActivos();
        this.cargarLibrosDisponibles();
      },
      error: (err) => console.error('Error creando préstamo:', err),
    });
  }

  devolverLibro(idPrestamo: number) {
    const observacion = prompt('Observaciones opcionales sobre el estado del libro al devolver:') || '';

    this.prestamosService.devolverLibro(idPrestamo, observacion).subscribe({
      next: () => {
        alert('Libro devuelto con éxito.');
        this.cargarPrestamosActivos();
        this.cargarLibrosDisponibles();
      },
      error: (err) => console.error('Error devolviendo libro:', err),
    });
  }

  renovarLibro(idPrestamo: number) {
    const dias = prompt('Ingrese la cantidad de días para renovar el préstamo:', '15');
    const diasNum = Number(dias);
    if (isNaN(diasNum) || diasNum <= 0) {
      alert('Por favor, ingrese un número válido de días.');
      return;
    }

    this.prestamosService.renovarPrestamo(idPrestamo, diasNum).subscribe({
      next: () => {
        alert(`Préstamo renovado por ${diasNum} días.`);
        this.cargarPrestamosActivos();
      },
      error: (err) => console.error('Error renovando préstamo:', err),
    });
  }

  eliminarPrestamo(idPrestamo: number) {
    if (!confirm('¿Está seguro de que desea eliminar este préstamo?')) return;

    this.prestamosService.eliminarPrestamo(idPrestamo).subscribe({
      next: () => {
        alert('Préstamo eliminado con éxito.');
        this.cargarPrestamosActivos();
        this.cargarLibrosDisponibles();
      },
      error: (err) => console.error('Error eliminando préstamo:', err),
    });
  }

  obtenerNombreSocio(id?: number | null): string {
    if (!id) return '—';
    const socio = this.socios.find((s) => s.id === id);
    return socio ? `${socio.nombre} ${socio.apellido}` : 'Desconocido';
  }
}
