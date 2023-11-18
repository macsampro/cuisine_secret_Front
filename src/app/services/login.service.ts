import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 logout() {
   throw new Error('Method not implemented.');
 }
 isLoggedIn() {
   throw new Error('Method not implemented.');
 }
 private urlApi = 'http://localhost:3000/auth';

 isConnected: boolean = false;

 constructor(private http: HttpClient) {}
 login(username: string, password_hash: string): Observable<Login> {
   const body = { username: username, password: password_hash };
      return this.http.post<Login>(this.urlApi + '/login', body);
 }

 checkConnexion(): boolean{
   this.isConnected = !!localStorage.getItem('access_token');
   return this.isConnected;
 }


}
