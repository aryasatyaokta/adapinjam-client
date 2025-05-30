// core/service/pengajuan-marketing.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PengajuanMarketingService {
  // private baseUrl = 'http://35.223.1.74/be/api/v1/pengajuan';
  private baseUrl = 'http://35.223.1.74/be/api/v1/pengajuan';

  private notifikasiTrigger = new BehaviorSubject<void>(undefined);
  notifikasiTrigger$ = this.notifikasiTrigger.asObservable();


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  triggerNotifikasiRefresh() {
    this.notifikasiTrigger.next(); // untuk trigger refresh
  }

  getReviewHistory(headers?: HttpHeaders): Observable<any[]> {
    const token = this.authService.getToken();
    const finalHeaders = headers ?? new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get<any[]>(`${this.baseUrl}/review-history`, { headers: finalHeaders });
  }
  

  reviewPengajuan(pengajuanId: string, data: { approved: boolean; catatan: string }): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.post(`${this.baseUrl}/review`, {
      pengajuanId: pengajuanId, // bisa optional, tergantung di backend kamu
      approved: data.approved,
      catatan: data.catatan,
    }, { headers });
  }

  getMyReviewedPengajuan(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any[]>(`${this.baseUrl}/my-reviewed-pengajuan`, { headers });
  }
  
  
  
}
