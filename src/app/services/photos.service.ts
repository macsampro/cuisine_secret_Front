import { Injectable } from '@angular/core';
import { Photos } from '../models/photos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  urlApi: string = 'http://localhost:3000/photos';
  photos: Photos[] = [];

  constructor(private http: HttpClient) {}

  getImage() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });

    return this.http.get(`${this.urlApi}`, {
      responseType: 'blob',
      headers: headers,
    });
  }
  getImageById(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });

    return this.http.get(`${this.urlApi}/${id}`, {
      responseType: 'blob',
      headers: headers,
    });
  }

  postImage(formData: FormData) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.post(`${this.urlApi}`, formData, {
      headers: headers,
    });
  }

  deletePhotos(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`${this.urlApi}/${id}`, {
      headers: headers,
    });
  }

  getPhotoByRecipeId(recipeId: number): Observable<Blob> {
    const url = `${this.urlApi}/recipes/${recipeId}`;
    console.log(`Making HTTP request to URL: ${url}`);

    return this.http.get<Blob>(url, { responseType: 'blob' as 'json' }).pipe(
      tap({
        next: (data) =>
          console.log(`Received blob response for recipe ID ${recipeId}`),
        error: (error) =>
          console.log(`Error getting photo for recipe ID ${recipeId}`, error),
      }),
      catchError((error) => {
        // Ici, vous pouvez gérer l'erreur et retourner un Observable qui le reflète
        console.error('Error caught in catch and handle', error);
        return throwError(() => new Error(error));

      })
    );
  }
}
