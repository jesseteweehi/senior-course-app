import { MyCourseWrapperComponent } from './mycourses/my-course-wrapper/my-course-wrapper.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CoursesWrapperComponent } from './courses-wrapper/courses-wrapper.component';
import { MyCoursesWrapperComponent } from './mycourses/my-courses-wrapper/my-courses-wrapper.component';



const routes: Routes = [
{ path: '', redirectTo: 'courses', pathMatch: 'full' },
{ path: 'courses', children: [
  { path: '', component: CoursesWrapperComponent },
  { path: ':courseid', component: CoursesComponent }
]},
{ path: ':userid', children: [
  { path: '', component: MyCoursesWrapperComponent},
  { path: ':courseid', component: MyCourseWrapperComponent}
]},
// { path: 'teachers', component: AddTeacherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
