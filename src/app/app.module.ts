import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
        MatProgressSpinnerModule,
        MatGridListModule,
        MatChipsModule,
        MatIconModule,
        MatExpansionModule,
        MatDividerModule,
        MatListModule
      } from '@angular/material';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesService } from './courses.service';
import { StandardListComponent } from './standard-list/standard-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResourcesComponent } from './resources/resources.component';
import { AuthService } from './auth.service';




@NgModule({
   declarations: [
      AppComponent,
      StandardsComponent,
      CoursesComponent,
      CoursesListComponent,
      StandardListComponent,
      ResourcesComponent,
   ],
   imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
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
      MatCardModule,
      MatProgressSpinnerModule,
      MatGridListModule,
      FlexLayoutModule,
      MatChipsModule,
      MatIconModule,
      MatExpansionModule,
      MatDividerModule,
      MatListModule,
      HttpClientModule
   ],
   providers: [
      CoursesService, AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
