import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password-cust',
  templateUrl: './reset-password-cust.component.html',
  imports: [RouterModule, ReactiveFormsModule, CommonModule]
})
export class ResetPasswordCustComponent {
  form: FormGroup;
  message: string | null = null;
  error: string | null = null;
  token: string = '';

  constructor(
  private fb: FormBuilder,
  private route: ActivatedRoute,
  private auth: AuthService // pakai AuthService, bukan langsung HttpClient
) {
  this.form = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  this.token = this.route.snapshot.queryParamMap.get('token') || '';
}


  onSubmit(): void {
  if (this.form.invalid || !this.token) return;

  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Password Anda akan diubah.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, ubah password!'
  }).then((result) => {
    if (result.isConfirmed) {
      const newPassword = this.form.value.newPassword;

      this.auth.resetPasswordCust(this.token, newPassword).subscribe({
        next: (response) => {
          if (response.includes('successfully')) {
            Swal.fire({
              icon: 'success',
              title: 'Password berhasil diubah',
              text: 'Silakan login di aplikasi Ada Pinjam.',
              confirmButtonText: 'OK',
              timer: 3000,
              timerProgressBar: true
            });
          } else {
            this.error = response;
          }
        },
        error: (err) => {
          const errorMessage = typeof err === 'string' ? err : 'Reset password gagal.';
          this.error = errorMessage;
        }
      });
    }
  });
}

}
