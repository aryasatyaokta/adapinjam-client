import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
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
    private http: HttpClient
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
      const payload = {
        token: this.token,
        newPassword: this.form.value.newPassword,
      };

      // this.http.post('http://35.223.1.74/be/api/v1/auth/reset-password', payload, { responseType: 'text' }).subscribe({
      this.http.post('http://35.223.1.74/be/api/v1/auth/reset-password', payload, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('Response:', response); // debug

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

          this.message = null;
        },
        error: (err) => {
          console.error('Error:', err);
          const errorMessage = typeof err.error === 'string' ? err.error : 'Reset password gagal.';
          this.error = errorMessage;
          this.message = null;
        }
      });
    }
  });
}
}
