import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { ComponentsModule } from './components/components.module';
import { GlobeComponent } from './globe/globe.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { SpinWheelComponent } from './spin-wheel/spin-wheel.component';
import { GamesComponent } from './home-content/games/games.component';
import { PongComponent } from './home-content/games/pong/pong.component';
import { SearchComponent } from './home-content/games/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProjectsComponent,
    ContactComponent,
    GlobeComponent,
    HomeContentComponent,
    SpinWheelComponent,
    GamesComponent,
    PongComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
