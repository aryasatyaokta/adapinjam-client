// src/app/services/branch.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'http://localhost:8080/api/v1/branches'; // URL sesuai dengan endpoint yang kamu beri

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asumsikan token disimpan di localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllBranches(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getBranchById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createBranch(branch: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, branch, { headers: this.getAuthHeaders() });
  }

  updateBranch(id: string, branch: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, branch, { headers: this.getAuthHeaders() });
  }

  deleteBranch(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
