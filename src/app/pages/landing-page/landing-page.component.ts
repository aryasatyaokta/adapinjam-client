import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlafonService } from '../../core/service/plafon.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  isFaqOpen: boolean = false;
  isFaqOpen1: boolean = false;
  isFaqOpen2: boolean = false;
  isFaqOpen3: boolean = false;
  isFaqOpen4: boolean = false;
  isFaqOpen5: boolean = false;

  simulasi = {
    jenisPlafon: '',
    amount: 0,
    tenor: 0
  };

  formattedAmount: string = ''; // Untuk tampilan input formatted

  submitSimulasi() {
    this.plafonService.getSimulasi(
      this.simulasi.jenisPlafon,
      this.simulasi.amount,
      this.simulasi.tenor
    ).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Hasil Simulasi',
          html: `
            <p><strong>Jenis Plafon:</strong> ${data.jenisPlafon}</p>
            <p><strong>Jumlah Pinjaman:</strong> Rp${data.amount.toLocaleString()}</p>
            <p><strong>Tenor:</strong> ${data.tenor} bulan</p>
            <p><strong>Bunga:</strong> ${data.bunga}%</p>
            <p><strong>Angsuran per bulan:</strong> Rp${data.angsuran.toLocaleString()}</p>
            <p><strong>Total Pembayaran:</strong> Rp${data.totalPembayaran.toLocaleString()}</p>
            <p><strong>Biaya Admin:</strong> Rp${data.biayaAdmin.toLocaleString()}</p>
            <p><strong>Dana Cair:</strong> Rp${data.danaCair.toLocaleString()}</p>
          `,
          icon: 'info',
          confirmButtonText: 'Tutup'
        });
      },
      error: (err) => {
        Swal.fire('Gagal', err.error, 'error');
      }
    });
  }

  plafonTenors: { [key: string]: number[] } = {
    Bronze: [6, 9, 12, 15],
    Silver: [9, 12, 15, 18],
    Gold: [12, 15, 18, 21],
    Platinum: [15, 18, 21, 24],
    Default: [15, 18, 21, 24]
  };

  getTenorOptions(): number[] {
    return this.plafonTenors[this.simulasi.jenisPlafon] || this.plafonTenors['Default'];
  }

  // 👇 Untuk format input jumlah pinjaman
  onAmountInput(event: any) {
    const input = event.target.value.replace(/[^\d]/g, '');
    const parsed = parseInt(input, 10);
    this.simulasi.amount = isNaN(parsed) ? 0 : parsed;
    this.formattedAmount = this.formatRupiah(input);
  }

  formatRupiah(value: string): string {
    if (!value) return '';
    const number = value.replace(/\D/g, '');
    return 'Rp ' + number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  allowOnlyNumber(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  activeSection: string = 'hero';

  toggleFaq() { this.isFaqOpen = !this.isFaqOpen; }
  toggleFaq1() { this.isFaqOpen1 = !this.isFaqOpen1; }
  toggleFaq2() { this.isFaqOpen2 = !this.isFaqOpen2; }
  toggleFaq3() { this.isFaqOpen3 = !this.isFaqOpen3; }
  toggleFaq4() { this.isFaqOpen4 = !this.isFaqOpen4; }
  toggleFaq5() { this.isFaqOpen5 = !this.isFaqOpen5; }

  plafons: any[] = [];
  visiblePlafons: any[] = [];
  currentIndex = 0;
  itemsPerPage = 1;

  imageUrls: string[] = [
    'assets/img/bronze.png',
    'assets/img/silver.png',
    'assets/img/gold.png',
    'assets/img/platinum.png'
  ];

  constructor(private plafonService: PlafonService) {}

  ngOnInit(): void {
    this.plafonService.getPlafons().subscribe((data) => {
      this.plafons = data;
      this.updateVisiblePlafons();
    });
  }

  updateVisiblePlafons(): void {
    this.visiblePlafons = [this.plafons[this.currentIndex]];
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.plafons.length;
    this.updateVisiblePlafons();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.plafons.length) % this.plafons.length;
    this.updateVisiblePlafons();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    Swal.fire({
      icon: 'info',
      title: 'Perbaikan Aplikasi',
      text: 'Aplikasi sedang dalam perbaikan.',
      confirmButtonText: 'OK'
    });
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    this.activeSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setActive(sectionId: string) {
    this.activeSection = sectionId;
  }
}
