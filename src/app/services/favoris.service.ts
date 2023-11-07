import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favoris } from '../models/favoris';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  urlApi: string = 'http://localhost:3000/favoris';
  recipes: Favoris[] = [];

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }



  constructor(private http: HttpClient) { }




  getAllFavoris(): Observable<Favoris[]> {
    return this.http.get<Favoris[]>(`${this.urlApi}`, {
      headers: this.getHeaders(),
    });
  }

  getFavorisById(id: number): Observable<Favoris> {
    return this.http.get<Favoris>(`${this.urlApi}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addFavoris(favoris: Favoris): Observable<Favoris> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.post<Favoris>(`${this.urlApi}`, favoris, {
      headers: headers,
    });
  }

  modifyFavoris(
    id: number,
    updateData: Partial<Favoris>
  ): Observable<Partial<Favoris>> {
    return this.http.patch<Favoris>(`${this.urlApi}/${id}`, updateData, {
      headers: this.getHeaders(),
    });
  }

  deleteFavoris(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`${this.urlApi}/${id}`, {
      headers: headers,
    });
  }

}
