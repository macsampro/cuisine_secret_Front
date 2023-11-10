import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  recipe: Recipes[] = [];
  recipeId!: number;


  constructor(
    private fb: FormBuilder,
    private recipesService: RecipesService, 
    private route: ActivatedRoute,
    private ingredients: IngredientsService,
    private stepsService: PreparationStepsService
  ) {}

  ngOnInit() {
    this.recipeId = +this.route.snapshot.params['id'];
    console.log('mon log = ',this.recipeId);
    

    this.editRecipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      recipe_type: ['', Validators.required],
      time_preparation: ['', Validators.required],
      difficulty: ['', Validators.required], 
      ingredients: this.fb.array([]),
      steps: this.fb.array([]),
    });

    this.loadRecipeData();
  }
  
  loadRecipeData(){
    this.recipesService.getRecipesById(this.recipeId).subscribe(recipe => {
      this.editRecipeForm.patchValue({
        title: recipe.title,
        description: recipe.description,
        recipe_type: recipe.recipe_type,
        time_preparation: recipe.time_preparation,
        difficulty: recipe.difficulty,
        
      });
      // ...
      console.log('mon log 3 = ',this.editRecipeForm);
        
        
        
      });
      
    }


  // createIngredient(): FormGroup {
  //   return this.fb.group({
  //     ingredient_name: ['', Validators.required],
  //   });
  // }

  // getIngredients(): FormArray {
  //   // return this.editRecipeForm.get('ingredients') as FormArray;
  // }



  // createStep(): FormGroup {
  //   return this.fb.group({
  //     step_description: ['', Validators.required],
  //   });
  // }

  // getsteps(): FormArray {
  //   return this.editRecipeForm.get('steps') as FormArray;
  // }

  // addStep(): void {
  //   this.stepsService.addPreparationSteps(this.createStep());
  // }

  // removeStep(index: number): void {
  //   this.stepsService.deletePreparationSteps(index);
  // }

  onSubmit(): void {
    if (this.editRecipeForm.valid) {
      console.log(this.editRecipeForm.value);
    }
  }
}
