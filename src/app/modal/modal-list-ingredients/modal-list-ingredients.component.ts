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

  constructor(
    private ingredientsService: IngredientsService,
    private recipeService: RecipesService
  ) {}

  openModalIngredients() {
    this.dialog.nativeElement.showModal();
    const mesIngredient = this.ingredientsService
      .getAllIngredients()
      .subscribe((respIngredient) => {
        this.mesIngredient = respIngredient;
        this.ingredientsEnregistrer; // les ingredient present dan la recette

        // this.lesIngredientsDeLaRecette =
      });
  }

  isIngredientSelected(ingredient: Ingredients): boolean {
    return this.ingredientsEnregistrer.some(
      (ingr) => ingr.id_ingredient === ingredient.id_ingredient
    );
  }

  closeModalIngredients() {
    this.dialog.nativeElement.close();
    this.ingredientsSelected.emit(
      this.mesIngredient.filter(ingredient => 
          this.isIngredientSelected(ingredient)
      )
  );
  }

  ajoutMonIngredient(event: any) {
    console.log(event.target.value);

    // Ici on ajoute dans le tableau des ingredients de ma recette
    // l'ingrédient checké ET retirer les ingrédients décheckés !
    // si l'id récupéré représente un ingrédient déjà dans le tableau on le retire sinon on l'ajoute
  }
}
