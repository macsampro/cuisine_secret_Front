import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredients } from 'src/app/models/ingredients';
import { Recipes } from 'src/app/models/recipes';
import { RecipesService } from 'src/app/services/recipes.service';
import { UsersService } from 'src/app/services/users.service';
import { RecipeType } from 'src/app/models/recipe-type';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  newRecipeForm: FormGroup;
  selectedIngredients: Ingredients[] = [];
  recipeTypes: RecipeType[] = [];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipesService,
    private userService: UsersService,
    private router: Router
  ) {
    this.newRecipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      recipe_type: ['', Validators.required],
      time_preparation: ['', Validators.required],
      difficulty: ['', Validators.required],
      ingredients: this.fb.array([]),
      steps: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadRecipeTypes();
    // console.log(this.loadRecipeTypes);
  }
  //recupeter les type de recettes
  private loadRecipeTypes(): void {
    this.recipeService.getRecipeTypes().subscribe(
      (types) => {
        this.recipeTypes = types;
      },
      (error) => {
        console.error('Error loading recipe types:', error);
      }
    );
  }

  // Méthode pour ajouter les ingrédients sélectionnés au FormArray
  onIngredientsSelected(ingredients: Ingredients[]): void {
    this.selectedIngredients = ingredients;

    const ingredientsFormArray = this.newRecipeForm.get(
      'ingredients'
    ) as FormArray;
    ingredientsFormArray.clear();
    ingredients.forEach((ingredient) => {
      ingredientsFormArray.push(
        this.fb.group({
          id_ingredient: [ingredient.id_ingredient, Validators.required],
          ingredient_name: [ingredient.ingredient_name, Validators.required],
        })
      );
    });
  }

  // Méthode pour ajouter une étape de préparation au FormArray
  addStep(): void {
    const stepsFormArray = this.newRecipeForm.get('steps') as FormArray;
    stepsFormArray.push(
      this.fb.group({
        description: ['', Validators.required],
        order_step: [stepsFormArray.length + 1], // L'ordre est défini automatiquement
      })
    );
  }

  // Méthode pour retirer une étape de préparation du FormArray
  removeStep(index: number): void {
    const stepsFormArray = this.newRecipeForm.get('steps') as FormArray;
    stepsFormArray.removeAt(index);
  }

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.newRecipeForm.valid) {
      const formValue = this.newRecipeForm.value;
      const newRecipe: Partial<Recipes> = {
        title: formValue.title,
        recipe_type: formValue.recipe_type,
        description: formValue.description,
        time_preparation: formValue.time_preparation,
        difficulty: formValue.difficulty,
        ingredient: formValue.ingredients.map((ing: any) => ing.id_ingredient),
        preparation_step: formValue.steps,
        creation_date: new Date(),
        id_user: parseInt(localStorage.getItem('user_id') || '0', 10)
      };

      // Ajout de l'ID de l'utilisateur connecté
      newRecipe.id_user = this.userService.getUserConnected();

      this.recipeService.addRecipe(newRecipe as Recipes).subscribe({
        next: (recipe) => {
          this.router.navigate(['home']); // Navigation vers la page d'accueil après la création
        },
        error: (error) => {
          console.error('Error creating recipe:', error);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/home']); // Navigation vers la page d'accueil en cas d'annulation
  }
}
