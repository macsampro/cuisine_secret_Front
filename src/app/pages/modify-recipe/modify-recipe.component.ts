import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredients } from 'src/app/models/ingredients';
import { PreparationSteps } from 'src/app/models/preparation-steps';
import { Recipes } from 'src/app/models/recipes';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { PreparationStepsService } from 'src/app/services/preparation-steps.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-modify-recipe',
  templateUrl: './modify-recipe.component.html',
  styleUrls: ['./modify-recipe.component.css'],
})
export class ModifyRecipeComponent implements OnInit {
  editRecipeForm!: FormGroup;
  recipeId!: number;
  stepsToDelete: number[] = []; // Liste des ID des étapes à supprimer
  recipe!: Recipes;
  public ingredientsRecus: Ingredients[] = [];
  public ingredientsSelectionnes: Ingredients[] = [];
  public ingredientsActuels: Ingredients[] = [];
  // private tempStepId = -1;




  constructor(
    private recipeService: RecipesService,
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientsService,
    private stepService: PreparationStepsService
  ) {}

  ngOnInit() {
    this.recipeId = +this.route.snapshot.params['id'];
    this.initForm();
    this.loadRecipeData();

   this.recipeService.getRecipesById(this.recipeId).subscribe({
      next: (ingredient) => {
        console.log('Ingrédient reçu:', ingredient.ingredient);
        if (ingredient && ingredient.ingredient) {
          this.ingredientsRecus = ingredient.ingredient;

        }
      },
      error: (err) => {
        console.error('Erreur:', err);
      },
      complete: () => {
        console.log('Souscription complète');
      },
    });

    
  }
  initForm() {
    // Initialisation du formulaire avec des FormArrays pour les ingrédients et les étapes
    this.editRecipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      recipe_type: ['', Validators.required],
      time_preparation: ['', Validators.required],
      difficulty: ['', Validators.required],
      ingredients: this.fb.array([]),
      steps: this.fb.array([]),
    });
  }

  // Méthode pour charger les données de la recette et les afficher dans le formulaire
  loadRecipeData() {
    this.recipesService.getRecipesById(this.recipeId).subscribe((recipe) => {
      this.recipe = recipe;
      this.ingredientsActuels = recipe.ingredient;
      // Mise à jour du formulaire avec les données de la recette
      this.editRecipeForm.patchValue({
        title: recipe.title,
        description: recipe.description,
        recipe_type: recipe.recipe_type,
        time_preparation: recipe.time_preparation,
        difficulty: recipe.difficulty,
      });


      // Ajout des étapes de préparation au FormArray
      const stepsArray = this.editRecipeForm.get('steps') as FormArray;



      recipe.preparation_step?.forEach((step: PreparationSteps) => {
        this.getSteps().push(this.createStepFormGroup(step));
      });
    });
    
  }

  onIngredientsSelected(ingredients: Ingredients[]) {
    this.ingredientsActuels = ingredients;
}

  // Création d'un FormGroup pour un ingrédient
  createIngredientFormGroup(ingredient: Ingredients): FormGroup {
    return this.fb.group({
      ingredient_name: [ingredient.ingredient_name, Validators.required],
      id_ingredient: [ingredient.id_ingredient, Validators.required],
    });
  }

  // Création d'un FormGroup pour une étape de préparation
  createStepFormGroup(step: PreparationSteps): FormGroup {
    return this.fb.group({
      id_preparation_step: [step.id_preparation_step],
      description: [step.description, Validators.required],
      order_step: [step.order_step],
      id_recipe: [step.id_recipe],
      isDeleted: [false], // Initialisation à false
    });
  }

  // Ajout d'un ingrédient
  addIngredient(): void {
    const ingredientsArray = this.editRecipeForm.get(
      'ingredients'
    ) as FormArray;
    ingredientsArray.push(
      this.createIngredientFormGroup({
        ingredient_name: '',
        id_ingredient: -1,
      } as Ingredients)
    );
  }

  // Suppression d'un ingrédient
  removeIngredients(index: number): void {
    console.log(`Tentative de suppression de l'ingrédient à l'index: ${index}`);

    const ingredientsArray = this.editRecipeForm.get(
      'ingredients'
    ) as FormArray;
    ingredientsArray.removeAt(index);
  }

  // Ajout d'une étape de préparation
  removeStepFromForm(index: number): void {  
    const stepsArray = this.getSteps(); 
    stepsArray.removeAt(index); 
  } 
  

  // Méthode pour supprimer une étape de la base de données
  deleteStep(stepId: number): void {
    if (stepId && stepId !== 0) {
      this.stepService.deletePreparationStep(stepId).subscribe({
        next: () => {
          // Traitement en cas de succès
          console.log(`Étape avec l'ID ${stepId} supprimée avec succès`);
        },
        error: (error) => {
          // Traitement en cas d'erreur
          console.error(
            `Erreur lors de la suppression de l'étape avec l'ID ${stepId}`,
            error
          );
        },
      });
    }
  }

  addStep(): void {
    const stepsArray = this.getSteps();
    
    const newStep = this.fb.group({
      description: '',
      order_step: stepsArray.length + 1,
      id_recipe: this.recipeId,
    });
    stepsArray.push(newStep);
  }
    
    
    
    
    
    



//   onSubmitRecipe(): void {
//   if (this.editRecipeForm.valid) {
//     this.recipe.ingredient = this.ingredientsActuels;
//     this.recipe.preparation_step = this.getSteps().value;
    
//     this.recipeService.modifyRecipe(this.recipe.id_recipe, this.recipe).subscribe();
    
//     this.router.navigate([`/page-recipe/${this.recipeId}`]);
//     console.log('log de console.log(this.editRecipeForm.value)',this.editRecipeForm.value)

//   }
// }
onSubmitRecipe(): void {
  if (this.editRecipeForm.valid) {
    // Création d'un objet avec les nouvelles données du formulaire
    const updatedRecipe = {
      ...this.recipe,
      ...this.editRecipeForm.value,
      ingredient: this.ingredientsActuels, // Ajout des ingrédients mis à jour
      preparation_step: this.getSteps().value // Ajout des étapes de préparation mises à jour
      
    };
    
    console.log('log updatedRecipe = ',updatedRecipe);
    // Envoi de l'objet mis à jour au service
    this.recipeService.modifyRecipe(this.recipe.id_recipe, updatedRecipe).subscribe();

    // Redirection
    this.router.navigate([`/page-recipe/${this.recipeId}`]);
  }
}


  getSteps(): FormArray {
    return this.editRecipeForm.get('steps') as FormArray;
  }

  cancel(): void {
    // Annulation des modifications et redirection
    this.router.navigate([`page-recipe/${this.recipeId}`]);
  }

  deleteRecipe(): void {
    if(confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      this.recipeService.deleteRecipe(this.recipeId).subscribe({
        next: () => {
          console.log('Recette supprimée avec succès');
          this.router.navigate(['/home']); // Redirection après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
        }
      });
    }
  }

}
