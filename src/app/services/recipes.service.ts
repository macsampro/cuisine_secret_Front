import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipes } from '../models/recipes';
import { RecipeType } from '../models/recipe-type';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  // URL de base pour l'API
  urlApi: string = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {}

  // Récupère les en-têtes requis pour les requêtes HTTP
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  // Récupère toutes les recettes
  getAllRecipes(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(`${this.urlApi}`, {
      headers: this.getHeaders(),
    });
  }

  // Récupère une recette par son ID
  getRecipesById(id: number): Observable<Recipes> {
    return this.http.get<Recipes>(`${this.urlApi}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Ajoute une nouvelle recette
  addRecipe(recipe: Recipes): Observable<Recipes> {
    return this.http.post<Recipes>(`${this.urlApi}`, recipe, {
      headers: this.getHeaders(),
    });
  }

  // Modifie une recette existante (mise à jour partielle)
  modifyRecipe(id: number, updateData: Partial<Recipes>): Observable<Recipes> {
    return this.http.patch<Recipes>(`${this.urlApi}/${id}`, updateData, {
      headers: this.getHeaders(),
    });
  }

  // Supprime une recette par son ID
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Méthode pour récupérer les types de recettes
getRecipeTypes(): Observable<RecipeType[]> {
  return this.http.get<RecipeType[]>(`${this.urlApi}/types`, {
    headers: this.getHeaders(),
  });
}
}
