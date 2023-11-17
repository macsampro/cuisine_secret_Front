import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Ingredients } from 'src/app/models/ingredients';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-modal-list-ingredients',
  templateUrl: './modal-list-ingredients.component.html',
  styleUrls: ['./modal-list-ingredients.component.css']
})
export class ModalListIngredientsComponent {
  @ViewChild('myDialog') dialog!: ElementRef<HTMLDialogElement>;
  @Input() oneIngredient!: Ingredients;
  mesIngredient:Ingredients[] = []; // Tous les ingrtédients qui existent
  lesIngredientsDeLaRecette: Ingredients[] = []; // Tous les ingrédients qui sont inclus dans la recette

  constructor(private ingredientsService:IngredientsService){}

  openModalIngredients(){
    this.dialog.nativeElement.showModal();
    const mesIngredient = this.ingredientsService.getAllIngredients().subscribe((respIngredient) => {
      this.mesIngredient = respIngredient;
      // this.lesIngredientsDeLaRecette = 
    });    
  }

  closeModalIngredients(){
    // this.dialog.nativeElement.close();
    console.log('mon loge de mesIngredient = ',this.lesIngredientsDeLaRecette);
    
    
    
  }

  ajoutMonIngredient(event:any){
    console.log(event.target.value);

    // Ici on ajoute dans le tableau des ingredients de ma recette
    // l'ingrédient checké ET retirer les ingrédients décheckés !
    // si l'id récupéré représente un ingrédient déjà dans le tableau on le retire sinon on l'ajoute
  }

}
