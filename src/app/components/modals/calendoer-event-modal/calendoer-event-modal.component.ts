import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-calendoer-event-modal',
  templateUrl: './calendoer-event-modal.component.html',
  styleUrls: ['./calendoer-event-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CalendoerEventModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CalendoerEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

    }

  ngOnInit() {
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
