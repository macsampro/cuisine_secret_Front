import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'reflect-metadata';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './component/carousel/carousel.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './component/card/card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarouselComponent,
    HomeComponent,
    CardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
