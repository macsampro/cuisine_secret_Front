import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  username!: string;
  password_hash!: string;
  connexion!: FormGroup;

  constructor(
    private userService: UsersService,
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }

  private initialForm() {
    this.connexion = this.fb.group({
      username: ['', Validators.required, Validators.pattern('[A-Za-z0-9._-]+')],
      password_hash: ['', Validators.required],
    });
  }

  OnConnect() {
    
    if (this.connexion.valid) {
      const sanitizedUsername = this.connexion.value.username.replace(/[<>]/g, '');
      let username = sanitizedUsername
      let password_hash = this.connexion.value.password_hash;
      this.userService.login(username, password_hash).subscribe({
        next: (response: any) => {
          console.log('Réponse complète du serveur :', response);
          if (response && response.accessToken) {
            // Stocker le token dans le localStorage
            localStorage.setItem('access_token', response.accessToken);

            console.log('Connexion réussie et token stocké!');
            this.router.navigate(['home']);
          } else {
            // Gestion d'erreur : afficher un message à l'utilisateur
            console.error('Formulaire invalide');
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la connexion:', error);
        },
      });
    }
  }

  goToSignUp(){
    this.router.navigate(['sign_up']);

  }

}


