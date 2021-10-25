import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './Views/home/home.component';
import { LogInComponent } from './Views/log-in/log-in.component';
import { RegisterComponent } from './Views/register/register.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './Core/auth/auth.service';
import { ProfilComponent } from './Views/profil/profil.component';
import { AuthGuard } from './Core/auth/auth.guard';
import { StateService } from './Core/state.service';
import { StudentService } from './Core/student.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentiComponent } from './Views/studenti/studenti.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotaDialogComponent } from './Views/nota-dialog/nota-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    RegisterComponent,
    ProfilComponent,
    StudentiComponent,
    NotaDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    StateService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
