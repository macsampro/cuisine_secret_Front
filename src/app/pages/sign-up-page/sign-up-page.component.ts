import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {
  addUser!: FormGroup;
  newUser!: Users;
  id_file!: number;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.addUser = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      // password_hash: new FormControl('', Validators.required),
      password_hash: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,12}$')])

    });
  }


  onSubmit() {
    if (this.addUser.valid) {
      const newUser: Users = { ...this.addUser.value };
      console.log('log this.addUser.valid = ',this.addUser.valid);
      console.log('log newUser = ',newUser);
      

      this.userService.addUser(newUser).subscribe({
        next: () => {
          alert('Utilisateur ajouté avec succès !');
          this.addUser.reset();
          this.router.navigate(['login_page']);
        },
        error: (error) => {
          if (error.status === 409) {
            alert("Le nom d'utilisateur est déjà pris.");
          } else {
            alert("Erreur lors de l'inscription.");
          }
        },
      });
    } else {
      alert('Veuillez remplir correctement tous les champs.');
    }
  }

  OnAddUser() {
    let newUser: Users = { ...this.addUser.value };
    if (!this.addUser.valid) {
      newUser = { ...this.addUser.value };
    }
    console.log(newUser);
  }



}
