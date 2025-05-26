import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { PengajuanMarketingService } from '../../core/service/pengajuan-marketing.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  username: string | null = null;
  jumlahNotifikasi: number = 0;
  features: string[] = [];

  constructor(
    public auth: AuthService,
    private pengajuanService: PengajuanMarketingService,
    private router: Router
  ) {
    this.username = this.auth.getUsername();
  }

  ngOnInit(): void {
    // this.cekNotifikasi();
    this.loadFeatures();
    // this.pengajuanService.notifikasiTrigger$.subscribe(() => {
    //   this.cekNotifikasi();
    // });
  }

  // cekNotifikasi(): void {
  //   this.pengajuanService.getReviewHistory().subscribe({
  //     next: (data) => {
  //       this.jumlahNotifikasi = data.length;
  //     },
  //     error: (err) => {
  //       console.error('Gagal memuat notifikasi:', err);
  //     },
  //   });
  // }

  loadFeatures(): void {
    const features = this.auth.getFeature();
    if (features) {
      this.features = JSON.parse(features);
    }
  }

  goToPengajuan(): void {
    this.router.navigate(['/pengajuan']);
  }

  logout(): void {
  Swal.fire({
    title: 'Konfirmasi Logout',
    text: 'Apakah Anda yakin ingin keluar dari aplikasi?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Keluar',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      this.auth.logout();
    }
  });
}
}
