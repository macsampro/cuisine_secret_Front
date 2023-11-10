import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photos } from 'src/app/models/photos';
import { Recipes } from 'src/app/models/recipes';
import { PhotosService } from 'src/app/services/photos.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() oneRecipe!: Recipes;
  photo: Photos[] = [];
  recipeImg!: any;
  myRecipe!: Recipes;

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private photosService: PhotosService
  ) {}
  ngOnInit() {
    this.getRecipeImage(this.oneRecipe.id_recipe)
    
  }
  
  goRecipeDetaille(id: number) {
    const myRecipe = this.recipesService.getRecipesById(
      this.oneRecipe.id_recipe
      );
      this.router.navigate([`page-recipe/${id}`]);
  }

  getRecipeImage(recipeId: number) {
    this.photosService.getPhotoByRecipeId(recipeId).subscribe((data: Blob) => {
      this.createImageFromBlob(data);
      console.log('mon log data',data);
      
    });
  }
  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.recipeImg = reader.result;
    });
  }
}
