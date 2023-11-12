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
  mesIngredient:Ingredients[] = [];

  constructor(private ingredientsService:IngredientsService){}

  openModalIngredients(){
    this.dialog.nativeElement.showModal();
    const mesIngredient = this.ingredientsService.getAllIngredients().subscribe((respIngredient) => {
      console.log(respIngredient);
      this.mesIngredient = respIngredient;
    });
    
    console.log("mon log de mesIngredient ",mesIngredient);
    
  }

  closeModalIngredients(){
    this.dialog.nativeElement.close();
  }
}
