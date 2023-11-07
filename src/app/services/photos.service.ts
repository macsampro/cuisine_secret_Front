import { Injectable } from '@angular/core';
import { Photos } from '../models/photos';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}
