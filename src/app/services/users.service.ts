import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  urlApi: string = 'http://localhost:3000/';
  users: Users[] = [];

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.urlApi}users/`, {
      headers: this.getHeaders(),
    });
  }

  getUserById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.urlApi}users/${id}`, {
      headers: this.getHeaders(),
    });
  }

  login(username: string, password_hash: string) {
    return this.http
      .post<{ access_token: string; id_user: string; username: string }>(
        `${this.urlApi}auth/login`,
        { username, password_hash }
      )
      .pipe(
        tap((response) => {
          console.log(
            'REGARDE CA POUR VOIR COMMENT TU RECOIS ID DE LA PERS CONNECTER',
            response.id_user
          );

          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('username', response.username);

          if (response.id_user && Number.isFinite(response.id_user)) {
            localStorage.setItem('id_user', response.id_user);

            console.log(
              'Id utilisateur stocké:',
              localStorage.getItem('id_user')
            );
          }
        })
      );
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.urlApi}auth/register`, user);
  }

  modifyUsers(
    id: number,
    updateData: Partial<Users>
  ): Observable<Partial<Users>> {
    return this.http.patch<Users>(
      `${this.urlApi}users/${id}`,
      updateData,
      { headers: this.getHeaders() }
    );
  }

  deleteUsers(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`${this.urlApi}users/${id}`, {
      headers: headers,
    });
  }

  getUserConnected(): number {
    const userId = localStorage.getItem('user_id');

    if (userId !== null) {
      const parsedId = parseInt(userId, 10);

      if (!isNaN(parsedId)) {
        return parsedId;
      } else {
        console.error('Stored user_id is not a valid number:', userId);
      }
    } else {
      console.error('No user_id found in local storage.');
    }

    return 0;
  }
}
