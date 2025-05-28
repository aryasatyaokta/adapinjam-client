import { Component, OnInit } from '@angular/core';
import { PengajuanMarketingService } from '../../../core/service/pengajuan-marketing.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history-pengajuan-marketing',
  templateUrl: './history-pengajuan-marketing.component.html',
  styleUrls: ['./history-pengajuan-marketing.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class HistoryPengajuanMarketingComponent implements OnInit {
  historyData: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
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
        this.filteredData = data;
      },
      error: (err) => {
        console.error('Gagal memuat history:', err);
      },
    });
  }

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredData = this.historyData.filter(item =>
      item.customerName.toLowerCase().includes(term) ||
      new Date(item.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  paginatedData(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
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
