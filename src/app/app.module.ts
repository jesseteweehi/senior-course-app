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
        MatSliderModule} from '@angular/material';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';





@NgModule({
  declarations: [
    AppComponent,
    StandardsComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
