// core/components/pengajuan-marketing.component.ts
import { Component, OnInit } from '@angular/core';
import { PengajuanMarketingService } from '../../core/service/pengajuan-marketing.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pengajuan-marketing',
  templateUrl: './pengajuan-marketing.component.html',
  styleUrls: ['./pengajuan-marketing.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PengajuanMarketingComponent implements OnInit {
  reviewData: any[] = [];
  selectedItem: any = null;
  selectedReviewItem: any = null;
  reviewCatatan: string = '';
  isApproved: boolean = true; // Untuk menyimpan data yang akan ditampilkan di modal
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private pengajuanService: PengajuanMarketingService,
  ) {}

  ngOnInit(): void {
    this.loadReviewData();
  }

  paginatedData(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.reviewData.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages(): number {
    return Math.ceil(this.reviewData.length / this.itemsPerPage) || 1;
  }
  
  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  loadReviewData(): void {
    this.pengajuanService.getReviewHistory().subscribe({
      next: (data) => {
        console.log('Data review:', data);
        this.reviewData = data;
      },
      error: (err) => {
        console.error('Gagal memuat data review:', err);
      },
    });
  }

  openDetailModal(item: any): void {
    this.selectedItem = item;
  }

  handleReview(pengajuanId: string): void {
    this.selectedReviewItem = pengajuanId;
    this.reviewCatatan = ''; // Reset catatan
    const reviewModal = new (window as any).bootstrap.Modal(document.getElementById('reviewModal'));
    reviewModal.show();
  }
  
  submitReview(isApproved: boolean): void {
    if (!this.selectedReviewItem) return;
  
    // Validasi input catatan
    if (!this.reviewCatatan.trim()) {
      Swal.fire({
        title: 'Catatan Tidak Boleh Kosong',
        text: 'Silakan isi catatan sebelum mengirim review.',
        icon: 'warning',
        confirmButtonText: 'Oke',
      });
      return;
    }
  
    // Menampilkan konfirmasi untuk menyetujui review
    Swal.fire({
      title: 'Konfirmasi Review',
      text: 'Apakah Anda yakin ingin mengirim review ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Kirim Review',
      cancelButtonText: 'Tidak',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pengajuanService.reviewPengajuan(this.selectedReviewItem, {
          approved: isApproved,
          catatan: this.reviewCatatan,
        }).subscribe({
          next: () => {
            this.onReviewSuccess();
          },
          error: (err) => {
            console.error('Gagal review:', err);
  
            if (err?.error?.message?.includes('sudah diproses') || err?.status === 200) {
              this.onReviewSuccess();
            } else {
              Swal.fire({
                title: 'Terjadi Kesalahan',
                text: 'Gagal mengirim review. Silakan coba lagi.',
                icon: 'error',
                confirmButtonText: 'Coba Lagi',
              });
            }
          },
        });
      }
    });
  }
  
  
  
  private onReviewSuccess(): void {
    Swal.fire({
      title: 'Review Berhasil Dikirim',
      text: 'Review Anda berhasil dikirim. Data akan diperbarui.',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  
    // Reset state and refresh data
    this.selectedReviewItem = null;
    this.reviewCatatan = '';
    this.loadReviewData();
    this.pengajuanService.triggerNotifikasiRefresh();
  
    // Hide the modal after review submission
    const reviewModalEl = document.getElementById('reviewModal');
    const modal = new (window as any).bootstrap.Modal(reviewModalEl);
    modal.hide();
  }  
  
}
