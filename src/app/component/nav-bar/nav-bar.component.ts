import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { IsAuthetifiedService } from 'src/app/services/is-authetified.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isToken!: boolean;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private isAuthetifiedService: IsAuthetifiedService
  ) {}
  ngOnInit(): void {
    this.isAuthetifiedService.getToken.subscribe((state: boolean) => {
      this.isToken = state;
    });
  }

  logout() {
    if (!this.isToken) {
      this.router.navigate(['login_page']);
    } else {
      if (this.loginService.checkConnexion()) {
        console.log('test unlog');

        localStorage.removeItem('access_token'); // effacer le token stocker dans le localstorage
        localStorage.removeItem('username'); // effacer le usernam de l'utilisateur stocker dans le localstorage
        localStorage.removeItem('user_id'); // effacer l'id de l'utilisateur stocker dans le localstorage
        // Rediriger l'utilisateur vers la page de connexion
        this.isAuthetifiedService.setToken(false);
        console.log('user deconnecter');

        this.router.navigate(['/login_page']);
        // Afficher un message si nécessaire
        alert('Vous avez été déconnecté.');
      }
    }
  }
}
