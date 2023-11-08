import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipes } from 'src/app/models/recipes';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-detaille', // Le nom utilisé pour appeler ce composant dans le HTML.
  templateUrl: './recipe-detaille.component.html', // Le fichier HTML contenant la structure du composant.
  styleUrls: ['./recipe-detaille.component.css'], // Les styles CSS spécifiques à ce composant.
})
export class RecipeDetailleComponent {
  recipes: Recipes[] = []; // Un tableau pour stocker les recettes, initialement vide.
  recipeId!: number; // Variable pour stocker l'ID de la recette, pas encore définie (! signifie que la valeur sera assignée plus tard).

  // Le constructeur initialise les services nécessaires pour le composant.
  constructor(
    private recipesService: RecipesService, 
    private route: ActivatedRoute 
  ) {}

  ngOnInit() {

    // Récupère l'ID de la recette depuis l'URL et le convertit en nombre (+).
    this.recipeId = +this.route.snapshot.params['id'];

    // Appelle le service pour obtenir une recette par son ID et s'abonne aux changements.
    this.recipesService.getRecipesById(this.recipeId).subscribe((recipe) => {
      this.recipes = [recipe]; // Une fois la recette obtenue, la stocke dans le tableau des recettes.
      
    });
  }
}
