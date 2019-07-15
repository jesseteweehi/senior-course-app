import { CreditPipe } from './global/credit.pipe';
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
        MatListModule,
        MatTabsModule
      } from '@angular/material';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesService } from './courses.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResourcesComponent } from './resources/resources.component';
import { AuthService } from './auth.service';
import { CoursesWrapperComponent } from './courses-wrapper/courses-wrapper.component';
import { MyCoursesComponent } from './mycourses/my-courses/my-courses.component';
import { MyStandardsComponent } from './mycourses/my-standards/my-standards.component';
import { MyCoursesWrapperComponent } from './mycourses/my-courses-wrapper/my-courses-wrapper.component';
import { MyCoursesDashboardComponent } from './mycourses/my-courses-dashboard/my-courses-dashboard.component';
import { MyCourseDashboardComponent } from './mycourses/my-course-dashboard/my-course-dashboard.component';
import { MyCourseWrapperComponent } from './mycourses/my-course-wrapper/my-course-wrapper.component';
import { MyCourseActionComponent } from './mycourses/my-course-action/my-course-action.component';
import { FilterPipe } from './global/filter.pipe';



@NgModule({
   declarations: [
      AppComponent,
      StandardsComponent,
      CoursesComponent,
      CoursesListComponent,
      ResourcesComponent,
      CoursesWrapperComponent,
      MyCoursesComponent,
      MyCoursesDashboardComponent,
      MyCoursesWrapperComponent,
      MyStandardsComponent,
      MyCourseActionComponent,
      MyCourseDashboardComponent,
      MyCourseWrapperComponent,
      FilterPipe,
      CreditPipe
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
      HttpClientModule,
      MatTabsModule
   ],
   providers: [
      CoursesService,
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
