import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/models/ingredients';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-modal-list-ingredients',
  templateUrl: './modal-list-ingredients.component.html',
  styleUrls: ['./modal-list-ingredients.component.css'],
})
export class ModalListIngredientsComponent {
  @ViewChild('myDialog') dialog!: ElementRef<HTMLDialogElement>;
  @Input() oneIngredient!: Ingredients;
  @Input() ingredientsEnregistrer!: Ingredients[]; // Tous les ingrédients qui sont inclus dans la recette
  @Output() ingredientsSelected = new EventEmitter<Ingredients[]>();

  mesIngredient: Ingredients[] = []; // Tous les ingrtédients qui existent
  ingredientsRecus: Ingredients[] = [];


  constructor(
    private ingredientsService: IngredientsService,
    private recipeService: RecipesService
  ) {this.ingredientsEnregistrer = []; }

  openModalIngredients() {
    //e.preventDefault()
    console.log("Ouverture de la modale des ingrédients");
    this.dialog.nativeElement.showModal();
    const mesIngredient = this.ingredientsService
      .getAllIngredients()
      .subscribe((respIngredient) => {
        this.mesIngredient = respIngredient;
        
        this.ingredientsEnregistrer; // les ingredient present dans la recette

        // this.lesIngredientsDeLaRecette =
      });
      
  }


  // isIngredientSelected(ingredient: Ingredients): boolean {
  //   return this.ingredientsEnregistrer.some(
  //     (ingr) => ingr.id_ingredient === ingredient.id_ingredient
  //   );
  // }

  // Dans ModalListIngredientsComponent
isIngredientSelected(ingredient: Ingredients): boolean {
  if (!this.ingredientsEnregistrer) {
    return false;
  }
  return this.ingredientsEnregistrer.some(ing => ing.id_ingredient === ingredient.id_ingredient);
}


  closeModalIngredients() {
    this.dialog.nativeElement.close();
    this.ingredientsSelected.emit(
      this.mesIngredient.filter(ingredient => 
          this.isIngredientSelected(ingredient)
      )
  );
  }

    

  ajoutMonIngredient(event: any, ingredient: Ingredients) {
     // Assurez-vous que ingredientsEnregistrer est un tableau
  if (!Array.isArray(this.ingredientsEnregistrer)) {
    this.ingredientsEnregistrer = [];
  }

    if (event.target.checked) {
      this.ingredientsEnregistrer.push(ingredient);
    } else {
      const index = this.ingredientsEnregistrer.findIndex(ing => ing.id_ingredient === ingredient.id_ingredient);
      if (index > -1) {
        this.ingredientsEnregistrer.splice(index, 1);
      }
    }

  }
}
