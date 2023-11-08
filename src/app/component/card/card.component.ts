import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipes } from 'src/app/models/recipes';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() oneRecipe!: Recipes;

  constructor( 
    private router: Router,
    private recipesService:RecipesService) {}

  goRecipeDetaille(id:number) {
    const myRecipe = this.recipesService.getRecipesById(this.oneRecipe.id_recipe)
    this.router.navigate([`page-recipe/${id}`]);
    // this.router.navigate([`page_recipe/recipe_detaille/${id}`]);
  }
}
