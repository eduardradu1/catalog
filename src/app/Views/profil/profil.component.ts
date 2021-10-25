import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentGrade } from 'src/app/Core/Models/student-grade.model';
import { User } from 'src/app/Core/Models/user.model';
import { StateService } from 'src/app/Core/state.service';
import { StudentService } from 'src/app/Core/student.service';
import { NotaDialogComponent } from '../nota-dialog/nota-dialog.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  currentUser:User = {};
  userName:string = "";
  email:string = "";
  studentGrades:StudentGrade[] = [];
  studentList:User[] = [];
  constructor(private studentService: StudentService,private dialog: MatDialog) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('userDetails') as string) as User;
    console.log("profile page");
    this.studentService.GetProfile(user.uid ?? "")
    .subscribe(u => {
      this.currentUser = u[0];
      console.log(this.currentUser);
      this.userName = this.currentUser.nume ?? "" + " " + this.currentUser.prenume ?? "";
      this.email = this.currentUser.email ?? "";
      if(this.currentUser.isStudent){
        this.studentService.getStudentGrades(this.currentUser.uid ?? "")
        .subscribe(s => {
          console.log(s);
          this.studentGrades = s;
        });
      }else{
      this.studentService.GetAllStudents()
      .subscribe(s => {
        this.studentList = s.filter(s => s.isStudent == true);
        this.studentService.getAllStudentGrades(this.studentList.map(s => s.uid ?? "", this.currentUser?.materie))
        .subscribe(e => {
          console.log(e);
        })
      });
      }

    });

  }

  OpenModal(uid?:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data ={user :this.currentUser, studentId:uid}
  
    const dialogRef = this.dialog.open(NotaDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
       dialogRef.close();
      });
  }
}
