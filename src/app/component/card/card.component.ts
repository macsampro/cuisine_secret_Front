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
    if (this.oneRecipe.id_photo && this.oneRecipe.id_photo.length > 0) {
      this.getRecipeImage(this.oneRecipe.id_recipe);
    } else {
      // Aucune photo associée, affiche l'image par défaut
      this.recipeImg = 'assets/img_erreur /not_img.jpg';
    }
  }
  goRecipeDetaille(id: number) {
    const myRecipe = this.recipesService.getRecipesById(
      this.oneRecipe.id_recipe
    );

    this.router.navigate([`page-recipe/${id}`]);
  }

  getRecipeImage(recipeId: number) {
    this.photosService.getPhotoByRecipeId(recipeId).subscribe({
      next: (data: Blob) => {
        if (data.type.startsWith('image/')) {
          // Créer une URL pour l'image et l'affecter à `recipeImg`
          const urlCreator = window.URL || window.webkitURL;
          this.recipeImg = urlCreator.createObjectURL(data);
        } else {
          // Gérer le cas où la réponse n'est pas une image
          console.error('La réponse n’est pas une image');
          this.recipeImg = 'assets/img_erreur/not_img.jpg';
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l’image:', error);
        this.recipeImg = 'assets/img_erreur/not_img.jpg';
      },
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
