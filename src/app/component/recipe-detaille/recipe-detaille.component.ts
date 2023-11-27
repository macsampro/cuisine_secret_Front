import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipes } from 'src/app/models/recipes';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';
import { PhotosService } from 'src/app/services/photos.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-recipe-detaille',
  templateUrl: './recipe-detaille.component.html',
  styleUrls: ['./recipe-detaille.component.css'],
})
export class RecipeDetailleComponent {
  @Input() oneRecipe!: Recipes;
  recipes!: Recipes; // Un tableau pour stocker les recettes, initialement vide.
  recipeId!: number; // Variable pour stocker l'ID de la recette, pas encore définie (! signifie que la valeur sera assignée plus tard).
  userId!: number;

  // Le constructeur initialise les services nécessaires pour le composant.
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
    private PhotosService: PhotosService,
    private location: Location
  ) {}

  ngOnInit() {
    // Récupère l'ID de la recette depuis l'URL et le convertit en nombre (+).
    this.recipeId = +this.route.snapshot.params['id'];
    console.log('id de la recette afficher', this.recipeId);
    // Appelle le service pour obtenir une recette par son ID et s'abonne aux changements.
    this.recipesService.getRecipesById(this.recipeId).subscribe((recipe) => {
      this.recipes = recipe; // Une fois la recette obtenue, la stocke dans le tableau des recettes.
    });
    
    this.userId = parseInt(localStorage.getItem('user_id') || '0', 10);
  }

  getImageUrl(idPhoto: number): string {
    if (this.recipes && this.recipes.id_photo) {
      const photo = this.recipes.id_photo[0];
      console.log('URL de l’image:', photo);

      if (photo) {
        // return `http://localhost:3000/uploads/${photo}`;
        // const imageUrl = `http://localhost:3000/uploads/${photo.name}`;
        const imageUrl = `http://localhost:3000/photos/recipes/${this.recipeId}`;
        console.log('Image URL:', imageUrl);
        return imageUrl;
      }
    }
    return '//src/assets/img_erreur /not_img.jpg'; // URL par défaut ou chemin vers une image 'placeholder'
  }

  goPageRecipeModiffy(id: number) {
    this.router.navigate([`modify-recipe/${id}`]);
  }

  deleteRecipe() {
    const id = this.recipeId;
    console.log('log de suppression', id);

    this.recipesService.deleteRecipe(id).subscribe({
      next: () => {
        console.log('Recette supprimée avec succès');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la recette', err);
        // Vous pouvez afficher un message d'erreur à l'utilisateur ici
      },
    });
  }

  goBack(): void {
    this.location.back(); // Méthode pour revenir à la page précédente
  }


}
