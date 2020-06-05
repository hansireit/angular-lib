import { Component, OnInit, Inject,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.sass']
})
export class RenameDialogComponent {

  public title: string;
  public text: string;
  public description: string;
  public name: string; 

  constructor(
    public dialogRef: MatDialogRef<RenameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.title = data.title;
      this.text = data.text;
      this.description = data.description;
      this.name = data.name; 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
