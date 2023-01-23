import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { HomeContentComponent } from './home-content/home-content.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "proyectos", component: ProjectsComponent},
  {path: 'contacto', component: ContactComponent},
  {path: "info", component: HomeContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
