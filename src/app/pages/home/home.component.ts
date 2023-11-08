import { Component } from '@angular/core';
import { Recipes } from 'src/app/models/recipes';
import { Users } from 'src/app/models/users';
import { RecipesService } from 'src/app/services/recipes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  users: Users[] = [];
  recipes: Recipes[] = [];
  // newUser: Users = {
  //   username: 'user6',
  //   email: 'user6@coco.fr',
  //   password_hash: 'aaa',
  // };
  constructor(
    private userServices: UsersService,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.recipesService.getAllRecipes().subscribe((respRecipes)=> {
      console.log(respRecipes);
      this.recipes = respRecipes;

      
    })
    // this.userServices.getAllUsers().subscribe((user)=>{this.users = user;
    // console.log(this.users);
    // } );
  }

  // onSubmit(){
  //   this.userServices.addUser(this.newUser).subscribe((res)=>{console.log(res);
  //   } );

  // }
}
