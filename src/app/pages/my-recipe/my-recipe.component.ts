
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipes } from 'src/app/models/recipes';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrls: ['./my-recipe.component.css'],
})
export class MyRecipeComponent implements OnInit {
  recipes: Recipes[] = [];

  @Input() oneRecipe!: Recipes;

  constructor(private recipeService: RecipesService, private router: Router) {}

  ngOnInit() {
    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      const userId = parseInt(userIdString, 10);
      this.recipeService.getUserRecipes(userId).subscribe({
        next: (data) => {
          this.recipes = data;
          console.log(this.recipes)
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des recettes', error);
          // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur.
        },
        complete: () => {
          // Code à exécuter après la fin de l'opération (facultatif)
          console.log('Récupération des recettes terminée');
        },
      });
    }
  }

  goRecipeDetaille(id: number) {
   
    console.log(this.oneRecipe)
    this.router.navigate([`page-recipe/${id}`]);
  }

  
}
