import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private router: Router, private loginService: LoginService) {}

  logout() {
    if (this.loginService.checkConnexion()) {
      localStorage.removeItem('access_token'); // effacer le token stocker dans le localstorage
      localStorage.removeItem('username'); // effacer l'id de l'utilisateur stocker dans le localstorage
      // Rediriger l'utilisateur vers la page de connexion
      this.router.navigate(['/login_page']);
      // Afficher un message si nécessaire
      alert('Vous avez été déconnecté.');
    }
  }

}
