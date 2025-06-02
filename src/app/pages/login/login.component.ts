import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule, FormsModule],
})
export class LoginComponent {
  
  form: FormGroup;
  error: string | null = null;

  oldPassword: string = '';
  newPassword: string = '';

  showPassword: boolean = false;
  showPasswordLama: boolean = false;
  showPasswordBaru: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // FormBuilder initialized here
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();

    Swal.fire({
      icon: 'warning',
      title: 'Form Belum Lengkap',
      text: 'Silakan isi NIP dan Password sebelum login.',
    });
    return;
  }

  const { username, password } = this.form.value;

  this.auth.login(username!, password!).subscribe({
    next: (res) => {
      this.auth.setSession(res.token);

      // Cek apakah token dikirim tapi status 403
      if (this.auth.getToken() && this.auth.getRole() === null) {
        // Tampilkan SweetAlert dan buka modal update password
        Swal.fire({
          icon: 'info',
          title: 'Update Password',
          text: 'Silakan update password anda terlebih dahulu.',
          showConfirmButton: true,
        }).then(() => {
          const modalElement = document.getElementById('updatePasswordModal');
          if (modalElement) {
            const bsModal = new bootstrap.Modal(modalElement);
            bsModal.show();
          }
        });
        return;
      }

      // Jika role tersedia → login normal
      const role = this.auth.getRole();
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['/dashboard']);
      });
    },
    error: (err) => {
      console.error('Login error response:', err);
      if (err.status === 403 && err.error?.token) {
        this.auth.setSession(err.error.token); // simpan token
        Swal.fire({
          icon: 'info',
          title: 'Update Password',
          text: 'Silakan update password anda terlebih dahulu.',
          showConfirmButton: true,
        }).then(() => {
          const modalElement = document.getElementById('updatePasswordModal');
          if (modalElement) {
            const bsModal = new bootstrap.Modal(modalElement);
            bsModal.show();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: 'NIP atau password salah!',
        });
      }
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

    this.auth.updatePassword(this.oldPassword, this.newPassword).subscribe({
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
          this.auth.logout();
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Mengubah Password',
          text: err || 'Terjadi kesalahan saat mengubah password.',
          confirmButtonText: 'Coba Lagi',
        });
      }
    });
  }
}
