import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './component/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { Page404Component } from './pages/page404/page404.component';
import { RecipeDetailleComponent } from './component/recipe-detaille/recipe-detaille.component';
import { PageRecipeComponent } from './pages/page-recipe/page-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifyRecipeComponent } from './pages/modify-recipe/modify-recipe.component';
import { ModalListIngredientsComponent } from './modal/modal-list-ingredients/modal-list-ingredients.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { NewRecipeComponent } from './pages/new-recipe/new-recipe.component';
import { NewImageComponent } from './pages/new-image/new-image.component';
import { MyRecipeComponent } from './pages/my-recipe/my-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    CardComponent,
    Page404Component,
    RecipeDetailleComponent,
    PageRecipeComponent,
    ModifyRecipeComponent,
    ModalListIngredientsComponent,
    LoginPageComponent,
    SignUpPageComponent,
    NewRecipeComponent,
    NewImageComponent,
    MyRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
