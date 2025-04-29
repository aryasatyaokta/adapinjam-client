import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
})
export class LoginComponent {
  
  form: FormGroup;
  error: string | null = null;

  constructor(
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
      this.form.markAllAsTouched(); // Menandai semua field agar validasi tampil
  
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
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: 'NIP atau password salah!',
        });
      },
    });
  }
  
  
}
