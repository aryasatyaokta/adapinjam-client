import { Component, OnInit } from '@angular/core';
import { PengajuanMarketingService } from '../../../core/service/pengajuan-marketing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-pengajuan-marketing',
  templateUrl: './history-pengajuan-marketing.component.html',
  styleUrls: ['./history-pengajuan-marketing.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HistoryPengajuanMarketingComponent implements OnInit {
  historyData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private pengajuanService: PengajuanMarketingService) {}

  ngOnInit(): void {
    this.loadHistoryData();
  }

  loadHistoryData(): void {
    this.pengajuanService.getMyReviewedPengajuan().subscribe({
      next: (data) => {
        console.log('History:', data);
        this.historyData = data;
      },
      error: (err) => {
        console.error('Gagal memuat history:', err);
      },
    });
  }

  paginatedData(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.historyData.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.historyData.length / this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
