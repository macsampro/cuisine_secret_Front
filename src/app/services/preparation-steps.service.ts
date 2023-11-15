import { Injectable } from '@angular/core';
import { PreparationSteps } from '../models/preparation-steps';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreparationStepsService {
  urlApi: string = 'http://localhost:3000/preparation_steps';
  preparation_steps: PreparationSteps[] = [];

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  constructor(private http: HttpClient) {}

  getAllPreparationSteps(): Observable<PreparationSteps[]> {
    return this.http.get<PreparationSteps[]>(`${this.urlApi}`, {
      headers: this.getHeaders(),
    });
  }

  getPreparationStepsById(id: number): Observable<PreparationSteps> {
    return this.http.get<PreparationSteps>(`${this.urlApi}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addPreparationSteps(
    preparationSteps: PreparationSteps
  ): Observable<PreparationSteps> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.post<PreparationSteps>(
      `${this.urlApi}`,
      preparationSteps,
      {
        headers: headers,
      }
    );
  }

  modifyPreparationSteps(
    id: number,
    updateData: Partial<PreparationSteps>
  ): Observable<Partial<PreparationSteps>> {
    return this.http.patch<PreparationSteps>(
      `${this.urlApi}/${id}`,
      updateData,
      {
        headers: this.getHeaders(),
      }
    );
  }

  deletePreparationStep(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`${this.urlApi}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
