import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserEmployee();
  }

  fetchUserEmployee(): void {
    const token = localStorage.getItem('token'); // atau wherever kamu simpan token
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    this.http.get<any>('http://localhost:8080/api/v1/user-employee/get-employee', { headers }).subscribe({
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

  updatePassword() {
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
  
    const token = this.authService.getToken();
    if (!token) return;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    this.http
      .put(
        'http://localhost:8080/api/v1/auth/update-password',
        {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        },
        { headers, responseType: 'text' }
      )
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Password berhasil diubah. Silakan login ulang.',
            confirmButtonText: 'Oke',
          }).then(() => {
            // Tutup modal
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
        },
      });
  }
  
  
}
