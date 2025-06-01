import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Feature {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  // private baseUrl = 'http://34.58.106.240/be/api/v1/features';
  private baseUrl = 'http://34.58.106.240/be/api/v1/features';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllFeatures(headers?: HttpHeaders): Observable<Feature[]> {
    const finalHeaders = headers ?? new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  
    return this.http.get<Feature[]>(this.baseUrl, { headers: finalHeaders });
  }
  
}
