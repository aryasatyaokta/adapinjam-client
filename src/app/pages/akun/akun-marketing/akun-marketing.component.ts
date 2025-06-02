import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { PegawaiService } from '../../../core/service/pegawai.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-akun-marketing',
  templateUrl: './akun-marketing.component.html',
  styleUrls: ['./akun-marketing.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AkunMarketingComponent implements OnInit {
  userData: any = null;
  loading = true;
  oldPassword: string = '';
  newPassword: string = '';

  showPasswordLama: boolean = false;
  showPasswordBaru: boolean = false;

  constructor(
    private authService: AuthService,
    private pegawaiService: PegawaiService
  ) {}

  ngOnInit(): void {
    this.fetchUserEmployee();
  }

  fetchUserEmployee(): void {
    this.pegawaiService.getCurrentEmployee().subscribe({
      next: (data) => {
        this.userData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Gagal memuat data akun:', err);
        this.loading = false;
      }
    });
  }

  updatePassword(): void {
  if (!this.oldPassword.trim() || !this.newPassword.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Field tidak boleh kosong',
      text: 'Harap isi password lama dan password baru.',
      confirmButtonText: 'Oke',
    });
    return;
  }

  if (this.newPassword.length < 6) {
    Swal.fire({
      icon: 'warning',
      title: 'Password Terlalu Pendek',
      text: 'Password baru minimal harus 6 karakter.',
      confirmButtonText: 'Oke',
    });
    return;
  }

  this.authService.updatePassword(this.oldPassword, this.newPassword).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Password berhasil diubah. Silakan login ulang.',
        confirmButtonText: 'Oke',
      }).then(() => {
        const modalElement = document.getElementById('updatePasswordModal');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
          modalInstance.hide();
        }
        this.authService.logout();
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengubah Password',
        text: err.error || 'Terjadi kesalahan saat mengubah password.',
        confirmButtonText: 'Coba Lagi',
      });
    }
  });
}

}
