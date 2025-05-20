import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // pastikan path-nya benar

@Injectable({
  providedIn: 'root'
})
export class PegawaiService {
  // private apiUrl = 'http://35.223.1.74/be/api/v1/user-employee';
  private apiUrl = 'http://localhost:8080/be/api/v1/user-employee';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllEmployees(headers?: HttpHeaders): Observable<any> {
    const finalHeaders = headers ?? this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/all`, { headers: finalHeaders });
  }  

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, employee, { headers: this.getAuthHeaders() });
  }

  updateEmployee(id: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedData, { headers: this.getAuthHeaders() });
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }
}
