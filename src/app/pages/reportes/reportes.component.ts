import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './reportes.component.html',
})
export class ReportesComponent implements OnInit {
  
  // Datos del gráfico
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'bottom' },
      title: { display: true, text: '📚 Libros más prestados' },
    },
  };

  barChartLabels: string[] = ['1984', 'El Principito', 'Don Quijote', 'Cien Años de Soledad', 'It'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartConfiguration['data']['datasets'] = [
    {
      data: [12, 19, 7, 14, 9],
      label: 'Cantidad de préstamos',
      backgroundColor: '#4f46e5',
    },
  ];

  ngOnInit(): void {
    
    // this.reportesService.obtenerLibrosMasPrestados().subscribe(...)
  }
}
