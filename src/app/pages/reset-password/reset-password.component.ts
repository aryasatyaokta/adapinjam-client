import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  token: string | null = null;
  message: string | null = null;
  error: string | null = null;

  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onSubmit() {
    if (this.form.invalid || !this.token) return;
  
    const { newPassword, confirmPassword } = this.form.value;
  
    if (newPassword !== confirmPassword) {
      this.error = 'Password tidak sama';
      Swal.fire({
        title: 'Password Tidak Sama',
        text: 'Pastikan konfirmasi password Anda sesuai dengan password baru.',
        icon: 'error',
        confirmButtonText: 'Coba Lagi',
      });
      return;
    }
  
    this.auth.resetPassword(this.token, newPassword, confirmPassword).subscribe({
      next: () => {
        // Show success notification
        Swal.fire({
          title: 'Password Berhasil Direset',
          text: 'Password Anda berhasil direset. Silakan login kembali.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
  
        this.message = 'Password berhasil direset. Silakan login kembali.';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        // Show error notification
        Swal.fire({
          title: 'Terjadi Kesalahan',
          text: 'Gagal mereset password. Pastikan token reset valid.',
          icon: 'error',
          confirmButtonText: 'Coba Lagi',
        });
  
        this.error = err;
      },
    });
  }
  
}
