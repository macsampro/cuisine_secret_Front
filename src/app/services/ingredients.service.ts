import { Injectable } from '@angular/core';
import { Ingredients } from '../models/ingredients';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  urlApi: string = 'http://localhost:3000/ingredients';
  recipes: Ingredients[] = [];

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }



  constructor(private http:HttpClient) { }



  getAllIngredients(): Observable<Ingredients[]> {
    return this.http.get<Ingredients[]>(`${this.urlApi}`, {
      headers: this.getHeaders(),
    });
  }

  getIngredientsById(id: number): Observable<Ingredients> {
    return this.http.get<Ingredients>(`${this.urlApi}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addIngredients(ingredient: Ingredients): Observable<Ingredients> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.post<Ingredients>(`${this.urlApi}`, ingredient, {
      headers: headers,
    });
  }

  modifyIngredients(
    id: number,
    updateData: Partial<Ingredients>
  ): Observable<Partial<Ingredients>> {
    return this.http.patch<Ingredients>(`${this.urlApi}/${id}`, updateData, {
      headers: this.getHeaders(),
    });
  }

  deleteIngredients(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`${this.urlApi}/${id}`, {
      headers: headers,
    });
  }


}
