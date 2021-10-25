import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './Core/auth/auth.service';
import { StateService } from './Core/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'catalog';
  hideLogOut:boolean;
  loginSub: Subscription;
  isStudent:boolean;

  constructor(private authService: AuthService, private loginState:StateService){
    console.log( this.authService.isStudent);
    this.hideLogOut = this.authService.isLoggedIn;
    this.isStudent = this.authService.isStudent;
    this.loginSub = this.loginState.loginSubjectMessage.subscribe(r =>{
      this.hideLogOut = r as boolean;
    });
  }
  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }
  logOut(){
    this.authService.logOut();
  }
}
