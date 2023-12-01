import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthetifiedService {

  private hasToken = new BehaviorSubject<boolean>(false);

  constructor() {
    this.checkTokenPresence();
  }

  private checkTokenPresence(): void {
    const token = localStorage.getItem('access_token');
    this.hasToken.next(!!token);
  }

  public get getToken(): Observable<boolean> {
    return this.hasToken.asObservable();
  }
  public setToken(hasToken: boolean): void {
    console.log('Utilisateur connecter')
    this.hasToken.next(hasToken);
    console.log(this.hasToken.value)
  }
}
