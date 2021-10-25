import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Core/auth/auth.guard';
import { HomeComponent } from './Views/home/home.component';
import { LogInComponent } from './Views/log-in/log-in.component';
import { ProfilComponent } from './Views/profil/profil.component';
import { RegisterComponent } from './Views/register/register.component';
import { StudentiComponent } from './Views/studenti/studenti.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'log-in', component: LogInComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profil', component: ProfilComponent, canActivate:[AuthGuard]},
    { path: 'studenti', component: StudentiComponent, canActivate:[AuthGuard]}
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }