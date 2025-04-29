import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PengajuanMarketingService } from '../../core/service/pengajuan-marketing.service';

@Component({
  standalone: true,
  selector: 'app-sa',
  imports: [CommonModule],
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent {
 
}
