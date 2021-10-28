import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';
import { StudentGrade } from 'src/app/Core/Models/student-grade.model';
import { User } from 'src/app/Core/Models/user.model';
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
        this.getStudentsGrades();
      }
    });

  }

  getStudentsGrades(){
    this.studentService.GetAllStudents()
    .subscribe(s => {
      this.studentList = s.filter(s => s.isStudent == true);
      let materie =this.currentUser?.materie ?? ""; 
      this.studentService.getAllStudentGrades(this.studentList.map(s => s.uid ?? ""), materie)
      .subscribe(listaNote => {
       this.studentList =  this.studentList.map(s => {
          let nota1 = listaNote.filter(n => n.StudentId == s.uid && n.TipNota == "Nota1")
          .sort((a,b) => { 
            let createdA  = moment(a.CreateDate);
            let createdB =  moment(b.CreateDate);
            return createdA.diff(createdB);
          })
          .slice(-1);
          let nota2 = listaNote.filter(n => n.StudentId == s.uid && n.TipNota == "Nota2")
          .sort((a,b) => { 
            let createdA  = moment(a.CreateDate);
            let createdB =  moment(b.CreateDate);
            return createdA.diff(createdB);
          })
          .slice(-1);
          var temp = Object.assign({}, s);
          temp.nota1 = nota1[0]?.Nota?.toString();
          temp.nota2 = nota2[0]?.Nota?.toString();
          return temp;
        });
      })
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
       this.getStudentsGrades();
      });
  }
}
