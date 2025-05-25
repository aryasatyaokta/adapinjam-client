import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/service/dashboards.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {
  totalStats = {
    totalBranches: 0,
    totalCustomers: 0,
    totalEmployees: 0,
    totalPengajuan: 0,
    totalRiwayatPengajuan: 0,
    totalRoles: 0,
    totalPlafon: 0,
    totalFeatures: 0
  };

  private features: string[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.features = JSON.parse(localStorage.getItem('features') || '[]');
    this.dashboardService.getDashboardStats(this.features).subscribe(stats => {
      this.totalStats = stats;
    });
  }

  hasFeature(feature: string): boolean {
    return this.features.includes(feature);
  }
}
