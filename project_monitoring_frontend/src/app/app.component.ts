import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from './core/health.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'project_monitoring_frontend';
  healthMessage = 'Checking backend...';

  constructor(private health: HealthService) {}

  ngOnInit(): void {
    this.health.ping().subscribe((msg) => {
      this.healthMessage = msg;
    });
  }
}
