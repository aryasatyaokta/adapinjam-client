import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/service/auth.service';
import { PengajuanMarketingService } from '../../core/service/pengajuan-marketing.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-layout-sa',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './layout-sa.component.html',
  styleUrl: './layout-sa.component.css'
})
export class LayoutSaComponent {
  username: string | null = null;
  jumlahNotifikasi: number = 0;

  constructor(
    public auth: AuthService,
    private pengajuanService: PengajuanMarketingService,
    private router: Router
  ) {
    this.username = this.auth.getUsername();
  }

  ngOnInit(): void {
    this.cekNotifikasi();
    this.pengajuanService.notifikasiTrigger$.subscribe(() => {
      this.cekNotifikasi();
    });
  }
  

  ngAfterViewInit(): void {
    const toggleButton = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');

    toggleButton?.addEventListener('click', () => {
      wrapper?.classList.toggle('toggled');
    });
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  cekNotifikasi(): void {
    this.pengajuanService.getReviewHistory().subscribe({
      next: (data) => {
        this.jumlahNotifikasi = data.length;
      },
      error: (err) => {
        console.error('Gagal memuat notifikasi:', err);
      },
    });
  }

  goToPengajuan(): void {
    this.router.navigate(['/pengajuan']);
  }

  logout(): void {
    this.auth.logout();
  }
}
