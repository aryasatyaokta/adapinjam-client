import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // private baseUrl = 'http://35.223.1.74/be/api/v1/customer';
  private baseUrl = 'http://35.223.1.74/be/api/v1/customer';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllCustomers(headers?: HttpHeaders): Observable<any[]> {
    const finalHeaders = headers ?? this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/all`, { headers: finalHeaders });
  }

  getCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`,{ headers: this.getAuthHeaders() });
  }
  
}
