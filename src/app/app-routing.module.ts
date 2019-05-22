import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandardsComponent } from './standards/standards.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
{ path: 'standards/create', component: StandardsComponent},
{ path: 'courses/create', component: CoursesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
