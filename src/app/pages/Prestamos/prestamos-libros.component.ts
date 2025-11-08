import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionPrestamosService } from '../../services/gestion-prestamos.service';
import { GestionLibrosService, Libro } from '../../services/gestion-libros.service';

@Component({
  selector: 'app-prestamos-libros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prestamos-libros.component.html',
})
export class PrestamosLibrosComponent implements OnInit {
  libros: Libro[] = [];

  constructor(
    private prestamosService: GestionPrestamosService,
    private librosService: GestionLibrosService
  ) {}

  ngOnInit() {
    console.log('✅ PrestamosLibrosComponent cargado correctamente');

    this.prestamosService.libros$.subscribe((data: Libro[]) => {
      console.log('📚 Libros recibidos:', data);
      this.libros = data;
    });
  }

  prestarLibro(id: number) {
    console.log('📕 Prestando libro con ID:', id);
    this.prestamosService.prestarLibro(id);
  }

  devolverLibro(id: number) {
    console.log('🔁 Devolviendo libro con ID:', id);
    this.prestamosService.devolverLibro(id);
  }
}
