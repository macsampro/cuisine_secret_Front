import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private router:Router){}
  logout() {
    // Supprimer le token du stockage local
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    // Rediriger l'utilisateur vers la page de connexion ou la page d'accueil
    this.router.navigate(['/login_page']);
  }


}
