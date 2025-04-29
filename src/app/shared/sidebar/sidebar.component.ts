import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit {
  features: string[] = [];

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    const features = this.auth.getFeature();
    if (features) {
      this.features = JSON.parse(features);
    }
  }

  hasFeature(feature: string): boolean {
    const features = JSON.parse(localStorage.getItem('features') || '[]');
    return features.includes(feature);  // Periksa jika 'feature' ada dalam array 'features'
  }
}
