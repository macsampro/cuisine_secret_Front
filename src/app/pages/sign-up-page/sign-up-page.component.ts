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
      password: new FormControl('', Validators.required),
    });
  }


  onSubmit() {
    let newUser: Users = { ...this.addUser.value };
    if (!this.addUser.valid) {
      console.log(newUser);

      newUser = { ...this.addUser.value };
    }

    this.userService.addUser(newUser).subscribe({
      next: () => {
        alert('Utilisateur ajouté avec succès !');
        this.addUser.reset();
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
      },
    });
  }

  OnAddUser() {
    let newUser: Users = { ...this.addUser.value };
    if (!this.addUser.valid) {
      newUser = { ...this.addUser.value };
    }
    console.log(newUser);
  }



}
