import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipes } from 'src/app/models/recipes';
import { PhotosService } from 'src/app/services/photos.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrls: ['./my-recipe.component.css'],
})
export class MyRecipeComponent implements OnInit {
  @Input() oneRecipe!: Recipes;
  recipes: Recipes[] = [];

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private photosService: PhotosService
  ) {}

  // ngOnInit() {
  //   const userIdString = localStorage.getItem('user_id');
  //   if (userIdString) {
  //     const userId = parseInt(userIdString, 10);
  //     this.recipeService.getUserRecipes(userId).subscribe({
  //       next: (data) => {
  //         this.recipes = data;
  //         console.log(this.recipes);
  //       },
  //       error: (error) => {
  //         console.error('Erreur lors de la récupération des recettes', error);
  //         // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur.
  //       },
  //       complete: () => {
  //         // Code à exécuter après la fin de l'opération (facultatif)
  //         console.log('Récupération des recettes terminée');
  //       },
  //     });
  //   }
  // }

  ngOnInit() {
    const userId = parseInt(localStorage.getItem('user_id') || '0', 10);
    if (userId) {
      this.recipeService.getUserRecipes(userId).subscribe((recipes) => {
        this.recipes = recipes;
        this.recipes.forEach((recipe) => {
          if (recipe.id_photo && recipe.id_photo.length > 0) {
            this.photosService.getPhotoByRecipeId(recipe.id_recipe).subscribe((blob) => {
              const urlCreator = window.URL || window.webkitURL;
              recipe.imageUrl = urlCreator.createObjectURL(blob);
            });
          } else {
            recipe.imageUrl = 'assets/default-recipe-image.jpg'; // Assurez-vous que cette image par défaut existe dans le dossier assets.
          }
        });
      });
    }
  }


  goRecipeDetaille(id: number) {
    this.router.navigate([`page-recipe/${id}`]);
  }
}
