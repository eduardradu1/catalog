import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('test@gmail.com', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('Password', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  SignIn(data:any){
    this.authService.SignIn(data.email, data.password);
  }
}
