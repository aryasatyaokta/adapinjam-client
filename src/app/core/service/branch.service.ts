// src/app/services/branch.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  // private apiUrl = 'http://35.223.1.74/be/api/v1/branches';
   private apiUrl = 'http://35.223.1.74/be/api/v1/branches';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asumsikan token disimpan di localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllBranches(headers?: HttpHeaders): Observable<any> {
    const finalHeaders = headers ?? this.getAuthHeaders();
    return this.http.get<any>(this.apiUrl, { headers: finalHeaders });
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
