import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/api/v1/roles'; // URL endpoint for roles
  private featuresUrl = 'http://localhost:8080/api/v1/features'; // URL endpoint for features

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllRoles(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getRoleById(id: number): Observable<any> {
    return forkJoin({
      role: this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }),
      features: this.http.get<any>(`${this.apiUrl}/${id}/features`, { headers: this.getAuthHeaders() })
    });
  }

  createRoleWithFeatures(role: any, featureIds: number[]): Observable<any> {
    const data = {
      name: role.name,
      featureIds: featureIds
    };
    return this.http.post(`${this.apiUrl}/add`, data, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'
    });
    
  }

  updateRoleWithFeatures(id: number, role: any, featureIds: number[]): Observable<any> {
    const data = {
      name: role.name,
      featureIds: featureIds
    };
    return this.http.put(`${this.apiUrl}/edit/${id}`, data, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'
    });    
  }

  getFeaturesByRole(roleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${roleId}/features`, { headers: this.getAuthHeaders() });
  }

  getAllFeatures(): Observable<any> {
    return this.http.get<any>(this.featuresUrl, { headers: this.getAuthHeaders() });
  }
}
