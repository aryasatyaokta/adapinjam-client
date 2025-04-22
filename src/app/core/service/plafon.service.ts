import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Plafon {
  idPlafon: number;
  jenisPlafon: string;
  jumlahPlafon: number;
  bunga: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlafonService {
  private baseUrl = 'http://localhost:8080/api/v1/plafon';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asumsikan token disimpan di localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllPlafons(): Observable<Plafon[]> {
    return this.http.get<Plafon[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  createPlafon(plafon: Partial<Plafon>): Observable<Plafon> {
    return this.http.post<Plafon>(this.baseUrl, plafon, { headers: this.getAuthHeaders() });
  }

  updatePlafon(id: number, plafon: Partial<Plafon>): Observable<Plafon> {
    return this.http.put<Plafon>(`${this.baseUrl}/update/${id}`, plafon, { headers: this.getAuthHeaders() });
  }
}
