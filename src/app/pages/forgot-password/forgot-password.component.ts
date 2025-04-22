import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  form: FormGroup;
  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      nip: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
  
    const { nip } = this.form.value;
  
    this.auth.requestPasswordReset(nip).subscribe({
      next: (res) => {
        // Show success notification
        Swal.fire({
          title: 'Permintaan Reset Berhasil',
          text: 'Silakan tunggu email dari admin untuk melanjutkan proses reset password.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
  
        this.message = 'Permintaan reset berhasil. Silakan tunggu email dari admin.';
        this.error = null;
      },
      error: (err) => {
        // Show error notification
        Swal.fire({
          title: 'Terjadi Kesalahan',
          text: 'Gagal mengirim permintaan reset password. Pastikan NIP Anda benar.',
          icon: 'error',
          confirmButtonText: 'Coba Lagi'
        });
  
        this.error = err;
        this.message = null;
      }
    });
  }
  
}
