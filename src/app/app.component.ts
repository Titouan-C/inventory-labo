import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoneModule } from './mone/mone.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MoneModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Use styleUrls instead of styleUrl
})
export class AppComponent {
  title = 'inventory-labo';
}
