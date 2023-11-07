import { Injectable } from '@angular/core';
import { Recipes } from '../models/recipes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  urlApi: string = 'http://localhost:3000/recipes';
  recipes: Recipes[] = [];

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(`${this.urlApi}`, {
      headers: this.getHeaders(),
    });
  }

  getRecipesById(id: number): Observable<Recipes> {
    return this.http.get<Recipes>(`${this.urlApi}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addRecipe(recipes: Recipes): Observable<Recipes> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.post<Recipes>(`${this.urlApi}`, recipes, {
      headers: headers,
    });
  }

  modifyRecipe(
    id: number,
    updateData: Partial<Recipes>
  ): Observable<Partial<Recipes>> {
    return this.http.patch<Recipes>(`${this.urlApi}/${id}`, updateData, {
      headers: this.getHeaders(),
    });
  }

  deleteRecipe(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`${this.urlApi}/${id}`, {
      headers: headers,
    });
  }
}
