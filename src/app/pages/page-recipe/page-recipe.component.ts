import { Component } from '@angular/core';
import { Recipes } from 'src/app/models/recipes';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-page-recipe',
  templateUrl: './page-recipe.component.html',
  styleUrls: ['./page-recipe.component.css']
})
export class PageRecipeComponent {

  recipes: Recipes[] = [];

  constructor(
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    



}


}

