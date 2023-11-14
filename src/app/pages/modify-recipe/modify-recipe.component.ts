// modify-recipe.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredients } from 'src/app/models/ingredients';
import { PreparationSteps } from 'src/app/models/preparation-steps';
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

  constructor(
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientsService,
    private stepService: PreparationStepsService,
  ) {}

  ngOnInit() {
    this.recipeId = +this.route.snapshot.params['id'];
    this.initForm();
    this.loadRecipeData();
  }

  initForm() {
    // Définition de la structure du formulaire avec des FormArrays pour les ingrédients et les étapes
    this.editRecipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      recipe_type: ['', Validators.required],
      time_preparation: ['', Validators.required],
      difficulty: ['', Validators.required],
      ingredients: this.fb.array([]), // Définition d'un tableau vide pour les ingrédients
      steps: this.fb.array([]), // Définition d'un tableau vide pour les étapes
    });
  }

  // Cette méthode charge les données d'une recette pour les afficher dans un formulaire.
  loadRecipeData() {
    // On demande au service de nous donner les données de la recette grâce à son identifiant.
    this.recipesService.getRecipesById(this.recipeId).subscribe((recipe) => {
      // On met à jour le formulaire avec les valeurs de la recette qu'on vient de recevoir.
      this.editRecipeForm.patchValue({
        title: recipe.title, // Le titre de la recette.
        description: recipe.description, // La description de la recette.
        recipe_type: recipe.recipe_type, // Le type de recette, par exemple "végétarien".
        time_preparation: recipe.time_preparation, // Le temps de préparation nécessaire.
        difficulty: recipe.difficulty, // La difficulté de la recette.
      });

      // On s'occupe maintenant des ingrédients.
      // On récupère le tableau des ingrédients du formulaire.
      const ingredientsFormArray = this.editRecipeForm.get(
        'ingredients'
      ) as FormArray;
      ingredientsFormArray.clear(); // On vide le tableau pour s'assurer qu'il n'y a rien dedans.

      // Si la recette a des ingrédients et que c'est bien un tableau...
      if (recipe.ingredient && Array.isArray(recipe.ingredient)) {
        // ...alors on ajoute chaque ingrédient dans notre tableau de formulaire.
        recipe.ingredient.forEach((ingredient) => {
          ingredientsFormArray.push(this.createIngredientFormGroup(ingredient));
        });
      }

      // On fait la même chose pour les étapes de préparation.
      // On récupère le tableau des étapes du formulaire.
      const stepsFormArray = this.editRecipeForm.get('steps') as FormArray;
      stepsFormArray.clear(); // On le vide aussi.

      // Si la recette a des étapes de préparation et que c'est bien un tableau...
      if (recipe.preparation_step && Array.isArray(recipe.preparation_step)) {
        // ...alors on ajoute chaque étape dans notre tableau de formulaire.
        recipe.preparation_step.forEach((step) => {
          stepsFormArray.push(this.createStepFormGroup(step));
        });
      }
    });
  }

  createIngredientFormGroup(ingredient: Ingredients): FormGroup {
    // Création d'un FormGroup pour un ingrédient avec validation
    return this.fb.group({
      ingredient_name: [ingredient.ingredient_name, Validators.required],
      // Ajouter ici d'autres champs si nécessaire
    });
  }

  createStepFormGroup(step: PreparationSteps): FormGroup {
    return this.fb.group({
      id_preparation_step: [step.id_preparation_step],
      description: [step.description, Validators.required],
      order_step: [step.order_step],
      id_recipe: [step.id_recipe],
    });
  }

  addIngredient(): void {
    const ingredientsArray = this.editRecipeForm.get(
      'ingredients'
    ) as FormArray;
    // Créez un objet qui respecte la structure de l'interface Ingredients
    const newIngredient: Ingredients = {
      id_ingredient: 0, // Utilisez 0 ou une autre valeur appropriée pour l'identifiant
      ingredient_name: '', // Laissez vide ou une valeur par défaut pour le nom
      ingredient_type: '', // Laissez vide ou une valeur par défaut pour le type
    };
    ingredientsArray.push(this.createIngredientFormGroup(newIngredient));
  }

  // removeIngredient(index: number): void {
    
  //   const ingredientsArray = this.editRecipeForm.get(
  //     'ingredients'
  //   ) as FormArray;
  //   ingredientsArray.removeAt(index);
  // }

  removeIngredients(idIngredient: number){
    this.ingredientService.deleteIngredients(idIngredient).subscribe({
      next: () =>{
        alert('ingredient supprimer avec succès !')
      }, error: (error)=>{
        console.error('Erreur lors de la suppression de l\'inredient : ', error)
      }
    })
  }

  getSteps(): FormArray {
    console.log('OOOOOOOOOOO', (this.editRecipeForm.get('steps') as FormArray).value);
    return this.editRecipeForm.get('steps') as FormArray;
  }

  addStep(): void {
    const stepsArray = this.editRecipeForm.get('steps') as FormArray;
    // Créez un objet qui respecte la structure de l'interface PreparationSteps
    const newStep: PreparationSteps = {
      id_preparation_step: 0, // Utilisez 0 ou une autre valeur appropriée pour l'identifiant
      description: '', // Laissez vide ou une valeur par défaut pour la description
      order_step: stepsArray.length + 1, // Utilisez la longueur actuelle du tableau + 1 pour l'ordre
      id_recipe: this.recipeId, // Utilisez l'ID de la recette courante
    };
    stepsArray.push(this.createStepFormGroup(newStep));
  }

  removeStep(index: number): void {
    console.log(index, 'Il manque un S au CV')
    this.stepService.deletePreparationSteps(index).subscribe({
      next: (resp)=>{
        alert('Etape de la recette supprimé avec succès !')
        console.log(resp);
        
      }, error: (error)=>{
        console.error('Erreur lors de la suppression de l\'étape : ', error)
      }
    })
  }

  onSubmit(): void {
    // Soumission du formulaire et mise à jour de la recette
    if (this.editRecipeForm.valid) {
      this.recipesService
        .modifyRecipe(this.recipeId, this.editRecipeForm.value)
        .subscribe({
          next: (updatedRecipe) => {
            this.router.navigate([`/page-recipe/${updatedRecipe.id_recipe}`]);
          },
          error: (error) => {
            alert('Erreur lors de la mise à jour de la recette');
          },
        });
    }
  }

  cancel(): void {
    // Annulation des modifications et redirection vers la page de détail de la rec
    this.router.navigate([`/page-recipe/${this.recipeId}`]);
  }
}
