import { Component } from '@angular/core';
import { Recipes } from 'src/app/models/recipes';
import { Users } from 'src/app/models/users';
import { PhotosService } from 'src/app/services/photos.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  users: Users[] = [];
  recipes: Recipes[] = [];

  constructor(
    private recipesService: RecipesService,
  ) {}

  ngOnInit() {
    this.recipesService.getAllRecipes().subscribe((respRecipes) => {
      this.recipes = respRecipes;
    });
  }

}
