import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  imports:[CommonModule]
})
export class VerifyEmailComponent implements OnInit {
  status: 'loading' | 'success' | 'error' | 'invalid' = 'loading';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (!token) {
        this.status = 'invalid';
        return;
      }

      // this.http.get(`http://34.58.106.240/be/api/v1/auth/verify-email?token=${token}`).subscribe({
      this.http.get(`http://34.58.106.240/be/api/v1/auth/verify-email?token=${token}`).subscribe({
        next: () => {
          this.status = 'success';
        },
        error: () => {
          this.status = 'success';
        }
      });
    });
  }
}
