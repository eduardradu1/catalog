import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isProfesorSelected:boolean = false;
  registerForm = new FormGroup({
    nume: new FormControl('', [Validators.required, Validators.minLength(4)]),
    prenume: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    userType:new FormControl('1'),
    materie:new FormControl('')

  });
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  Register(data:any){
    console.log(data);
    this.authService.Register(data);
  }
  
  changeUserType(event:any){
    this.isProfesorSelected = !this.isProfesorSelected;
  }
}
