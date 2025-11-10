import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionPrestamosService } from '../../services/gestion-prestamos.service';
import { GestionLibrosService, Libro } from '../../services/gestion-libros.service';
import { GestionSociosService, Socio } from '../../services/gestion-socios.service';

@Component({
  selector: 'app-prestamos-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamos-libros.component.html',
})
export class PrestamosLibrosComponent implements OnInit {
  libros: Libro[] = [];
  socios: Socio[] = [];
  socioSeleccionado: { [idLibro: number]: number | null } = {};

  constructor(
    private prestamosService: GestionPrestamosService,
    private sociosService: GestionSociosService
  ) {}

  ngOnInit() {
    // Traer libros
    this.prestamosService.libros$.subscribe((data) => (this.libros = data));

    // Traer socios
    this.sociosService.socios$.subscribe((data) => {
      this.socios = data;
      console.log('👥 Socios cargados:', data);
    });
  }

  prestarLibro(idLibro: number) {
    const idSocio = this.socioSeleccionado[idLibro];
    if (!idSocio) {
      alert('⚠️ Selecciona un socio antes de prestar el libro.');
      return;
    }
    this.prestamosService.prestarLibro(idLibro, idSocio);
    this.socioSeleccionado[idLibro] = null;
  }

  devolverLibro(idLibro: number) {
    this.prestamosService.devolverLibro(idLibro);
  }

  obtenerNombreSocio(id?: number | null): string {
    if (!id) return '—';
    const socio = this.socios.find((s) => s.id === id);
    return socio ? socio.nombre : 'Desconocido';
  }
}