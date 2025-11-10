import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NavbarComponent } from './pages/nav-bar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TFILiberiaFrontEnd');

}
