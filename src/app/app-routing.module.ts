import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';
import { PageRecipeComponent } from './pages/page-recipe/page-recipe.component';
import { ModifyRecipeComponent } from './pages/modify-recipe/modify-recipe.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { NewRecipeComponent } from './pages/new-recipe/new-recipe.component';
import { NewImageComponent } from './pages/new-image/new-image.component';
import { MyRecipeComponent } from './pages/my-recipe/my-recipe.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'page-recipe/:id', component: PageRecipeComponent },
  { path: 'modify-recipe/:id', component: ModifyRecipeComponent },
  { path: 'login_page', component: LoginPageComponent },
  { path: 'sign_up', component: SignUpPageComponent },
  { path: 'new-recipe', component: NewRecipeComponent },
  { path: 'my-recipe', component: MyRecipeComponent },
  { path: 'new-image', component: NewImageComponent },

  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
