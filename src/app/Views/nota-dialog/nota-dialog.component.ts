import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/Core/student.service';
import * as moment from 'moment';
import { User } from 'src/app/Core/Models/user.model';

@Component({
  selector: 'app-nota-dialog',
  templateUrl: './nota-dialog.component.html',
  styleUrls: ['./nota-dialog.component.css']
})
export class NotaDialogComponent implements OnInit {
  gradesForm = new FormGroup({
    nota1: new FormControl('', [Validators.required, Validators.minLength(1)]),
    nota2: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  constructor( private dialogRef: MatDialogRef<NotaDialogComponent>, private studentService: StudentService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }
    submitted = false;
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  get nota1() : any{
    return this.gradesForm.get('nota1');
  }
  get nota2() : any{
    return this.gradesForm.get('nota2');
  }
  Save(data:any){
    console.log(data);
    if(this.gradesForm.errors?.lenght > 0){
      console.log("ERROROOROR")
    }
    if(this.gradesForm.dirty){
      var grade = {
        Nota1:data.nota1,
        Nota2:data.nota2,
        StudentUid: this.data.studentId,
        Materie:this.data.user.materie,
        Profesor:this.data.user.nume,
        CreateDate: moment()
      };
      this.studentService.SaveStudentGrades(grade)
      .then(e => {
        if(e == true){
          this.close();
        }
      });
    }
   

  }
}
