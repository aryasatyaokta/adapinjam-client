import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/service/auth.service'; // sesuaikan path ke AuthService

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  imports: [CommonModule],
  standalone: true
})
export class VerifyEmailComponent implements OnInit {
  status: 'loading' | 'success' | 'error' | 'invalid' = 'loading';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (!token) {
        this.status = 'invalid';
        return;
      }

      this.auth.verifyEmail(token).subscribe({
        next: () => {
          this.status = 'success';
        },
        error: () => {
          this.status = 'error';
        }
      });
    });
  }
}
