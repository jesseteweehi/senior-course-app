import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandardsComponent } from './standards/standards.component';


const routes: Routes = [
{ path: 'standards/create', component: StandardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
