import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit{

  constructor(
    private activatedRoute: ActivatedRoute
  ){}
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const recipeString = params['recipe'];
      console.log(recipeString)
      if (recipeString) {
        // Décodage de la chaîne URL encodée
        const decodedRecipeString = decodeURIComponent(recipeString);
        
        // Désérialisation pour obtenir l'objet `newRecipe`
        const newRecipe = JSON.parse(decodedRecipeString);
        
        // Utiliser `newRecipe` comme nécessaire
        console.log('on est a lendroit de la photo')
        console.log(newRecipe);
      } else {console.log('coucou');
      }
    });
  }
}
