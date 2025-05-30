import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Plafon {
  idPlafon: number;
  jenisPlafon: string;
  jumlahPlafon: number;
  bunga: number;
  deleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PlafonService {
  // private baseUrl = 'http://35.223.1.74/be/api/v1/plafon';
  private baseUrl = 'http://35.223.1.74/be/api/v1/plafon';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asumsikan token disimpan di localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllPlafons(headers?: HttpHeaders): Observable<Plafon[]> {
    const finalHeaders = headers ?? this.getAuthHeaders();
    return this.http.get<Plafon[]>(this.baseUrl, { headers: finalHeaders });
  }

  getPlafons(): Observable<Plafon[]> {
    return this.http.get<Plafon[]>(`${this.baseUrl}/all`);
  }

  createPlafon(plafon: Partial<Plafon>): Observable<Plafon> {
    return this.http.post<Plafon>(this.baseUrl, plafon, { headers: this.getAuthHeaders() });
  }

  updatePlafon(id: number, plafon: Partial<Plafon>): Observable<Plafon> {
    return this.http.put<Plafon>(`${this.baseUrl}/update/${id}`, plafon, { headers: this.getAuthHeaders() });
  }

  deletePlafon(id: number): Observable<Plafon> {
    return this.http.delete<Plafon>(`${this.baseUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }  

  getSimulasi(jenisPlafon: string, amount: number, tenor: number): Observable<any> {
    const params = {
      jenisPlafon: jenisPlafon,
      amount: amount.toString(),
      tenor: tenor.toString()
    };
    return this.http.get('http://35.223.1.74/be/api/v1/pengajuan/simulasi', { params });
  }

}
