import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotaDialogComponent } from '../nota-dialog/nota-dialog.component';

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css']
})
export class StudentiComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  OpenModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
  
    const dialogRef = this.dialog.open(NotaDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("lalalalal");
      });
  }
}
