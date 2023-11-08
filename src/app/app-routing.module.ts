import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';
import { RecipeDetailleComponent } from './component/recipe-detaille/recipe-detaille.component';
import { PageRecipeComponent } from './pages/page-recipe/page-recipe.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'page-recipe/recipe_detaille/:id', component: RecipeDetailleComponent },
  { path: 'page-recipe/:id', component: PageRecipeComponent },
  {path: '**', component: Page404Component}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
