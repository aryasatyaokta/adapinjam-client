import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PengajuanMarketingService } from '../../../../core/service/pengajuan-marketing.service';

@Component({
  standalone: true,
  selector: 'app-marketing',
  imports: [CommonModule],
  templateUrl: './dashboard-marketing.component.html',
  styleUrls: ['./dashboard-marketing.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardMarketingComponent implements OnInit {
  totalToReview = 0;
  totalDisbursed = 0;
  loading = true;

  constructor(private pengajuanService: PengajuanMarketingService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.pengajuanService.getReviewHistory().subscribe(data => {
      this.totalToReview = data.length;
    });

    this.pengajuanService.getMyReviewedPengajuan().subscribe(data => {
      this.totalDisbursed = data.filter(item => item.status === 'DISBURSEMENT').length;
      this.loading = false;
    });
  }
}
