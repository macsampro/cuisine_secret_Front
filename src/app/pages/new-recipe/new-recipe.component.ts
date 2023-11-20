import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredients } from 'src/app/models/ingredients';
import { PreparationSteps } from 'src/app/models/preparation-steps';
import { Recipes } from 'src/app/models/recipes';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { PreparationStepsService } from 'src/app/services/preparation-steps.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {
  editRecipeForm!: FormGroup;
  recipe!: Recipes;
  public ingredientsSelectionnes: Ingredients[] = [];
  public ingredientsActuels: Ingredients[] = [];

  constructor(
    private recipeService: RecipesService,
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientsService,
    private stepService: PreparationStepsService,
    private location: Location

  ) {}

  ngOnInit(){
    this.initForm();


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

  onIngredientsSelected(ingredients: Ingredients[]) {
    this.ingredientsActuels = ingredients;
}

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
  
  // Ajout d'une étape de préparation
  removeStepFromForm(index: number): void {  
    const stepsArray = this.getSteps(); 
    stepsArray.removeAt(index); 
  } 

  addStep(): void {
    const stepsArray = this.getSteps();
    const newStep = {
      id_preparation_step: length+1,
      description: '',
      order_step: stepsArray.length + 1,
      id_recipe: this.recipe.id_recipe,
    };
    stepsArray.push(this.createStepFormGroup(newStep as PreparationSteps));
  }    


  onSubmitRecipe(): void {
    if (this.editRecipeForm.valid) {
      // Création d'un objet avec les nouvelles données du formulaire
      const createRecipe = {
        ...this.recipe,
        ...this.editRecipeForm.value,
        ingredient: this.ingredientsActuels, // Ajout des ingrédients mis à jour
        preparation_step: this.getSteps().value // Ajout des étapes de préparation mises à jour
        
      };
      
      console.log('log createRecipe = ',createRecipe);
      // Envoi de l'objet mis à jour au service
      this.recipeService.modifyRecipe(this.recipe.id_recipe, createRecipe).subscribe();
  
      // Redirection
      // this.router.navigate([`/page-recipe/${this.recipeId}`]);
    }
  }
  
  
    getSteps(): FormArray {
      return this.editRecipeForm.get('steps') as FormArray;
    }
  
    goBack(): void {
      this.location.back();
    }
  
  
}
