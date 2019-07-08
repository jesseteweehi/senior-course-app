import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';



const routes: Routes = [
{ path: '', redirectTo: 'courses', pathMatch: 'full' },
{ path: 'courses', children: [
  { path: '', component: CoursesListComponent},
  { path: ':courseid', component: CoursesComponent }
]},
// { path: 'teachers', component: AddTeacherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
