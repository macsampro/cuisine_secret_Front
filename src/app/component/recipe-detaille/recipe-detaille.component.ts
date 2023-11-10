import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipes } from 'src/app/models/recipes';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detaille', 
  templateUrl: './recipe-detaille.component.html', 
  styleUrls: ['./recipe-detaille.component.css'], 
})
export class RecipeDetailleComponent {
  @Input() oneRecipe!: Recipes;
  recipes: Recipes[] = []; // Un tableau pour stocker les recettes, initialement vide.
  recipeId!: number; // Variable pour stocker l'ID de la recette, pas encore définie (! signifie que la valeur sera assignée plus tard).
  
  // Le constructeur initialise les services nécessaires pour le composant.
  constructor(
    private recipesService: RecipesService, 
    private router: Router,
    private route: ActivatedRoute,
    ) {}
    
  ngOnInit() {

    // Récupère l'ID de la recette depuis l'URL et le convertit en nombre (+).
    this.recipeId = +this.route.snapshot.params['id'];
    console.log(this.recipeId, 'id logger')
    // Appelle le service pour obtenir une recette par son ID et s'abonne aux changements.
    this.recipesService.getRecipesById(this.recipeId).subscribe((recipe) => {
      this.recipes = [recipe]; // Une fois la recette obtenue, la stocke dans le tableau des recettes. 
    });

    
  }

  goPageRecipeModiffy(id:number) {
    this.router.navigate([`modify-recipe/${id}`]);
  }



}
