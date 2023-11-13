import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ingredients } from 'src/app/models/ingredients';
import { PreparationSteps } from 'src/app/models/preparation-steps';
import { Recipes } from 'src/app/models/recipes';
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

  constructor(
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private stepsService: PreparationStepsService
  ) {}

  ngOnInit() {
    this.recipeId = +this.route.snapshot.params['id'];

    // Initialisation du formulaire avec les contrôles requis
    this.editRecipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      recipe_type: ['', Validators.required],
      time_preparation: ['', Validators.required],
      difficulty: ['', Validators.required],
      ingredients: this.fb.array([]),
      steps: this.fb.array([]),
    });

    // Chargement des données de la recette pour modification
    this.loadRecipeData();
  }

  // Chargement des données de la recette existante dans le formulaire
  loadRecipeData() {
    this.recipesService.getRecipesById(this.recipeId).subscribe((recipe) => {
      this.editRecipeForm.patchValue({
        title: recipe.title,
        description: recipe.description,
        recipe_type: recipe.recipe_type,
        time_preparation: recipe.time_preparation,
        difficulty: recipe.difficulty,
      });

      // Ajout des ingrédients existants au FormArray
      recipe.ingredient.forEach((ingredient) => {
        (this.editRecipeForm.get('ingredients') as FormArray).push(
          this.createIngredientFormGroup(ingredient)
        );
      });

      // Ajout des étapes existantes au FormArray
      recipe.prepararion_step.forEach((step) => {
        (this.editRecipeForm.get('steps') as FormArray).push(
          this.createStepFormGroup(step)
        );
      });
    });
  }

  // Création d'un FormGroup pour un ingrédient
  createIngredientFormGroup(ingredient?: Ingredients): FormGroup {
    return this.fb.group({
      ingredient_name: [
        ingredient ? ingredient.ingredient_name : '',
        Validators.required,
      ],
    });
  }

  // Création d'un FormGroup pour une étape de préparation
  createStepFormGroup(step?: PreparationSteps): FormGroup {
    return this.fb.group({
      step_description: [step ? step.description : '', Validators.required],
    });
  }

  // Ajout d'un nouvel ingrédient au FormArray
  addIngredient(): void {
    (this.editRecipeForm.get('ingredients') as FormArray).push(
      this.createIngredientFormGroup()
    );
  }

  // Suppression d'un ingrédient du FormArray
  removeIngredient(index: number): void {
    (this.editRecipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  // Ajout d'une nouvelle étape au FormArray
  addStep(): void {
    (this.editRecipeForm.get('steps') as FormArray).push(
      this.createStepFormGroup()
    );
  }

  // Soumission du formulaire de modification
  onSubmit(): void {
    if (this.editRecipeForm.valid) {
      // Vous pouvez ici appeler une méthode de service pour mettre à jour la recette
      console.log(this.editRecipeForm.value);
    }
  }

  // Annuler les modifications et revenir à la page précédente
  cancel(): void {
    // Implémentez la logique pour annuler les modifications et revenir en arrière
  }
}
