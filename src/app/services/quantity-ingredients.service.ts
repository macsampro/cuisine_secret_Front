import { Injectable } from '@angular/core';
import { QuantityIngredients } from '../models/quantity-ingredients';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuantityIngredientsService {
  urlApi: string = 'http://localhost:3000/quantity-ingredients';
  recipes: QuantityIngredients[] = [];

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  constructor(private http:HttpClient) {}

  getAllQuantityIngredients(): Observable<QuantityIngredients[]> {
    return this.http.get<QuantityIngredients[]>(`${this.urlApi}`, {
      headers: this.getHeaders(),
    });
  }

  getQuantityIngredientsById(id: number): Observable<QuantityIngredients> {
    return this.http.get<QuantityIngredients>(`${this.urlApi}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addQuantityIngredients(quantityIngredients: QuantityIngredients): Observable<QuantityIngredients> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.post<QuantityIngredients>(`${this.urlApi}`, quantityIngredients, {
      headers: headers,
    });
  }

  modifyQuantityIngredients(
    id: number,
    updateData: Partial<QuantityIngredients>
  ): Observable<Partial<QuantityIngredients>> {
    return this.http.patch<QuantityIngredients>(`${this.urlApi}/${id}`, updateData, {
      headers: this.getHeaders(),
    });
  }

  deleteQuantityIngredients(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`${this.urlApi}/${id}`, {
      headers: headers,
    });
  }

}
