import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandardsComponent } from './standards/standards.component';
import {MatMenuModule, 
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatCardModule,
      } from '@angular/material';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesService } from './courses.service';
import { StandardListComponent } from './standard-list/standard-list.component';





@NgModule({
   declarations: [
      AppComponent,
      StandardsComponent,
      CoursesComponent,
      CoursesListComponent,
      StandardListComponent
   ],
   imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      BrowserAnimationsModule,
      BrowserModule,
      ReactiveFormsModule,
      AppRoutingModule,
      MatMenuModule,
      MatToolbarModule,
      MatButtonModule,
      MatInputModule,
      MatSelectModule,
      MatSliderModule,
      MatCheckboxModule,
      MatSlideToggleModule,
      MatCardModule
   ],
   providers: [
      CoursesService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
