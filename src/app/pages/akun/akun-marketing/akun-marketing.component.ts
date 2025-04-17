import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
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
          alert('Password berhasil diubah. Silakan login ulang.');
  
          // Tutup modal dengan cara aman
          const modalElement = document.getElementById('updatePasswordModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement); // ini aman
            modalInstance.hide();
          }
  
          this.authService.logout();
        },
        error: (err) => {
          alert(err.error || 'Gagal memperbarui password.');
        },
      });
  }
  
  
}
